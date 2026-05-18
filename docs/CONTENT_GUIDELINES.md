# Content Guidelines — Placement Test Question Bank

Three pedagogical rules that all placement-test questions must follow, in
every language and at every CEFR level. Maka has flagged each of these
as actual learner-feedback issues; new content that violates them gets
sent back.

---

## 1. Raise the language, not the subject

**Rule:** At higher CEFR levels (B2, C1, C2), increase the complexity of
the LANGUAGE — grammar, vocabulary breadth, register, idiom, syntactic
density — not the SUBJECT MATTER.

A placement test measures language proficiency, not domain knowledge. A
C2 learner who works in retail should not be tested on quantum
mechanics. A C1 learner in HR should not need to recognise references to
Kahneman or Sapir-Whorf to answer correctly.

**Avoid:**
- Philosophy ("crisi epistemica", "coscienza filosofica", "post-verità")
- Hard science ("decoerenza quantistica", "microtubuli neuronali",
  "termodinamica")
- Heavy academic register ("epistemic foundations", "ontological status")
- Politics / geopolitics requiring background ("populismo neoliberista",
  "Verfassungswandel")

**Prefer (same linguistic complexity, accessible subject):**
- Workplace: hybrid work, performance reviews, contract negotiation,
  recognition culture, change management, KPI design
- Everyday: city life vs. remote living, family-work balance, urban
  mobility, consumer choices, generational habits
- General culture: travel, food traditions, language learning,
  professional development, sustainability in daily life

The grammar of a "complex" professional-life passage (subordinate
clauses, hypothetical conditionals, abstract nouns, low-frequency
vocabulary) can be every bit as challenging as a passage on philosophy —
without requiring the learner to know what "epistemic" means.

---

## 2. Test comprehension, not pattern-matching

**Rule:** The correct answer must NOT be a verbatim copy-paste of the
passage. Options must paraphrase. The learner should have to UNDERSTAND
the meaning, not just match strings.

**Bad (string matching):**
- Passage: *"Some scholars argue that the very notion of objective truth
  has been supplanted by a post-truth paradigm."*
- Question: *"What do some scholars argue?"*
- ✗ Correct option: *"The very notion of objective truth has been
  supplanted by a post-truth paradigm."*

**Good (paraphrase):**
- Same passage.
- Question: *"What is the main claim attributed to these scholars?"*
- ✓ Correct option: *"That facts are losing ground to feelings in public
  debate."*
- Distractor: *"That post-truth is a passing fashion."*
- Distractor: *"That objective truth never existed."*
- Distractor: *"That science has become more reliable."*

The correct option captures the same idea in different words. The wrong
options are plausible but represent misunderstandings.

This applies to MULTIPLE_CHOICE, READING, and LISTENING question types.
For FILL_BLANK, the missing word can be drawn from the text, but ideally
isn't the only word in the text that fits the slot grammatically.

---

## 3. Make instructions unambiguous

**Rule:** Every question must tell the learner exactly what they're
expected to do. No relying on inference or test-taking tradition.

**Bad:**
- *"Choose the appropriate option."* (Appropriate to what?)
- *"Complete the sentence."* (With what? A word? A phrase? Any length?)
- *"Read and answer."* (Answer what?)

**Good:**
- *"Choose the option that best paraphrases the underlined sentence."*
- *"Complete the sentence with ONE word that fits both grammatically and
  in meaning."*
- *"Which of the following best summarises the speaker's main point?"*

If the question is conditional on context (e.g. "based on paragraph 2"),
say so explicitly. If it asks for inference rather than a stated fact,
flag it: *"What can be inferred from the speaker's tone?"*

For Listening questions specifically: state how many times the audio
will play before the question is asked.

---

## 4. Other quality rules (apply automatically)

- **Time per question** should be realistic for the action: ~40s for A1
  multiple-choice, ~90s for C2 reading with passage, ~60s for B1
  Listening.
- **Distractor quality**: every wrong option should be plausible. No
  joke options, no obviously-wrong throwaways. The hardest test items
  are the ones where every option could be defended by a beginner.
- **Cultural neutrality**: avoid references to specific countries or
  political moments that age badly. A B2 reading from 2022 about
  cryptocurrency hype will look dated to a 2027 learner.
- **Length discipline**: Reading passages for C1/C2 cap at ~180 words.
  Listening scripts for any level cap at ~90 seconds of audio (~150-200
  words). Longer passages don't measure proficiency better; they measure
  endurance.

---

## 5. Known violations (audit 2026-05-18)

These existing questions violate the rules above and should be rewritten
or retired. Filed here for visibility; rewrites tracked in commits.

### Specialist topics at C1/C2 (rule 1)

| Language | Level | Topic | Status |
|----------|-------|-------|--------|
| Italian | C1 | Sapir-Whorf hypothesis | Replace with workplace topic |
| Italian | C1 | Behavioral economics (Kahneman) | Replace with workplace topic |
| Italian | C2 | Post-truth / epistemic crisis | Replace with workplace topic |
| Italian | C2 | Quantum consciousness (Penrose Orch-OR) | Replace with workplace topic |
| English | C1 | Sapir-Whorf, behavioral economics | Replace |
| English | C2 | Post-truth, quantum entanglement, philosophical zombie | Replace |
| Spanish | C1/C2 | Translated versions of above | Replace |
| French | C1/C2 | Translated versions of above | Replace |
| German | C1/C2 | Translated versions of above | Replace |

### Verbatim answers (rule 2)

The same C1/C2 reading questions above also tend to have answer options
that quote the passage word-for-word. The rewrites must include
paraphrased distractors.

### Missing images (separate but related)

6 A1 Speaking questions across all 5 languages ask the learner to "look
at the image / picture" but no `imageUrl` is set. Either provide the
image or rewrite the prompt to not require one (e.g. "Describe your own
desk / your favourite room" — same speaking skill, no image dependency).

---

## 6. When in doubt

Read the question to yourself out loud. If a smart non-native speaker
who works outside academia would say "what does that even mean?", the
topic is too specialist. Pick a different topic at the same linguistic
complexity. The Italian sentence

> *"Nell'ultimo trimestre abbiamo registrato una crescita a doppia
> cifra, ma il margine si è contratto a causa dell'investimento in
> acquisizione clienti."*

is C1-level Italian on a topic any working professional understands. The
sentence

> *"La decoerenza quantistica nei microtubuli neuronali rende la teoria
> Orch-OR difficilmente difendibile."*

is also C1-level Italian but on a topic almost no one understands. Both
test the same grammar. Only the first tests language proficiency cleanly.
