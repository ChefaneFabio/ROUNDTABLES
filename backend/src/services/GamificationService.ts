import { prisma } from '../config/database'
import { BadgeCategory, BadgeRarity, XpSource, LeaderboardPeriod } from '@prisma/client'

// XP amounts for each activity
const XP_REWARDS: Record<XpSource, number> = {
  EXERCISE_COMPLETE: 15,
  ASSESSMENT_COMPLETE: 50,
  LESSON_ATTENDED: 25,
  STREAK_BONUS: 10,
  BADGE_EARNED: 0, // Set per badge
  COURSE_COMPLETE: 100,
  VIDEO_WATCHED: 10,
  CHAT_SESSION: 10,
  SPEAKING_PRACTICE: 20,
  DAILY_LOGIN: 5,
  PERFECT_SCORE: 25,
}

// Badge definitions to seed
export const BADGE_DEFINITIONS = [
  // Milestone badges
  { slug: 'first-exercise', name: 'First Steps', description: 'Complete your first exercise', icon: 'footprints', category: 'MILESTONE' as BadgeCategory, criteria: { type: 'exercise_count', threshold: 1 }, xpReward: 10, rarity: 'COMMON' as BadgeRarity },
  { slug: 'exercise-10', name: 'Practice Makes Progress', description: 'Complete 10 exercises', icon: 'dumbbell', category: 'MILESTONE' as BadgeCategory, criteria: { type: 'exercise_count', threshold: 10 }, xpReward: 25, rarity: 'COMMON' as BadgeRarity },
  { slug: 'exercise-50', name: 'Dedicated Learner', description: 'Complete 50 exercises', icon: 'brain', category: 'MILESTONE' as BadgeCategory, criteria: { type: 'exercise_count', threshold: 50 }, xpReward: 75, rarity: 'UNCOMMON' as BadgeRarity },
  { slug: 'exercise-100', name: 'Exercise Master', description: 'Complete 100 exercises', icon: 'trophy', category: 'MILESTONE' as BadgeCategory, criteria: { type: 'exercise_count', threshold: 100 }, xpReward: 150, rarity: 'RARE' as BadgeRarity },
  { slug: 'first-lesson', name: 'Welcome to Class', description: 'Attend your first lesson', icon: 'school', category: 'MILESTONE' as BadgeCategory, criteria: { type: 'lesson_count', threshold: 1 }, xpReward: 10, rarity: 'COMMON' as BadgeRarity },
  { slug: 'lesson-25', name: 'Regular Student', description: 'Attend 25 lessons', icon: 'calendar-check', category: 'MILESTONE' as BadgeCategory, criteria: { type: 'lesson_count', threshold: 25 }, xpReward: 50, rarity: 'UNCOMMON' as BadgeRarity },
  { slug: 'first-course', name: 'Course Graduate', description: 'Complete your first course', icon: 'graduation-cap', category: 'MILESTONE' as BadgeCategory, criteria: { type: 'course_count', threshold: 1 }, xpReward: 50, rarity: 'UNCOMMON' as BadgeRarity },
  { slug: 'first-assessment', name: 'Tested & Ready', description: 'Complete your first assessment', icon: 'clipboard-check', category: 'MILESTONE' as BadgeCategory, criteria: { type: 'assessment_count', threshold: 1 }, xpReward: 15, rarity: 'COMMON' as BadgeRarity },

  // Streak badges
  { slug: 'streak-3', name: 'Getting Started', description: 'Maintain a 3-day streak', icon: 'flame', category: 'STREAK' as BadgeCategory, criteria: { type: 'streak', threshold: 3 }, xpReward: 15, rarity: 'COMMON' as BadgeRarity },
  { slug: 'streak-7', name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: 'flame', category: 'STREAK' as BadgeCategory, criteria: { type: 'streak', threshold: 7 }, xpReward: 35, rarity: 'UNCOMMON' as BadgeRarity },
  { slug: 'streak-30', name: 'Monthly Champion', description: 'Maintain a 30-day streak', icon: 'flame', category: 'STREAK' as BadgeCategory, criteria: { type: 'streak', threshold: 30 }, xpReward: 100, rarity: 'RARE' as BadgeRarity },
  { slug: 'streak-100', name: 'Unstoppable', description: 'Maintain a 100-day streak', icon: 'flame', category: 'STREAK' as BadgeCategory, criteria: { type: 'streak', threshold: 100 }, xpReward: 300, rarity: 'EPIC' as BadgeRarity },
  { slug: 'streak-365', name: 'Year of Dedication', description: 'Maintain a 365-day streak', icon: 'flame', category: 'STREAK' as BadgeCategory, criteria: { type: 'streak', threshold: 365 }, xpReward: 1000, rarity: 'LEGENDARY' as BadgeRarity },

  // Skill badges
  { slug: 'reach-a2', name: 'Elementary', description: 'Reach A2 level in any skill', icon: 'trending-up', category: 'SKILL' as BadgeCategory, criteria: { type: 'cefr_level', threshold: 'A2' }, xpReward: 25, rarity: 'COMMON' as BadgeRarity },
  { slug: 'reach-b1', name: 'Intermediate', description: 'Reach B1 level in any skill', icon: 'trending-up', category: 'SKILL' as BadgeCategory, criteria: { type: 'cefr_level', threshold: 'B1' }, xpReward: 50, rarity: 'UNCOMMON' as BadgeRarity },
  { slug: 'reach-b2', name: 'Upper Intermediate', description: 'Reach B2 level in any skill', icon: 'trending-up', category: 'SKILL' as BadgeCategory, criteria: { type: 'cefr_level', threshold: 'B2' }, xpReward: 100, rarity: 'RARE' as BadgeRarity },
  { slug: 'reach-c1', name: 'Advanced Speaker', description: 'Reach C1 level in any skill', icon: 'award', category: 'SKILL' as BadgeCategory, criteria: { type: 'cefr_level', threshold: 'C1' }, xpReward: 200, rarity: 'EPIC' as BadgeRarity },
  { slug: 'reach-c2', name: 'Language Master', description: 'Reach C2 level in any skill', icon: 'crown', category: 'SKILL' as BadgeCategory, criteria: { type: 'cefr_level', threshold: 'C2' }, xpReward: 500, rarity: 'LEGENDARY' as BadgeRarity },

  // Perfection badges
  { slug: 'perfect-exercise', name: 'Flawless', description: 'Score 100% on an exercise', icon: 'sparkles', category: 'PERFECTION' as BadgeCategory, criteria: { type: 'perfect_score_count', threshold: 1 }, xpReward: 20, rarity: 'COMMON' as BadgeRarity },
  { slug: 'perfect-10', name: 'Perfectionist', description: 'Score 100% on 10 exercises', icon: 'sparkles', category: 'PERFECTION' as BadgeCategory, criteria: { type: 'perfect_score_count', threshold: 10 }, xpReward: 75, rarity: 'RARE' as BadgeRarity },

  // Explorer badges
  { slug: 'try-all-exercise-types', name: 'Jack of All Trades', description: 'Try every exercise type', icon: 'compass', category: 'EXPLORER' as BadgeCategory, criteria: { type: 'exercise_types', threshold: 7 }, xpReward: 50, rarity: 'UNCOMMON' as BadgeRarity },
  { slug: 'first-video', name: 'Visual Learner', description: 'Watch your first video', icon: 'play-circle', category: 'EXPLORER' as BadgeCategory, criteria: { type: 'video_count', threshold: 1 }, xpReward: 10, rarity: 'COMMON' as BadgeRarity },
  { slug: 'first-chat', name: 'Conversation Starter', description: 'Have your first AI chat', icon: 'message-circle', category: 'EXPLORER' as BadgeCategory, criteria: { type: 'chat_count', threshold: 1 }, xpReward: 10, rarity: 'COMMON' as BadgeRarity },
  { slug: 'first-speaking', name: 'Finding Your Voice', description: 'Complete your first speaking practice', icon: 'mic', category: 'EXPLORER' as BadgeCategory, criteria: { type: 'speaking_count', threshold: 1 }, xpReward: 10, rarity: 'COMMON' as BadgeRarity },

  // Speed badges
  { slug: 'speed-exercise', name: 'Quick Thinker', description: 'Complete an exercise in under 1 minute', icon: 'zap', category: 'SPEED' as BadgeCategory, criteria: { type: 'fast_exercise', threshold: 60 }, xpReward: 20, rarity: 'UNCOMMON' as BadgeRarity },
]

class GamificationService {

  // ─── XP ─────────────────────────────────────────────

  async awardXp(studentId: string, source: XpSource, sourceId?: string, customAmount?: number): Promise<{ xp: number; newBadges: string[] }> {
    const amount = customAmount ?? XP_REWARDS[source]
    if (amount <= 0 && !customAmount) return { xp: 0, newBadges: [] }

    await prisma.xpTransaction.create({
      data: { studentId, amount, source, sourceId }
    })

    // Check for new badges after awarding XP
    const newBadges = await this.checkAndAwardBadges(studentId)

    return { xp: amount, newBadges: newBadges.map(b => b.name) }
  }

  async getTotalXp(studentId: string): Promise<number> {
    const result = await prisma.xpTransaction.aggregate({
      where: { studentId },
      _sum: { amount: true }
    })
    return result._sum.amount ?? 0
  }

  async getXpHistory(studentId: string, page = 1, limit = 20) {
    const [transactions, total] = await Promise.all([
      prisma.xpTransaction.findMany({
        where: { studentId },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.xpTransaction.count({ where: { studentId } })
    ])
    return { transactions, total }
  }

  // ─── STREAKS ────────────────────────────────────────

  async recordActivity(studentId: string): Promise<{ currentStreak: number; isNewDay: boolean }> {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    let streak = await prisma.streak.findUnique({ where: { studentId } })

    if (!streak) {
      streak = await prisma.streak.create({
        data: { studentId, currentStreak: 1, longestStreak: 1, lastActivityDate: today }
      })
      // Award daily login XP
      await this.awardXp(studentId, 'DAILY_LOGIN')
      return { currentStreak: 1, isNewDay: true }
    }

    const lastDate = streak.lastActivityDate ? new Date(streak.lastActivityDate) : null
    if (lastDate) lastDate.setHours(0, 0, 0, 0)

    // Same day — no streak change
    if (lastDate && lastDate.getTime() === today.getTime()) {
      return { currentStreak: streak.currentStreak, isNewDay: false }
    }

    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    let newStreak: number
    let freezeUsed = streak.streakFreezeUsed

    if (lastDate && lastDate.getTime() === yesterday.getTime()) {
      // Consecutive day
      newStreak = streak.currentStreak + 1
      freezeUsed = false
    } else if (
      lastDate &&
      !streak.streakFreezeUsed &&
      streak.freezesRemaining > 0 &&
      lastDate.getTime() === new Date(today.getTime() - 2 * 86400000).getTime()
    ) {
      // Missed 1 day but have freeze available
      newStreak = streak.currentStreak + 1
      freezeUsed = true
    } else {
      // Streak broken
      newStreak = 1
      freezeUsed = false
    }

    const longestStreak = Math.max(streak.longestStreak, newStreak)

    await prisma.streak.update({
      where: { studentId },
      data: {
        currentStreak: newStreak,
        longestStreak,
        lastActivityDate: today,
        streakFreezeUsed: freezeUsed,
        freezesRemaining: freezeUsed ? streak.freezesRemaining - 1 : streak.freezesRemaining,
      }
    })

    // Award streak bonus XP every 7 days
    if (newStreak > 0 && newStreak % 7 === 0) {
      await this.awardXp(studentId, 'STREAK_BONUS', undefined, newStreak)
    }

    // Award daily login XP
    await this.awardXp(studentId, 'DAILY_LOGIN')

    // Check streak badges
    await this.checkAndAwardBadges(studentId)

    return { currentStreak: newStreak, isNewDay: true }
  }

  async getStreak(studentId: string) {
    let streak = await prisma.streak.findUnique({ where: { studentId } })
    if (!streak) {
      streak = await prisma.streak.create({
        data: { studentId, currentStreak: 0, longestStreak: 0 }
      })
    }

    // Check if streak is still active (not missed today or yesterday)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const lastDate = streak.lastActivityDate ? new Date(streak.lastActivityDate) : null
    if (lastDate) lastDate.setHours(0, 0, 0, 0)

    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const isActive = lastDate !== null && (
      lastDate.getTime() === today.getTime() ||
      lastDate.getTime() === yesterday.getTime()
    )

    return {
      currentStreak: isActive ? streak.currentStreak : 0,
      longestStreak: streak.longestStreak,
      lastActivityDate: streak.lastActivityDate,
      freezesRemaining: streak.freezesRemaining,
      todayCompleted: lastDate !== null && lastDate.getTime() === today.getTime(),
    }
  }

  // ─── BADGES ─────────────────────────────────────────

  async getStudentBadges(studentId: string) {
    const [earned, allBadges] = await Promise.all([
      prisma.userBadge.findMany({
        where: { studentId },
        include: { badge: true },
        orderBy: { earnedAt: 'desc' }
      }),
      prisma.badge.findMany({ where: { isActive: true }, orderBy: { category: 'asc' } })
    ])

    const earnedIds = new Set(earned.map(e => e.badgeId))

    return {
      earned: earned.map(e => ({ ...e.badge, earnedAt: e.earnedAt })),
      available: allBadges.filter(b => !earnedIds.has(b.id)),
      totalEarned: earned.length,
      totalAvailable: allBadges.length,
    }
  }

  async checkAndAwardBadges(studentId: string): Promise<Array<{ name: string; slug: string }>> {
    const allBadges = await prisma.badge.findMany({ where: { isActive: true } })
    const earnedBadges = await prisma.userBadge.findMany({
      where: { studentId },
      select: { badgeId: true }
    })
    const earnedIds = new Set(earnedBadges.map(b => b.badgeId))

    const newBadges: Array<{ name: string; slug: string }> = []

    for (const badge of allBadges) {
      if (earnedIds.has(badge.id)) continue

      const criteria = badge.criteria as { type: string; threshold: number | string }
      const met = await this.isCriteriaMet(studentId, criteria)

      if (met) {
        await prisma.userBadge.create({
          data: { studentId, badgeId: badge.id }
        })

        // Award badge XP
        if (badge.xpReward > 0) {
          await prisma.xpTransaction.create({
            data: {
              studentId,
              amount: badge.xpReward,
              source: 'BADGE_EARNED',
              sourceId: badge.id,
              note: `Earned badge: ${badge.name}`
            }
          })
        }

        newBadges.push({ name: badge.name, slug: badge.slug })
      }
    }

    return newBadges
  }

  private async isCriteriaMet(studentId: string, criteria: { type: string; threshold: number | string }): Promise<boolean> {
    const threshold = typeof criteria.threshold === 'number' ? criteria.threshold : 0

    switch (criteria.type) {
      case 'exercise_count': {
        const count = await prisma.exerciseAttempt.count({
          where: { studentId, completedAt: { not: null } }
        })
        return count >= threshold
      }
      case 'lesson_count': {
        const count = await prisma.attendance.count({
          where: { studentId, attended: true }
        })
        return count >= threshold
      }
      case 'course_count': {
        const count = await prisma.progress.count({
          where: { studentId, percentage: 100 }
        })
        return count >= threshold
      }
      case 'assessment_count': {
        const count = await prisma.assessment.count({
          where: { studentId, status: 'COMPLETED' }
        })
        return count >= threshold
      }
      case 'streak': {
        const streak = await prisma.streak.findUnique({ where: { studentId } })
        return (streak?.currentStreak ?? 0) >= threshold
      }
      case 'perfect_score_count': {
        const count = await prisma.exerciseAttempt.count({
          where: { studentId, percentage: 100, completedAt: { not: null } }
        })
        return count >= threshold
      }
      case 'video_count': {
        const count = await prisma.videoProgress.count({
          where: { studentId, isCompleted: true }
        })
        return count >= threshold
      }
      case 'chat_count': {
        const count = await prisma.chatSession.count({ where: { studentId } })
        return count >= threshold
      }
      case 'speaking_count': {
        const count = await prisma.speakingSession.count({ where: { studentId } })
        return count >= threshold
      }
      case 'exercise_types': {
        const types = await prisma.exerciseAttempt.findMany({
          where: { studentId, completedAt: { not: null } },
          select: { exercise: { select: { type: true } } },
          distinct: ['exerciseId']
        })
        const uniqueTypes = new Set(types.map(t => t.exercise.type))
        return uniqueTypes.size >= threshold
      }
      case 'cefr_level': {
        const student = await prisma.student.findUnique({
          where: { id: studentId },
          select: { languageLevel: true }
        })
        const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
        const studentIdx = levels.indexOf(student?.languageLevel ?? 'A1')
        const targetIdx = levels.indexOf(criteria.threshold as string)
        return studentIdx >= targetIdx
      }
      default:
        return false
    }
  }

  // ─── LEADERBOARD ────────────────────────────────────

  async getLeaderboard(schoolId: string, period: LeaderboardPeriod = 'WEEKLY', page = 1, limit = 20) {
    // For real-time leaderboard, query XP directly
    const now = new Date()
    let dateFilter: Date | undefined

    if (period === 'WEEKLY') {
      dateFilter = new Date(now)
      dateFilter.setDate(dateFilter.getDate() - 7)
    } else if (period === 'MONTHLY') {
      dateFilter = new Date(now)
      dateFilter.setMonth(dateFilter.getMonth() - 1)
    }

    // Get all students in school with their XP for the period
    const students = await prisma.student.findMany({
      where: { schoolId, isActive: true, deletedAt: null },
      select: {
        id: true,
        user: { select: { name: true } },
        languageLevel: true,
        streak: { select: { currentStreak: true } },
        xpTransactions: {
          where: dateFilter ? { createdAt: { gte: dateFilter } } : undefined,
          select: { amount: true }
        }
      }
    })

    const ranked = students
      .map(s => ({
        studentId: s.id,
        name: s.user.name,
        level: s.languageLevel,
        totalXp: s.xpTransactions.reduce((sum, tx) => sum + tx.amount, 0),
        currentStreak: s.streak?.currentStreak ?? 0,
      }))
      .filter(s => s.totalXp > 0)
      .sort((a, b) => b.totalXp - a.totalXp)

    const total = ranked.length
    const paginated = ranked.slice((page - 1) * limit, page * limit).map((r, i) => ({
      ...r,
      rank: (page - 1) * limit + i + 1,
    }))

    return { entries: paginated, total }
  }

  // ─── GAMIFICATION PROFILE ───────────────────────────

  async getProfile(studentId: string) {
    const [totalXp, streak, badges, recentXp] = await Promise.all([
      this.getTotalXp(studentId),
      this.getStreak(studentId),
      this.getStudentBadges(studentId),
      prisma.xpTransaction.findMany({
        where: { studentId },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
    ])

    // Calculate level (every 100 XP = 1 level)
    const level = Math.floor(totalXp / 100) + 1
    const xpInCurrentLevel = totalXp % 100
    const xpForNextLevel = 100

    return {
      totalXp,
      level,
      xpInCurrentLevel,
      xpForNextLevel,
      streak,
      badges: {
        earned: badges.earned,
        totalEarned: badges.totalEarned,
        totalAvailable: badges.totalAvailable,
      },
      recentXp,
    }
  }

  // ─── SEED BADGES ────────────────────────────────────

  async seedBadges() {
    for (const badge of BADGE_DEFINITIONS) {
      await prisma.badge.upsert({
        where: { slug: badge.slug },
        update: { name: badge.name, description: badge.description, icon: badge.icon, category: badge.category, criteria: badge.criteria, xpReward: badge.xpReward, rarity: badge.rarity },
        create: badge,
      })
    }
    console.log(`Seeded ${BADGE_DEFINITIONS.length} badges`)
  }
}

export const gamificationService = new GamificationService()
