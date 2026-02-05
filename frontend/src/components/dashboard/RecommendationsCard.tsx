import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Sparkles, BookOpen, Calendar, ClipboardCheck, ChevronRight } from 'lucide-react'
import { recommendationApi, Recommendation } from '../../services/recommendationApi'
import { Card } from '../common/Card'

const ICON_MAP = {
  course: BookOpen,
  lesson: Calendar,
  assessment: ClipboardCheck
}

const LINK_MAP: Record<string, (id: string) => string> = {
  course: (id) => `/courses/${id}`,
  lesson: (id) => `/lessons/${id}`,
  assessment: (id) => id === 'placement-test' ? '/assessment' : `/assessment/${id}`
}

export function RecommendationsCard() {
  const { data: recommendations, isLoading } = useQuery(
    'recommendations',
    () => recommendationApi.getMyRecommendations(4)
  )

  if (isLoading) {
    return (
      <Card>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    )
  }

  if (!recommendations || recommendations.length === 0) {
    return null
  }

  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">Suggested for You</h3>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, index) => (
          <RecommendationItem key={index} recommendation={rec} />
        ))}
      </div>
    </Card>
  )
}

function RecommendationItem({ recommendation }: { recommendation: Recommendation }) {
  const Icon = ICON_MAP[recommendation.type] || BookOpen
  const link = LINK_MAP[recommendation.type]?.(recommendation.id) || '#'

  const bgColor = recommendation.type === 'assessment'
    ? 'bg-purple-50 hover:bg-purple-100'
    : recommendation.type === 'lesson'
    ? 'bg-blue-50 hover:bg-blue-100'
    : 'bg-green-50 hover:bg-green-100'

  const iconColor = recommendation.type === 'assessment'
    ? 'text-purple-600'
    : recommendation.type === 'lesson'
    ? 'text-blue-600'
    : 'text-green-600'

  return (
    <Link
      to={link}
      className={`block p-3 rounded-lg ${bgColor} transition-colors`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg bg-white ${iconColor}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 text-sm truncate">
            {recommendation.title}
          </p>
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
            {recommendation.reason}
          </p>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
      </div>
    </Link>
  )
}
