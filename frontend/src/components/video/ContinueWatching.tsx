import React from 'react'
import { Play, Clock } from 'lucide-react'
import { VideoContent } from '../../services/videoApi'

interface ContinueWatchingProps {
  videos: VideoContent[]
  onVideoClick: (video: VideoContent) => void
  className?: string
}

export const ContinueWatching: React.FC<ContinueWatchingProps> = ({
  videos,
  onVideoClick,
  className = ''
}) => {
  if (videos.length === 0) {
    return null
  }

  const formatDuration = (seconds?: number) => {
    if (!seconds) return ''
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className={className}>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Continue Watching</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {videos.map(video => (
          <div
            key={video.id}
            className="flex-shrink-0 w-72 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onVideoClick(video)}
          >
            <div className="flex">
              {/* Thumbnail */}
              <div className="relative w-28 h-20 flex-shrink-0 bg-gray-100">
                {video.thumbnailUrl ? (
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600">
                    <Play className="w-6 h-6 text-white opacity-80" />
                  </div>
                )}
                {/* Progress bar */}
                {video.progress && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${video.progress.percentage}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 p-3 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                  {video.title}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                  {video.progress && (
                    <>
                      <span className="text-blue-600 font-medium">
                        {video.progress.percentage}% complete
                      </span>
                      <span>•</span>
                    </>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDuration(video.duration)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContinueWatching
