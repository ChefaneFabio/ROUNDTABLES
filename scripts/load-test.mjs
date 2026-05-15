#!/usr/bin/env node
/**
 * Standalone load test — simulates N concurrent learners taking the placement
 * test against the live backend. Uses only Node 18+ built-ins (fetch, perf_hooks).
 *
 * Usage:
 *   BASE_URL=https://roundtables.onrender.com USERS=200 node scripts/load-test.mjs
 *
 * Defaults: BASE_URL=https://roundtables.onrender.com  USERS=50
 *
 * Each virtual user:
 *   1. registers a fresh learner account (role=STUDENT)
 *   2. starts a multi-skill English placement test
 *   3. fetches the first reading question
 *   4. submits an answer
 *   5. fetches the next question
 *   6. submits another answer
 *
 * The script reports p50/p95/p99 latency per step and any failures.
 * It does NOT clean up created users — they remain in the DB.
 */

import { performance } from 'node:perf_hooks'

const BASE_URL = process.env.BASE_URL || 'https://roundtables.onrender.com'
const USERS = Number(process.env.USERS || 50)
const RAMP_UP_MS = Number(process.env.RAMP_UP_MS || 30_000) // spread starts over this window

const stepLabels = ['register', 'startAssessment', 'getQuestion1', 'submitAnswer1', 'getQuestion2', 'submitAnswer2']
/** @type {Record<string, number[]>} */
const timings = Object.fromEntries(stepLabels.map(s => [s, []]))
const failures = []

const sleep = (ms) => new Promise(r => setTimeout(r, ms))

async function timed(label, fn) {
  const t0 = performance.now()
  try {
    const out = await fn()
    timings[label].push(performance.now() - t0)
    return out
  } catch (err) {
    timings[label].push(performance.now() - t0)
    throw err
  }
}

async function call(method, path, body, token) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await res.text()
  let json = null
  try { json = JSON.parse(text) } catch { /* not json */ }
  if (!res.ok) {
    throw new Error(`${method} ${path} → ${res.status}: ${text.slice(0, 200)}`)
  }
  return json
}

async function runUser(i) {
  const email = `loadtest-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 8)}@example.com`
  const password = 'loadtestpass123'

  try {
    const reg = await timed('register', () =>
      call('POST', '/api/auth/register-public', {
        role: 'STUDENT',
        email,
        password,
        name: `Load Test ${i}`,
      })
    )
    const token = reg?.data?.accessToken
    if (!token) throw new Error('No accessToken in register response')

    // Start a multi-skill English placement test (studentId comes from JWT)
    const assessment = await timed('startAssessment', () =>
      call('POST', '/api/assessments/multi-skill', { language: 'English' }, token)
    )
    const aid = assessment?.data?.id
    const sections = assessment?.data?.sections || []
    const readingSection = sections.find(s => s.skill === 'READING')
    if (!aid || !readingSection) throw new Error('No assessment id or reading section returned')

    // Start the section so getNextSectionQuestion will return questions
    await call('POST', `/api/assessments/multi-skill/${aid}/sections/${readingSection.id}/start`, {}, token)

    // First question
    const q1 = await timed('getQuestion1', () =>
      call('GET', `/api/assessments/multi-skill/${aid}/sections/${readingSection.id}/next-question`, null, token)
    )
    const q1id = q1?.data?.question?.id
    if (q1id) {
      // Submit a guess (intentionally wrong is fine — we're stress-testing the path)
      await timed('submitAnswer1', () =>
        call('POST', `/api/assessments/multi-skill/${aid}/sections/${readingSection.id}/answer`, {
          questionId: q1id,
          answer: 'guess',
        }, token)
      )

      const q2 = await timed('getQuestion2', () =>
        call('GET', `/api/assessments/multi-skill/${aid}/sections/${readingSection.id}/next-question`, null, token)
      )
      const q2id = q2?.data?.question?.id
      if (q2id) {
        await timed('submitAnswer2', () =>
          call('POST', `/api/assessments/multi-skill/${aid}/sections/${readingSection.id}/answer`, {
            questionId: q2id,
            answer: 'guess',
          }, token)
        )
      }
    }
  } catch (err) {
    failures.push({ user: i, error: err.message })
  }
}

function pct(arr, p) {
  if (arr.length === 0) return 0
  const sorted = [...arr].sort((a, b) => a - b)
  const idx = Math.min(sorted.length - 1, Math.floor(sorted.length * p / 100))
  return sorted[idx]
}

function fmt(n) { return `${n.toFixed(0)}ms` }

async function main() {
  console.log(`Load test: ${USERS} users against ${BASE_URL}, ramp ${RAMP_UP_MS}ms`)
  const t0 = performance.now()
  const tasks = []
  for (let i = 0; i < USERS; i++) {
    tasks.push(sleep((i / USERS) * RAMP_UP_MS).then(() => runUser(i)))
  }
  await Promise.all(tasks)
  const total = performance.now() - t0

  console.log(`\nDone in ${(total / 1000).toFixed(1)}s`)
  console.log(`Failures: ${failures.length}/${USERS}`)
  if (failures.length > 0) {
    console.log('Sample failures:')
    failures.slice(0, 5).forEach(f => console.log(`  user ${f.user}: ${f.error.slice(0, 200)}`))
  }
  console.log('\nLatencies (median / p95 / p99):')
  for (const step of stepLabels) {
    const arr = timings[step]
    if (arr.length === 0) {
      console.log(`  ${step.padEnd(20)} no data`)
    } else {
      console.log(`  ${step.padEnd(20)} ${fmt(pct(arr, 50))} / ${fmt(pct(arr, 95))} / ${fmt(pct(arr, 99))}  (n=${arr.length})`)
    }
  }
}

main().catch(err => {
  console.error('Load test crashed:', err)
  process.exit(1)
})
