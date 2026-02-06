import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, Eye, Tag, BookOpen } from 'lucide-react'
import { videoLibraryApi, VideoContent } from '../services/videoApi'
import VideoPlayer from '../components/video/VideoPlayer'
import VideoCard from '../components/video/VideoCard'

const VideoPlayerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [video, setVideo] = useState<VideoContent | null>(null)
  const [relatedVideos, setRelatedVideos] = useState<VideoContent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      loadVideo(id)
    }
  }, [id])

  const loadVideo = async (videoId: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await videoLibraryApi.getVideo(videoId)
      setVideo(data)

      // Load related videos (same level or category)
      if (data.cefrLevel) {
        const related = await videoLibraryApi.getVideosByLevel(data.cefrLevel)
        setRelatedVideos(related.filter(v => v.id !== videoId).slice(0, 4))
      }
    } catch (err) {
      setError('Failed to load video')
    } finally {
      setIsLoading(false)
    }
  }

  const handleProgress = async (watchedSeconds: number, totalSeconds: number) => {
    if (!id) return
    try {
      await videoLibraryApi.updateProgress(id, { watchedSeconds, totalSeconds })
    } catch (err) {
      console.error('Failed to update progress:', err)
    }
  }

  const handleComplete = () => {
    // Video completed
    console.log('Video completed!')
  }

  const formatDuration = (seconds?: number) => {
    if (!seconds) return ''
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-32 bg-gray-200 rounded" />
          <div className="aspect-video bg-gray-200 rounded-xl" />
          <div className="h-6 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-1/2 bg-gray-200 rounded" />
        </div>
      </div>
    )
  }

  if (error || !video) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <button
          onClick={() => navigate('/videos')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Library
        </button>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-700">{error || 'Video not found'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Back button */}
      <button
        onClick={() => navigate('/videos')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Library
      </button>

      {/* Video player */}
      <VideoPlayer
        url={video.url}
        title={video.title}
        onProgress={handleProgress}
        onComplete={handleComplete}
        initialProgress={video.progress?.watchedSeconds || 0}
        subtitlesUrl={video.subtitlesUrl}
        className="rounded-xl overflow-hidden"
      />

      {/* Video info */}
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">{video.title}</h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            {video.cefrLevel && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                {video.cefrLevel}
              </span>
            )}
            {video.duration && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatDuration(video.duration)}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {video.viewCount} views
            </span>
            {video.category && (
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {video.category.name}
              </span>
            )}
          </div>

          {/* Description */}
          {video.description && (
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600">{video.description}</p>
            </div>
          )}

          {/* Tags */}
          {video.tags && video.tags.length > 0 && (
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {video.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Transcript */}
          {video.transcript && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Transcript</h3>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 max-h-96 overflow-y-auto">
                <p className="text-gray-700 whitespace-pre-wrap">{video.transcript}</p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Related videos */}
        <div>
          {relatedVideos.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Videos</h3>
              <div className="space-y-4">
                {relatedVideos.map(relatedVideo => (
                  <VideoCard
                    key={relatedVideo.id}
                    video={relatedVideo}
                    onClick={() => navigate(`/videos/${relatedVideo.id}`)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoPlayerPage
