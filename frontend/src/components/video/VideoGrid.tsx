import React from 'react'
import { VideoContent } from '../../services/videoApi'
import VideoCard from './VideoCard'

interface VideoGridProps {
  videos: VideoContent[]
  onVideoClick: (video: VideoContent) => void
  emptyMessage?: string
  className?: string
}

export const VideoGrid: React.FC<VideoGridProps> = ({
  videos,
  onVideoClick,
  emptyMessage = 'No videos found',
  className = ''
}) => {
  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {videos.map(video => (
        <VideoCard
          key={video.id}
          video={video}
          onClick={() => onVideoClick(video)}
        />
      ))}
    </div>
  )
}

export default VideoGrid
