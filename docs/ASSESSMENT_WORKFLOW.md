# Assessment Workflow & User Stories

This document describes the **ideal end-to-end workflow** for the Maka LMS
placement assessment, and the **user stories** for each actor in the system.
It is the single source of truth for product behavior — code that contradicts
this document should either be fixed or this document should be updated.

---

## 1. Actors

| Actor | Description | Login type |
|-------|-------------|------------|
| **Learner** (Student) | Employee taking the placement test. Belongs to an Organization. | Self-registered or invited by Maka |
| **HR / Org Admin** | B2B contact for an Organization. Read-only access to their tenant. | Self-registered, approved by Maka |
| **Maka Admin** | `training@makaitalia.com`. Full control over everything: schools, organizations, learners, tests, settings. | Internal only |
| **Trainer** (Teacher) | Optional reviewer of written/spoken responses. | Internal (created by Maka) |

All actors authenticate against the same `/login` endpoint. Role-based routing
takes them to the right landing page.

---

## 2. Ideal Assessment Workflow

### 2.1 Learner onboarding

```
Learner self-registers (/register)         →  Account created (active)
        OR                                    Email to Maka
Maka creates the learner internally        →  Email to learner with creds
        OR
Maka bulk-uploads .xlsx roster              →  N learners created, optional invite emails
        OR
HR registers org, Maka approves, Maka       
adds learners under that org
```

A learner exists once a User row exists with `role = STUDENT` and a Student
profile that points to their `schoolId` and, optionally, an `organizationId`
for B2B learners.

**Bulk upload** (`POST /organizations/:id/employees/bulk-upload`, Maka admin
only). Accepts a `.xlsx` / `.xls` / `.csv` file. Required columns:
`first_name`, `last_name`, `email`, `language`. Optional: `phone`,
`job_role`, `language_level`, `needs_speaking`, `needs_reading`,
`needs_writing`, `confidence`, `comments`. Up to 1000 rows / 5 MB per file.
Returns a per-row report (`created` / `skipped` / `error` with reason).
Template downloadable at `GET /organizations/:id/employees/bulk-template`.

### 2.1.1 Pre-test questionnaire (gate)

Before a learner can self-request a placement test, they must complete a
short questionnaire at `/assessment/pretest`:

- Skills needed (Speaking / Reading / Writing — multi-select)
- Self-evaluated confidence (Low / Medium / High)
- Availability grid (Mon–Sun × AM / Lunch / PM / Evening)
- Job role (optional)
- Comments (optional)

Data is persisted on `Student.preTestData` + `preTestCompletedAt`. The
multi-skill assessment endpoint returns `412 PRETEST_REQUIRED` when the
gate isn't satisfied; the frontend bounces the learner to the form.

**Bulk-uploaded learners** with pre-test fields in their row have
`preTestCompletedAt` set at import time so they bypass the gate.

**Admin-assigned tests** bypass the gate entirely (Maka decides).

### 2.2 Test request → approval → start

```
Learner opens /assessment                                            
   ↓
Sees language cards (English, Spanish, French, German, Italian)      
   ↓
Clicks "Request Test" on a language                                  
   ↓
Backend creates Assessment(status=REQUESTED, no startedAt)
Email → training@makaitalia.com with "Approve at /admin/test-requests"
   ↓
Maka opens /admin/test-requests, clicks "Approve"                    
   ↓
Backend: status REQUESTED → ASSIGNED, assignedById = Maka
Email → learner: "Your test is ready"
   ↓
Learner refreshes /assessment, card now reads "Begin Test"           
   ↓
Learner clicks "Begin Test" → /assessment/multi-skill/:id            
```

**Why the gate?** Learners cannot consume Maka resources (TTS audio
generation, Whisper transcription, question bank) without explicit
approval. This prevents drive-by sign-ups from burning quota.

**Admin-assigned tests bypass approval.** When Maka assigns a test from a
company page (`AssignPlacementTestModal`), the assessment is created
directly in `ASSIGNED` state.

### 2.3 Taking the test

The placement test is **4 sections**. Strict timer budget = **50 min**;
real-world completion lands around **~60 min** once you include intro
pages, section transitions, and a brief between-section pause.

| # | Section | Time | Questions | Skills measured |
|---|---------|------|-----------|-----------------|
| 1 | Reading & Language Use | 18 min | 28 | grammar, vocab, error-correction, sentence-transformation, reading |
| 2 | Listening | 12 min | 10 | listening comprehension, dialogues |
| 3 | Writing | 10 min | 6 | written production, AI-scored |
| 4 | Speaking | 10 min | 6 | spoken production, Whisper transcribed + AI-scored |

Source of truth for section limits: `SECTION_CONFIG_V3` in
`backend/src/services/SectionAssessmentService.ts`. The UI surfaces a
conservative "~70 min" estimate so learners book enough calendar time.

**Per-section flow:**
1. Section starts → timer begins (`expiresAt = now + timeLimitMin`)
2. Adaptive question selection: starts at A2, moves up/down based on accuracy
3. Learner submits answers one at a time
4. Section auto-completes on last question or on timer expiry
5. Score computed: raw + percentage + CEFR level per skill
6. Section locked (cannot redo without Maka approval)

**Mid-test recovery rules:**
- Tab switch shows a warning but does **not** kill the test (maxViolations=0).
- Copy/paste and right-click are **allowed**.
- JWT expiry mid-test: axios interceptor stashes the URL, sends learner to
  `/login`, after re-login they resume exactly where they left off.
- Network blips on GET retry once after 1s.
- 24h-old in-progress tests auto-cancel.

### 2.4 Scoring & results

After all 4 sections complete:
1. Whisper transcribes speaking responses (async, `setImmediate`).
2. AI evaluates writing and speaking responses against a CEFR rubric.
3. Per-skill CEFR levels stored on the Assessment.
4. Overall CEFR computed from total raw score (Jean's grid).
5. Sub-level computed (A2.1 / A2.2 / A2.3 based on accuracy within level).
6. Email + PDF results sent to `training@makaitalia.com`.
7. Learner sees `View Results` button on `/assessment` (no Retake action).
8. Maka can re-trigger AI scoring or override with teacher scoring.

### 2.5 Notifications to Maka

Maka receives an email at `training@makaitalia.com` for every lifecycle
event:

| Event | Trigger | Email subject |
|-------|---------|---------------|
| Test requested | Learner clicks "Request Test" | Placement Test Requested — Approval Needed |
| Test approved | Maka approves | (in-system; no email back to self) |
| Test started | Learner begins first section | (legacy; suppressed now that approval gates the start) |
| Test suspended | Learner pauses | Placement Test Suspended |
| Test cancelled | Learner restarts / 24h auto-cancel | Placement Test Cancelled |
| Test completed | All 4 sections done | Internal report with PDF attachment |
| New HR registration | Org self-registers | Organization Registration — Approval Needed |
| New learner registration | Learner self-registers | New Learner Registered |

---

## 3. Organization (B2B HR) Workflow

### 3.1 Self-registration

```
HR visits /register/organization                  
   ↓
Fills 3-step form: org details → admin account → billing (optional)
   ↓
Submit → POST /auth/register/organization        
   ↓
Backend creates:
  - User(role=ORG_ADMIN, isActive=false)
  - Organization(linked to Maka school)
  - OrgAdmin(User ↔ Organization link)
Email → training@makaitalia.com with approval CTA
   ↓
HR sees "Registration received — awaiting approval" screen
   ↓
Maka opens /admin/org-requests, clicks Approve   
   ↓
Backend: user.isActive = true
Email → HR: "Your Maka LMS account is ready"     
   ↓
HR logs in → redirected to /org/dashboard        
```

### 3.2 HR tenant scope

The HR sees **only their own Organization's data**:

- `/org/dashboard` — KPIs for their learners only
- `/org/employees` — read-only list of learners (no invite, no remove)
- `/org/assessments` — placement tests of their learners only
- `/org/seats`, `/org/purchase`, `/org/invoices` — billing for their org
- `/org/reports` — Excel/PDF export of their learners' results
- `/org/settings` — org profile editing

**Tenant isolation enforced server-side** via `requireOrgAccess` middleware
that checks `JWT.organizationId === requested orgId`. Maka admin
(`role=ADMIN`) bypasses all org checks and sees everything.

### 3.3 Constraints

- HR **cannot** create or invite learners. Maka does that.
- HR **cannot** assign tests directly. Maka does that.
- HR **cannot** see other organizations.
- HR's view is **read-only** for learner records, **read+export** for results.

---

## 4. User Stories

User stories are in the format:
> **As a** [actor], **I want** [capability], **so that** [outcome].

### 4.1 Learner

| ID | Story | Acceptance criteria |
|----|-------|---------------------|
| L1 | As a learner, I want to register myself so that I can start using the platform without waiting on Maka. | Form at `/register` with email/password/name. Account is active immediately. Maka is notified by email. |
| L2 | As a learner, I want to request a placement test so that Maka knows I want to be assessed. | Card on `/assessment` shows "Request Test". One click → request submitted → card flips to "Awaiting Approval". |
| L3 | As a learner, I want to be notified when my test is approved so that I don't have to keep checking. | Email "Your test is ready" + in-app notification when Maka approves. |
| L4 | As a learner, I want to take the test in one sitting with the option to pause so that I can manage interruptions. | Pause button visible on every section. Pause stops the timer. Resume restores remaining time. |
| L5 | As a learner, I want my work to survive a session timeout so that I don't lose progress. | JWT expiry mid-test redirects to login; after login I land back on the same section at the same question. |
| L6 | As a learner, I want to switch tabs without losing the test so that I can copy info from another window. | Tab switch shows a warning; test is NOT killed. |
| L7 | As a learner, I want to copy/paste during the test so that I can use my own notes or dictionary. | Copy, cut, paste, and right-click work normally during the test. |
| L8 | As a learner, I want to see my results after completing the test so that I understand my level. | "View Results" button on `/assessment` for the completed language. No retake action. |
| L9 | As a learner, my test should not auto-fail because of a flaky network. | Failed GET/HEAD requests retry once after 1s. Errors during the test render a recovery UI, not a crash. |
| L10 | As a learner, dialogues in Listening should sound natural with different voices for different speakers. | TTS uses 13-voice pool seeded by question ID. `SPEAKER_A:` / `SPEAKER_B:` markers are NOT read aloud. |

### 4.2 HR / Organization Admin

| ID | Story | Acceptance criteria |
|----|-------|---------------------|
| H1 | As an HR contact, I want to register my company on the platform so that we can onboard our employees. | Form at `/register/organization` with company + admin details. Submission shows "awaiting approval" screen. |
| H2 | As an HR contact, I want to know my registration is pending so that I don't think the platform is broken. | Confirmation screen explains Maka will email when account is ready. Login attempt before approval shows a clear pending-approval message. |
| H3 | As an HR contact, once approved I want to log in and see my organization's data at a glance. | Login redirects to `/org/dashboard` showing my learners count, recent results, pending tests. |
| H4 | As an HR contact, I want to see every learner from my company in one place. | `/org/employees` shows the list, filtered server-side by `organizationId`. |
| H5 | As an HR contact, I want to see test results for my learners so that I can report on progress. | `/org/assessments` lists completed tests for my learners with CEFR levels per skill. |
| H6 | As an HR contact, I want to export results in Excel/PDF so I can share with stakeholders. | `/org/reports` provides one-click export per learner or aggregated. |
| H7 | As an HR contact, I should NOT be able to see learners from other companies. | Server-side `requireOrgAccess` middleware rejects any request with a different `organizationId`. |
| H8 | As an HR contact, I cannot invite or remove learners — Maka does that for me. | `/org/employees` UI shows no invite/remove buttons; backend rejects employee-create from non-admin if attempted via API. |

### 4.3 Maka Admin (`training@makaitalia.com`)

| ID | Story | Acceptance criteria |
|----|-------|---------------------|
| M1 | As Maka, I want to see every learner test request in one queue so I can approve them quickly. | `/admin/test-requests` lists all `REQUESTED` assessments with Approve/Deny. Approve opens a confirmation modal showing learner name + email + company + language so Maka never approves blindly. Pending count badge in sidebar. |
| M2 | As Maka, I want to see every HR registration in one queue so I can vet organizations. | `/admin/org-requests` lists all pending ORG_ADMIN signups with company details (industry, size, website). Approve/Deny with optional reason. |
| M3 | As Maka, I want to assign placement tests to specific learners from a company page. | `AssignPlacementTestModal` on `/admin/organizations/:id` — picks learners + language. These tests bypass the approval queue (status=ASSIGNED directly). |
| M4 | As Maka, I want to invite new learners with one click. | Invite Learner button on `/admin/organizations/:id` — emails a temp password + login link. |
| M4b | As Maka, I want to upload a roster of dozens of learners in one shot. | Bulk Upload button on `/admin/organizations/:id` — accepts `.xlsx`/`.csv`, downloads template, returns row-by-row success/error report. |
| M5 | As Maka, I want a cross-user activity feed so I can audit who did what. | `/admin/activity` shows USER_REGISTERED, ASSESSMENT_REQUESTED/APPROVED/DENIED/STARTED/COMPLETED, LEARNER_INVITED, etc. |
| M6 | As Maka, I want every test lifecycle event by email so I'm not blind to what happens off-hours. | Emails to `training@makaitalia.com` for: request, suspended, cancelled, completed (with PDF). HR registration also emails Maka. |
| M7 | As Maka, I want to override AI scoring with my own judgement on writing/speaking. | `/admin/review-queue` lets a teacher view the response and submit `teacherScore`, which becomes `finalScore`. |
| M8 | As Maka, I want to pre-generate all TTS audio before a big onboarding so it doesn't lag mid-test. | `POST /admin/pregen-audio` generates audio for every listening question. Cached on Cloudinary. |
| M9 | As Maka, I want to see the full question bank and edit it. | `/admin/assessment-questions` with filters by language/skill/CEFR, plus create/edit/delete. |
| M10 | As Maka, I want denied requests to be auditable. | Denials store the reason in metadata + write to ActivityLog. |

### 4.4 Trainer (Teacher)

| ID | Story | Acceptance criteria |
|----|-------|---------------------|
| T1 | As a trainer, I want to see writing/speaking responses awaiting review. | `/admin/review-queue` lists sections where `finalScore` is null but `aiScore` exists. |
| T2 | As a trainer, I want to submit a final score that overrides the AI. | Teacher score form per section. After submit, `finalScore = teacherScore`. |

---

## 5. Constraints & Non-Goals

### Constraints (must be respected)

- **Single school**: Only Maka. No multi-school. Every Organization belongs
  to the Maka school.
- **Single platform admin**: Only `training@makaitalia.com` should have
  `role=ADMIN`. Other Maka emails (`info@`, `alessia@`, `corporate@demo`)
  are deactivated.
- **No gamification**: No badges, streaks, XP. Focus is on real assessment
  + lesson planning.
- **Public registration restricted**: `/register-public` accepts only
  TEACHER and STUDENT roles. ADMIN must be created internally.
- **Tenant isolation**: HR sees only their org. Enforced server-side, not
  just in UI.

### Non-goals (explicitly out of scope)

- HR self-service for learner creation (Maka does it).
- HR self-service for test assignment (Maka does it).
- Multi-school federation.
- Open API for external systems (use Maka admin for now).
- Email-based one-click approve link (use the admin page).
- 40-minute test target — current ~50-min timed (~60-min real) duration is acceptable.
- Fractional answer-penalty scoring (NC − NI/3) — current adaptive scoring stays.
- Strict anti-cheat enforcement — tab-switch warning + allowed copy/paste is intentional.

---

## 6. Operational Notes

- **Email channel**: SMTP via Microsoft 365 (`smtp.office365.com:587`,
  STARTTLS). Sender `training@makaitalia.com`.
- **Audio CDN**: Cloudinary signed upload, folder `roundtables-audio`.
  Render disk is ephemeral — never rely on local cache.
- **Prisma pool**: `connection_limit=30` by default. Bump via
  `PRISMA_CONNECTION_LIMIT` env var for larger cohorts.
- **Load testing**: `scripts/load-test.mjs` with `LOAD_TEST_BYPASS_TOKEN`
  header bypasses rate limits. Pre-gen audio first for realistic timing.
- **JWT**: access 4h, refresh 7d. Refresh rotation handled by axios
  interceptor.

---

## 7. Open Questions / Backlog

These are intentionally **not** built yet but are likely future work:

- [ ] One-click email approve links (eliminate the admin page round-trip).
- [ ] HR can request tests on behalf of their learners (auto-approved
  inside their tenant).
- [ ] CSV bulk upload of learners by Maka.
- [ ] Domain-based auto-mapping (`@bigcorp.com` → BigCorp organization).
- [ ] Per-org seat license enforcement before allowing test requests.
- [ ] Scheduled re-assessment reminders (every 6/12 months).
