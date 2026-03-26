import { useState, useEffect } from 'react'
import { gamificationApi, BadgesResponse, Badge } from '../services/gamificationApi'
import { Award, Lock, Star, Flame, TrendingUp, Zap, Sparkles, Compass, Users } from 'lucide-react'

const CATEGORY_META: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  MILESTONE: { label: 'Milestones', icon: <Star className="w-4 h-4" />, color: 'text-blue-600' },
  STREAK: { label: 'Streaks', icon: <Flame className="w-4 h-4" />, color: 'text-orange-600' },
  SKILL: { label: 'Skills', icon: <TrendingUp className="w-4 h-4" />, color: 'text-green-600' },
  PERFECTION: { label: 'Perfection', icon: <Sparkles className="w-4 h-4" />, color: 'text-purple-600' },
  EXPLORER: { label: 'Explorer', icon: <Compass className="w-4 h-4" />, color: 'text-cyan-600' },
  SPEED: { label: 'Speed', icon: <Zap className="w-4 h-4" />, color: 'text-yellow-600' },
  SOCIAL: { label: 'Social', icon: <Users className="w-4 h-4" />, color: 'text-pink-600' },
}

const RARITY_COLORS: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  COMMON: { bg: 'bg-gray-100', border: 'border-gray-300', text: 'text-gray-600', glow: '' },
  UNCOMMON: { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-700', glow: '' },
  RARE: { bg: 'bg-blue-50', border: 'border-blue-400', text: 'text-blue-700', glow: 'shadow-blue-100' },
  EPIC: { bg: 'bg-purple-50', border: 'border-purple-400', text: 'text-purple-700', glow: 'shadow-purple-200 shadow-md' },
  LEGENDARY: { bg: 'bg-gradient-to-br from-yellow-50 to-amber-50', border: 'border-yellow-400', text: 'text-yellow-700', glow: 'shadow-yellow-200 shadow-lg' },
}

function BadgeCard({ badge, earned, earnedAt }: { badge: Badge; earned: boolean; earnedAt?: string }) {
  const rarity = RARITY_COLORS[badge.rarity] || RARITY_COLORS.COMMON

  return (
    <div
      className={`relative p-4 rounded-xl border-2 transition-all ${
        earned
          ? `${rarity.bg} ${rarity.border} ${rarity.glow}`
          : 'bg-gray-50 border-gray-200 opacity-60'
      }`}
    >
      {!earned && (
        <div className="absolute top-2 right-2">
          <Lock className="w-4 h-4 text-gray-400" />
        </div>
      )}

      <div className="text-center">
        <div className={`text-3xl mb-2 ${earned ? '' : 'grayscale'}`}>
          {getBadgeEmoji(badge.icon)}
        </div>
        <h3 className={`font-semibold text-sm ${earned ? 'text-gray-900' : 'text-gray-500'}`}>
          {badge.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1">{badge.description}</p>

        <div className="flex items-center justify-center gap-2 mt-2">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${rarity.bg} ${rarity.text} border ${rarity.border}`}>
            {badge.rarity}
          </span>
          {badge.xpReward > 0 && (
            <span className="text-xs font-medium text-primary-600">+{badge.xpReward} XP</span>
          )}
        </div>

        {earned && earnedAt && (
          <p className="text-xs text-gray-400 mt-2">
            Earned {new Date(earnedAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  )
}

function getBadgeEmoji(icon: string): string {
  const emojiMap: Record<string, string> = {
    'footprints': '\u{1F463}',
    'dumbbell': '\u{1F4AA}',
    'brain': '\u{1F9E0}',
    'trophy': '\u{1F3C6}',
    'school': '\u{1F3EB}',
    'calendar-check': '\u{1F4C5}',
    'graduation-cap': '\u{1F393}',
    'clipboard-check': '\u{1F4CB}',
    'flame': '\u{1F525}',
    'trending-up': '\u{1F4C8}',
    'award': '\u{1F3C5}',
    'crown': '\u{1F451}',
    'sparkles': '\u2728',
    'compass': '\u{1F9ED}',
    'play-circle': '\u{1F3AC}',
    'message-circle': '\u{1F4AC}',
    'mic': '\u{1F3A4}',
    'zap': '\u26A1',
    'star': '\u2B50',
  }
  return emojiMap[icon] || '\u2B50'
}

export default function BadgesPage() {
  const [badges, setBadges] = useState<BadgesResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    loadBadges()
  }, [])

  const loadBadges = async () => {
    try {
      const data = await gamificationApi.getBadges()
      setBadges(data)
    } catch (err) {
      console.error('Failed to load badges:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    )
  }

  if (!badges) {
    return <div className="text-center py-20 text-gray-500">Failed to load badges</div>
  }

  const earnedMap = new Map(badges.earned.map(b => [b.id, b.earnedAt]))
  const allBadges = [
    ...badges.earned,
    ...badges.available,
  ]

  const categories = Array.from(new Set(allBadges.map(b => b.category)))
  const filtered = filter === 'all'
    ? allBadges
    : filter === 'earned'
      ? badges.earned
      : allBadges.filter(b => b.category === filter)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Award className="w-8 h-8 text-purple-500" />
        <h1 className="text-2xl font-bold text-gray-900">Badges</h1>
      </div>
      <p className="text-gray-500 mb-6">
        {badges.totalEarned} of {badges.totalAvailable} badges earned
      </p>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
        <div
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${badges.totalAvailable > 0 ? (badges.totalEarned / badges.totalAvailable) * 100 : 0}%` }}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('earned')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            filter === 'earned' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Earned ({badges.totalEarned})
        </button>
        {categories.map(cat => {
          const meta = CATEGORY_META[cat]
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === cat ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {meta?.icon}
              {meta?.label || cat}
            </button>
          )
        })}
      </div>

      {/* Badge grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(badge => (
          <BadgeCard
            key={badge.id}
            badge={badge}
            earned={earnedMap.has(badge.id)}
            earnedAt={earnedMap.get(badge.id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No badges in this category yet
        </div>
      )}
    </div>
  )
}
