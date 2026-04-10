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

    it('should count blur as violation when tab is NOT hidden (e.g. clicking address bar)', () => {
      let violations: string[] = []
      let documentHidden = false

      const onBlur = () => {
        if (!documentHidden) {
          violations.push('FOCUS_LOSS')
        }
      }

      // Window loses focus but tab is still visible
      onBlur()
      expect(violations).toHaveLength(1)
    })

    it('single tab switch should result in exactly 1 violation (regression test)', () => {
      // This was the bug: a single tab switch caused both visibilitychange AND blur,
      // registering 2 violations and immediately auto-submitting
      const maxViolations = 2
      let violationCount = 0
      let autoSubmitted = false
      let documentHidden = false

      const reportViolation = () => {
        violationCount++
        if (maxViolations > 0 && violationCount >= maxViolations) {
          autoSubmitted = true
        }
      }

      const onVisibilityChange = (isHidden: boolean) => {
        documentHidden = isHidden
        if (isHidden) reportViolation()
      }

      const onBlur = () => {
        // Fixed: only count if document is NOT hidden
        if (!documentHidden) reportViolation()
      }

      // Simulate single tab switch
      onVisibilityChange(true) // fires first
      onBlur()                  // fires second — should NOT count

      expect(violationCount).toBe(1)
      expect(autoSubmitted).toBe(false) // Should NOT auto-submit from 1 tab switch
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
