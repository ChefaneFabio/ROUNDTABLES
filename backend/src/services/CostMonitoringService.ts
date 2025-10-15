import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * Cost Monitoring Service
 *
 * Tracks costs associated with roundtable operations:
 * - Level tests for participants
 * - Trainer session fees
 * - Overhead costs
 *
 * Sends alerts when costs approach or exceed budgets
 */

interface CostBreakdown {
  roundtableId: string
  roundtableName: string
  clientName: string
  levelTestCosts: number
  trainerSessionCosts: number
  overheadCosts: number
  totalCosts: number
  budget?: number
  budgetUtilization?: number
  isOverBudget: boolean
  participantCount: number
  levelTestsRequired: number
  levelTestsConducted: number
  levelTestsFailed: number
  sessionsScheduled: number
  sessionsCompleted: number
}

export class CostMonitoringService {
  // Default costs (can be overridden in environment variables)
  private readonly LEVEL_TEST_COST = Number(process.env.LEVEL_TEST_COST) || 50 // EUR per test
  private readonly TRAINER_SESSION_COST = Number(process.env.TRAINER_SESSION_COST) || 100 // EUR per session
  private readonly OVERHEAD_PER_PARTICIPANT = Number(process.env.OVERHEAD_PER_PARTICIPANT) || 20 // EUR per participant

  /**
   * Calculate total costs for a roundtable
   */
  async calculateRoundtableCosts(roundtableId: string): Promise<CostBreakdown> {
    const roundtable = await prisma.roundtable.findUnique({
      where: { id: roundtableId },
      include: {
        client: true,
        participants: true,
        sessions: true
      }
    })

    if (!roundtable) {
      throw new Error('Roundtable not found')
    }

    // Count participants by status
    const allParticipants = roundtable.participants.length
    const levelTestsFailed = roundtable.participants.filter(p => p.status === 'LEVEL_TEST_FAILED').length
    const activeParticipants = roundtable.participants.filter(
      p => !['DROPPED_OUT', 'LEVEL_TEST_FAILED'].includes(p.status)
    ).length

    // Calculate level test costs
    // Assumption: We test everyone initially, some may need retests
    const levelTestsRequired = roundtable.participants.filter(p => p.status === 'LEVEL_TEST_REQUIRED').length
    const levelTestsConducted = allParticipants - roundtable.participants.filter(p => p.status === 'INVITED').length
    const levelTestCosts = levelTestsConducted * this.LEVEL_TEST_COST

    // Calculate trainer session costs
    const sessionsCompleted = roundtable.sessions.filter(s => s.status === 'COMPLETED').length
    const sessionsScheduled = roundtable.sessions.filter(
      s => !['CANCELLED'].includes(s.status)
    ).length
    const trainerSessionCosts = sessionsCompleted * this.TRAINER_SESSION_COST

    // Calculate overhead costs (coordination, materials, platform)
    const overheadCosts = activeParticipants * this.OVERHEAD_PER_PARTICIPANT

    // Total costs
    const totalCosts = levelTestCosts + trainerSessionCosts + overheadCosts

    // Budget calculation (if set)
    // Typical budget: (6 participants * 10 sessions * trainer cost) + overhead + level tests
    const estimatedBudget =
      activeParticipants * 10 * this.TRAINER_SESSION_COST +
      activeParticipants * this.OVERHEAD_PER_PARTICIPANT +
      (allParticipants + 2) * this.LEVEL_TEST_COST // Buffer for retests

    const budgetUtilization = (totalCosts / estimatedBudget) * 100
    const isOverBudget = totalCosts > estimatedBudget

    return {
      roundtableId,
      roundtableName: roundtable.name,
      clientName: roundtable.client.name,
      levelTestCosts,
      trainerSessionCosts,
      overheadCosts,
      totalCosts,
      budget: estimatedBudget,
      budgetUtilization,
      isOverBudget,
      participantCount: allParticipants,
      levelTestsRequired,
      levelTestsConducted,
      levelTestsFailed,
      sessionsScheduled,
      sessionsCompleted
    }
  }

  /**
   * Get cost summary for all active roundtables
   */
  async getAllActiveCosts(): Promise<CostBreakdown[]> {
    const activeRoundtables = await prisma.roundtable.findMany({
      where: {
        status: { in: ['SETUP', 'TOPIC_VOTING', 'SCHEDULED', 'IN_PROGRESS'] }
      },
      select: { id: true }
    })

    const costBreakdowns = await Promise.all(
      activeRoundtables.map(rt => this.calculateRoundtableCosts(rt.id))
    )

    return costBreakdowns
  }

  /**
   * Get roundtables approaching or exceeding budget
   */
  async getOverBudgetRoundtables(threshold: number = 80): Promise<CostBreakdown[]> {
    const allCosts = await this.getAllActiveCosts()

    return allCosts.filter(
      cost => cost.budgetUtilization !== undefined && cost.budgetUtilization >= threshold
    )
  }

  /**
   * Get roundtables with high level test failure rates
   */
  async getHighLevelTestFailureRates(threshold: number = 0.3): Promise<
    Array<{
      roundtableId: string
      roundtableName: string
      clientName: string
      totalTests: number
      failedTests: number
      failureRate: number
      extraCosts: number
    }>
  > {
    const allCosts = await this.getAllActiveCosts()

    const highFailureRates = allCosts
      .filter(cost => {
        const failureRate = cost.levelTestsConducted > 0 ? cost.levelTestsFailed / cost.levelTestsConducted : 0
        return failureRate >= threshold
      })
      .map(cost => {
        const failureRate = cost.levelTestsFailed / cost.levelTestsConducted
        const extraCosts = cost.levelTestsFailed * this.LEVEL_TEST_COST
        return {
          roundtableId: cost.roundtableId,
          roundtableName: cost.roundtableName,
          clientName: cost.clientName,
          totalTests: cost.levelTestsConducted,
          failedTests: cost.levelTestsFailed,
          failureRate,
          extraCosts
        }
      })

    return highFailureRates
  }

  /**
   * Generate cost alert message for coordinators
   */
  async generateCostAlertMessage(): Promise<string | null> {
    const overBudgetRoundtables = await this.getOverBudgetRoundtables(80)
    const highFailureRates = await this.getHighLevelTestFailureRates(0.3)

    if (overBudgetRoundtables.length === 0 && highFailureRates.length === 0) {
      return null // No alerts needed
    }

    let message = '💰 Cost Monitoring Alert\n\n'

    if (overBudgetRoundtables.length > 0) {
      message += `⚠️ ${overBudgetRoundtables.length} Roundtable(s) Approaching/Exceeding Budget:\n\n`

      for (const rt of overBudgetRoundtables) {
        const status = rt.isOverBudget ? '🔴 OVER BUDGET' : '🟡 WARNING'
        message += `${status} - ${rt.roundtableName} (${rt.clientName})\n`
        message += `  Budget Utilization: ${rt.budgetUtilization?.toFixed(1)}%\n`
        message += `  Total Costs: €${rt.totalCosts.toFixed(2)} / €${rt.budget?.toFixed(2)}\n`
        message += `  Breakdown:\n`
        message += `    - Level Tests: €${rt.levelTestCosts.toFixed(2)} (${rt.levelTestsConducted} tests, ${rt.levelTestsFailed} failed)\n`
        message += `    - Trainer Sessions: €${rt.trainerSessionCosts.toFixed(2)} (${rt.sessionsCompleted}/${rt.sessionsScheduled} completed)\n`
        message += `    - Overhead: €${rt.overheadCosts.toFixed(2)} (${rt.participantCount} participants)\n\n`
      }
    }

    if (highFailureRates.length > 0) {
      message += `\n⚠️ ${highFailureRates.length} Roundtable(s) with High Level Test Failure Rates:\n\n`

      for (const rt of highFailureRates) {
        message += `🔴 ${rt.roundtableName} (${rt.clientName})\n`
        message += `  Failure Rate: ${(rt.failureRate * 100).toFixed(1)}% (${rt.failedTests}/${rt.totalTests})\n`
        message += `  Extra Costs: €${rt.extraCosts.toFixed(2)}\n`
        message += `  ⚡ Action: Review participant selection criteria with client\n\n`
      }
    }

    message += `\nDashboard: ${process.env.FRONTEND_URL || 'https://roundtables.makaitalia.com'}/dashboard/costs\n`
    message += `\nGenerated: ${new Date().toLocaleString()}`

    return message
  }

  /**
   * Get overall cost statistics
   */
  async getOverallStatistics(): Promise<{
    totalRoundtables: number
    totalParticipants: number
    totalLevelTests: number
    totalSessionsCompleted: number
    totalCosts: number
    averageCostPerRoundtable: number
    averageCostPerParticipant: number
    budgetUtilizationAverage: number
  }> {
    const allCosts = await this.getAllActiveCosts()

    const totalRoundtables = allCosts.length
    const totalParticipants = allCosts.reduce((sum, cost) => sum + cost.participantCount, 0)
    const totalLevelTests = allCosts.reduce((sum, cost) => sum + cost.levelTestsConducted, 0)
    const totalSessionsCompleted = allCosts.reduce((sum, cost) => sum + cost.sessionsCompleted, 0)
    const totalCosts = allCosts.reduce((sum, cost) => sum + cost.totalCosts, 0)

    const averageCostPerRoundtable = totalRoundtables > 0 ? totalCosts / totalRoundtables : 0
    const averageCostPerParticipant = totalParticipants > 0 ? totalCosts / totalParticipants : 0

    const budgetUtilizations = allCosts
      .filter(cost => cost.budgetUtilization !== undefined)
      .map(cost => cost.budgetUtilization!)
    const budgetUtilizationAverage =
      budgetUtilizations.length > 0
        ? budgetUtilizations.reduce((sum, util) => sum + util, 0) / budgetUtilizations.length
        : 0

    return {
      totalRoundtables,
      totalParticipants,
      totalLevelTests,
      totalSessionsCompleted,
      totalCosts,
      averageCostPerRoundtable,
      averageCostPerParticipant,
      budgetUtilizationAverage
    }
  }
}
