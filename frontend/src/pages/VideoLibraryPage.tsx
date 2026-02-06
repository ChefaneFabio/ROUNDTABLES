import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Search, Filter, Play } from 'lucide-react'
import { videoLibraryApi, VideoContent } from '../services/videoApi'
import VideoGrid from '../components/video/VideoGrid'
import ContinueWatching from '../components/video/ContinueWatching'
import LevelFilter from '../components/video/LevelFilter'
import { useAuth } from '../contexts/AuthContext'

const VideoLibraryPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  useAuth() // For authentication check

  const [videos, setVideos] = useState<VideoContent[]>([])
  const [continueWatching, setContinueWatching] = useState<VideoContent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [selectedLevel, setSelectedLevel] = useState<string | null>(searchParams.get('level'))
  const [progress, setProgress] = useState({
    totalVideos: 0,
    completedVideos: 0,
    totalWatchTime: 0,
    completionRate: 0
  })

  // Load data
  useEffect(() => {
    loadData()
  }, [selectedLevel])

  // Load continue watching
  useEffect(() => {
    loadContinueWatching()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [videosResult, progressData] = await Promise.all([
        videoLibraryApi.browseVideos({
          cefrLevel: selectedLevel || undefined,
          search: searchQuery || undefined,
          page: 1,
          limit: 20
        }),
        videoLibraryApi.getMyProgress()
      ])

      setVideos(videosResult.videos)
      setProgress(progressData)
    } catch (error) {
      console.error('Failed to load videos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadContinueWatching = async () => {
    try {
      const data = await videoLibraryApi.getContinueWatching()
      setContinueWatching(data)
    } catch (error) {
      console.error('Failed to load continue watching:', error)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchParams(prev => {
      if (searchQuery) {
        prev.set('q', searchQuery)
      } else {
        prev.delete('q')
      }
      return prev
    })
    loadData()
  }

  const handleLevelChange = (level: string | null) => {
    setSelectedLevel(level)
    setSearchParams(prev => {
      if (level) {
        prev.set('level', level)
      } else {
        prev.delete('level')
      }
      return prev
    })
  }

  const handleVideoClick = (video: VideoContent) => {
    navigate(`/videos/${video.id}`)
  }

  const formatWatchTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    if (hours > 0) return `${hours}h ${mins}m`
    return `${mins} minutes`
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Video Library</h1>
        <p className="text-gray-600">Learn with video lessons at your pace</p>
      </div>

      {/* Progress stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Play className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{progress.totalVideos}</div>
              <div className="text-sm text-gray-500">Videos Started</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-green-600">{progress.completedVideos}</div>
          <div className="text-sm text-gray-500">Completed</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-purple-600">{formatWatchTime(progress.totalWatchTime)}</div>
          <div className="text-sm text-gray-500">Watch Time</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-blue-600">{progress.completionRate}%</div>
          <div className="text-sm text-gray-500">Completion Rate</div>
        </div>
      </div>

      {/* Continue watching */}
      {continueWatching.length > 0 && (
        <ContinueWatching
          videos={continueWatching}
          onVideoClick={handleVideoClick}
        />
      )}

      {/* Search and filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search videos..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </form>

        {/* Level filter */}
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <LevelFilter
            selectedLevel={selectedLevel}
            onLevelChange={handleLevelChange}
          />
        </div>
      </div>

      {/* Video grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-lg animate-pulse">
              <div className="aspect-video bg-gray-200 rounded-t-lg" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <VideoGrid
          videos={videos}
          onVideoClick={handleVideoClick}
          emptyMessage={
            searchQuery
              ? `No videos found for "${searchQuery}"`
              : 'No videos available yet'
          }
        />
      )}
    </div>
  )
}

export default VideoLibraryPage
