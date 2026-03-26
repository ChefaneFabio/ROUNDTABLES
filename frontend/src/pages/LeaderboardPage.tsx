import { useState, useEffect } from 'react'
import { gamificationApi, LeaderboardEntry } from '../services/gamificationApi'
import { Trophy, Flame, Medal, Crown } from 'lucide-react'

type Period = 'WEEKLY' | 'MONTHLY' | 'ALL_TIME'

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<Period>('WEEKLY')
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    loadLeaderboard()
  }, [period])

  const loadLeaderboard = async () => {
    setLoading(true)
    try {
      const result = await gamificationApi.getLeaderboard(period, 1, 50)
      setEntries(result.data)
      setTotal(result.meta?.total ?? result.data.length)
    } catch (err) {
      console.error('Failed to load leaderboard:', err)
    } finally {
      setLoading(false)
    }
  }

  const periodLabels: Record<Period, string> = {
    WEEKLY: 'This Week',
    MONTHLY: 'This Month',
    ALL_TIME: 'All Time',
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />
    return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-500">#{rank}</span>
  }

  const getRankBg = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200'
    if (rank === 2) return 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200'
    if (rank === 3) return 'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200'
    return 'bg-white border-gray-100'
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-8 h-8 text-yellow-500" />
        <h1 className="text-2xl font-bold text-gray-900">Leaderboard</h1>
      </div>

      {/* Period tabs */}
      <div className="flex gap-2 mb-6">
        {(['WEEKLY', 'MONTHLY', 'ALL_TIME'] as Period[]).map(p => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              period === p
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {periodLabels[p]}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
        </div>
      ) : entries.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
          <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-lg">No activity yet for {periodLabels[period].toLowerCase()}</p>
          <p className="text-gray-400 text-sm mt-1">Complete exercises and lessons to earn XP!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {entries.map((entry) => (
            <div
              key={entry.studentId}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-shadow hover:shadow-md ${getRankBg(entry.rank)}`}
            >
              <div className="flex-shrink-0">{getRankIcon(entry.rank)}</div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">{entry.name}</p>
                <p className="text-xs text-gray-500">{entry.level}</p>
              </div>

              {entry.currentStreak > 0 && (
                <div className="flex items-center gap-1 text-orange-500" title="Current streak">
                  <Flame className="w-4 h-4" />
                  <span className="text-sm font-medium">{entry.currentStreak}</span>
                </div>
              )}

              <div className="text-right">
                <p className="font-bold text-primary-600">{entry.totalXp.toLocaleString()} XP</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {total > 0 && (
        <p className="text-center text-sm text-gray-400 mt-4">
          {total} {total === 1 ? 'student' : 'students'} ranked
        </p>
      )}
    </div>
  )
}
