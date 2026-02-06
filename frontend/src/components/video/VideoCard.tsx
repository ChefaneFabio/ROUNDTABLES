import React from 'react'
import { Play, Clock, CheckCircle } from 'lucide-react'
import { VideoContent } from '../../services/videoApi'

interface VideoCardProps {
  video: VideoContent
  onClick?: () => void
  className?: string
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  onClick,
  className = ''
}) => {
  const formatDuration = (seconds?: number) => {
    if (!seconds) return ''
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progress = video.progress
  const isCompleted = progress?.isCompleted
  const progressPercent = progress?.percentage || 0

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer ${className}`}
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-100">
        {video.thumbnailUrl ? (
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600">
            <Play className="w-12 h-12 text-white opacity-80" />
          </div>
        )}

        {/* Duration badge */}
        {video.duration && (
          <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/75 rounded text-white text-xs font-medium">
            {formatDuration(video.duration)}
          </div>
        )}

        {/* Progress bar */}
        {progressPercent > 0 && !isCompleted && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300">
            <div
              className="h-full bg-blue-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

        {/* Completed badge */}
        {isCompleted && (
          <div className="absolute top-2 right-2 p-1 bg-green-500 rounded-full">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
        )}

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30">
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
            <Play className="w-6 h-6 text-blue-600 ml-1" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 line-clamp-2 mb-1">
          {video.title}
        </h3>

        {video.description && (
          <p className="text-sm text-gray-500 line-clamp-2 mb-2">
            {video.description}
          </p>
        )}

        <div className="flex items-center gap-3 text-xs text-gray-500">
          {video.cefrLevel && (
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
              {video.cefrLevel}
            </span>
          )}
          {video.category && (
            <span>{video.category.name}</span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDuration(video.duration)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
