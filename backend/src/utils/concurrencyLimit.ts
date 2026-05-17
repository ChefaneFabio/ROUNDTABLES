// Minimal p-limit replacement: keep N tasks in-flight, queue the rest.
// Used to bound concurrent calls to expensive 3rd-party APIs (Whisper,
// ElevenLabs) when many learners submit simultaneously. Without this a
// single 200-learner cohort could keep ~1200 OpenAI sockets open at once
// and exhaust the Render process.

export function pLimit(maxConcurrent: number) {
  let active = 0
  const queue: Array<() => void> = []

  const next = () => {
    active--
    const release = queue.shift()
    if (release) release()
  }

  return async function run<T>(task: () => Promise<T>): Promise<T> {
    if (active >= maxConcurrent) {
      await new Promise<void>(resolve => queue.push(resolve))
    }
    active++
    try {
      return await task()
    } finally {
      next()
    }
  }
}
