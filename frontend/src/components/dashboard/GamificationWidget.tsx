import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gamificationApi, GamificationProfile } from '../../services/gamificationApi'
import { Flame, Award, Star, TrendingUp } from 'lucide-react'

function getBadgeEmoji(icon: string): string {
  const emojiMap: Record<string, string> = {
    'footprints': '\u{1F463}', 'dumbbell': '\u{1F4AA}', 'brain': '\u{1F9E0}',
    'trophy': '\u{1F3C6}', 'school': '\u{1F3EB}', 'graduation-cap': '\u{1F393}',
    'flame': '\u{1F525}', 'trending-up': '\u{1F4C8}', 'award': '\u{1F3C5}',
    'crown': '\u{1F451}', 'sparkles': '\u2728', 'compass': '\u{1F9ED}',
    'zap': '\u26A1', 'star': '\u2B50', 'mic': '\u{1F3A4}',
    'message-circle': '\u{1F4AC}', 'play-circle': '\u{1F3AC}',
    'clipboard-check': '\u{1F4CB}', 'calendar-check': '\u{1F4C5}',
  }
  return emojiMap[icon] || '\u2B50'
}

export default function GamificationWidget() {
  const [profile, setProfile] = useState<GamificationProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    gamificationApi.getProfile()
      .then(setProfile)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-8 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    )
  }

  if (!profile) return null

  const xpPercent = profile.xpForNextLevel > 0
    ? (profile.xpInCurrentLevel / profile.xpForNextLevel) * 100
    : 0

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          Your Progress
        </h3>
        <Link to="/leaderboard" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          Leaderboard
        </Link>
      </div>

      {/* Level & XP */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
          <span className="text-white font-bold text-lg">{profile.level}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Level {profile.level}</span>
            <span className="text-xs text-gray-500">
              {profile.xpInCurrentLevel} / {profile.xpForNextLevel} XP
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-primary-500 to-primary-600 h-2.5 rounded-full transition-all duration-700"
              style={{ width: `${Math.min(xpPercent, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{profile.totalXp.toLocaleString()} total XP</p>
        </div>
      </div>

      {/* Streak & Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <Flame className={`w-5 h-5 mx-auto mb-1 ${profile.streak.currentStreak > 0 ? 'text-orange-500' : 'text-gray-300'}`} />
          <p className="text-lg font-bold text-gray-900">{profile.streak.currentStreak}</p>
          <p className="text-xs text-gray-500">Day Streak</p>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <Award className="w-5 h-5 mx-auto mb-1 text-purple-500" />
          <p className="text-lg font-bold text-gray-900">{profile.badges.totalEarned}</p>
          <p className="text-xs text-gray-500">Badges</p>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <TrendingUp className="w-5 h-5 mx-auto mb-1 text-blue-500" />
          <p className="text-lg font-bold text-gray-900">{profile.streak.longestStreak}</p>
          <p className="text-xs text-gray-500">Best Streak</p>
        </div>
      </div>

      {/* Recent badges */}
      {profile.badges.earned.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Recent Badges</span>
            <Link to="/badges" className="text-xs text-primary-600 hover:text-primary-700">View all</Link>
          </div>
          <div className="flex gap-2">
            {profile.badges.earned.slice(0, 5).map(badge => (
              <div
                key={badge.id}
                className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-lg"
                title={badge.name}
              >
                {getBadgeEmoji(badge.icon)}
              </div>
            ))}
            {profile.badges.totalEarned > 5 && (
              <Link
                to="/badges"
                className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-xs text-gray-500 font-medium"
              >
                +{profile.badges.totalEarned - 5}
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Streak reminder */}
      {!profile.streak.todayCompleted && profile.streak.currentStreak > 0 && (
        <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-sm text-orange-700 font-medium">
            <Flame className="w-4 h-4 inline mr-1" />
            Keep your {profile.streak.currentStreak}-day streak alive! Complete an activity today.
          </p>
        </div>
      )}
    </div>
  )
}
