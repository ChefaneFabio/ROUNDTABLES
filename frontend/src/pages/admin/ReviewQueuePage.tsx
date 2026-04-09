import { useQuery } from 'react-query'
import { assessmentApi } from '../../services/assessmentApi'
import { TeacherReviewPanel } from '../../components/assessment/TeacherReviewPanel'
import { ClipboardCheck, Loader2 } from 'lucide-react'

export default function ReviewQueuePage() {
  const { data: pendingSections = [], isLoading } = useQuery(
    'pending-review-sections',
    () => assessmentApi.getPendingReview(),
    { refetchInterval: 30000 }
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <ClipboardCheck className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Assessment Review Queue</h1>
              <p className="text-sm text-gray-500 mt-0.5">Review and grade Writing and Speaking responses</p>
            </div>
          </div>
        </div>

        {/* Pending count badge */}
        <div className="flex items-center gap-2">
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
          ) : (
            <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
              pendingSections.length > 0
                ? 'bg-amber-100 text-amber-800'
                : 'bg-green-100 text-green-800'
            }`}>
              {pendingSections.length > 0
                ? `${pendingSections.length} pending review${pendingSections.length !== 1 ? 's' : ''}`
                : 'All caught up!'
              }
            </div>
          )}
        </div>
      </div>

      {/* Review Panel */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <TeacherReviewPanel />
      </div>
    </div>
  )
}
