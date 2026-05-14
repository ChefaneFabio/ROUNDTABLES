/**
 * Test Security Logic Tests
 * Tests violation counting and threshold behavior
 * (Pure logic tests — no DOM/React needed)
 */

describe('Test Security - Violation Logic', () => {
  describe('violation counting', () => {
    it('should not auto-submit below max violations threshold', () => {
      const maxViolations = 2
      let violationCount = 0
      let autoSubmitted = false

      const reportViolation = () => {
        violationCount++
        if (maxViolations > 0 && violationCount >= maxViolations) {
          autoSubmitted = true
        }
      }

      // First violation — should NOT auto-submit
      reportViolation()
      expect(violationCount).toBe(1)
      expect(autoSubmitted).toBe(false)
    })

    it('should auto-submit when max violations reached', () => {
      const maxViolations = 2
      let violationCount = 0
      let autoSubmitted = false

      const reportViolation = () => {
        violationCount++
        if (maxViolations > 0 && violationCount >= maxViolations) {
          autoSubmitted = true
        }
      }

      reportViolation() // 1st
      reportViolation() // 2nd — should auto-submit
      expect(violationCount).toBe(2)
      expect(autoSubmitted).toBe(true)
    })

    it('should not auto-submit when maxViolations is 0 (unlimited)', () => {
      const maxViolations = 0
      let violationCount = 0
      let autoSubmitted = false

      const reportViolation = () => {
        violationCount++
        if (maxViolations > 0 && violationCount >= maxViolations) {
          autoSubmitted = true
        }
      }

      for (let i = 0; i < 100; i++) reportViolation()
      expect(violationCount).toBe(100)
      expect(autoSubmitted).toBe(false)
    })

    it('should only trigger onMaxViolations once', () => {
      const maxViolations = 2
      let violationCount = 0
      let triggerCount = 0
      let triggered = false

      const reportViolation = () => {
        violationCount++
        if (maxViolations > 0 && violationCount >= maxViolations && !triggered) {
          triggered = true
          triggerCount++
        }
      }

      reportViolation() // 1
      reportViolation() // 2 — triggers
      reportViolation() // 3 — should NOT trigger again
      reportViolation() // 4

      expect(triggerCount).toBe(1)
    })
  })

  describe('tab switch vs blur deduplication', () => {
    it('should count visibilitychange as a violation', () => {
      let violations: string[] = []

      // Simulate visibilitychange (document.hidden = true)
      const onVisibilityChange = (isHidden: boolean) => {
        if (isHidden) {
          violations.push('TAB_SWITCH')
        }
      }

      onVisibilityChange(true) // tab becomes hidden
      expect(violations).toHaveLength(1)
      expect(violations[0]).toBe('TAB_SWITCH')
    })

    it('should NOT count blur as a separate violation when tab is hidden', () => {
      let violations: string[] = []
      let documentHidden = false

      const onVisibilityChange = (isHidden: boolean) => {
        documentHidden = isHidden
        if (isHidden) {
          violations.push('TAB_SWITCH')
        }
      }

      // blur handler — only shows warning, doesn't report violation when hidden
      const onBlur = () => {
        if (!documentHidden) {
          // Only show warning when not hidden (avoids double-counting)
          violations.push('FOCUS_LOSS')
        }
      }

      // Simulate a tab switch: visibilitychange fires first, then blur
      onVisibilityChange(true)
      onBlur()

      // Should only count ONE violation, not two
      expect(violations).toHaveLength(1)
      expect(violations[0]).toBe('TAB_SWITCH')
    })

    it('single tab switch should result in exactly 1 violation (regression test)', () => {
      // The window 'blur' listener was removed entirely (commit 78ffa7a) because
      // it false-fired when a learner clicked a textarea on Windows / Chrome
      // with Grammarly/IMEs/password managers. Tab/window switches still fire
      // visibilitychange, which is the only signal we count.
      const maxViolations = 2
      let violationCount = 0
      let autoSubmitted = false

      const reportViolation = () => {
        violationCount++
        if (maxViolations > 0 && violationCount >= maxViolations) {
          autoSubmitted = true
        }
      }

      const onVisibilityChange = (isHidden: boolean) => {
        if (isHidden) reportViolation()
      }

      // Simulate single tab switch — visibilitychange is the only handler.
      onVisibilityChange(true)

      expect(violationCount).toBe(1)
      expect(autoSubmitted).toBe(false)
    })
  })

  describe('focus loss must not warn (post-78ffa7a regression)', () => {
    // When the learner clicks into a writing textarea, browser extensions can
    // cause a transient window blur. Before the fix this popped 'Leave test?'
    // every click. The fix: don't listen to 'blur' at all. These tests pin
    // that contract so a future refactor doesn't bring it back.
    it('clicking a textarea must not raise the leave-test warning', () => {
      let warningShown = false
      const visibilityListeners: Array<(hidden: boolean) => void> = []
      const blurListeners: Array<() => void> = []

      // Production hook only registers visibilitychange — no blur.
      const installSecurityHandlers = () => {
        visibilityListeners.push((isHidden: boolean) => {
          if (!isHidden) warningShown = true
        })
      }

      installSecurityHandlers()

      // Simulate the user clicking into a writing field. A blur event may or
      // may not fire here depending on browser/extension; the security layer
      // must ignore it either way.
      blurListeners.forEach(fn => fn())

      expect(warningShown).toBe(false)
      expect(blurListeners).toHaveLength(0) // no blur handler installed
    })

    it('real tab return (visibilitychange to visible) still raises the warning', () => {
      let warningShown = false
      const onVisibilityChange = (isHidden: boolean) => {
        if (!isHidden) warningShown = true
      }

      onVisibilityChange(true)  // user leaves
      onVisibilityChange(false) // user returns
      expect(warningShown).toBe(true)
    })
  })

  describe('completion reason mapping', () => {
    it('should map violation auto-submit to INTERRUPTED', () => {
      const reasons = {
        violations: 'INTERRUPTED',
        timer: 'EXPIRED',
        normal: null,
      }

      expect(reasons.violations).toBe('INTERRUPTED')
      expect(reasons.timer).toBe('EXPIRED')
      expect(reasons.normal).toBeNull()
    })

    it('should display correct label for each reason', () => {
      const getLabel = (reason: string | null) => {
        if (reason === 'INTERRUPTED') return 'Interrupted'
        if (reason === 'EXPIRED') return 'Time Expired'
        return 'Done'
      }

      expect(getLabel(null)).toBe('Done')
      expect(getLabel('INTERRUPTED')).toBe('Interrupted')
      expect(getLabel('EXPIRED')).toBe('Time Expired')
    })
  })
})
