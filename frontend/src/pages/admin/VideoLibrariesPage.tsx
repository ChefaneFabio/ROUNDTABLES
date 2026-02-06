import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Edit, Trash2, Video, Eye } from 'lucide-react'
import { videoLibraryApi, VideoLibrary } from '../../services/videoApi'

const VideoLibrariesPage: React.FC = () => {
  const navigate = useNavigate()
  const [libraries, setLibraries] = useState<VideoLibrary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingLibrary, setEditingLibrary] = useState<VideoLibrary | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    coverImage: '',
    isPublished: false
  })

  useEffect(() => {
    loadLibraries()
  }, [])

  const loadLibraries = async () => {
    setIsLoading(true)
    try {
      const data = await videoLibraryApi.getLibraries()
      setLibraries(data)
    } catch (error) {
      console.error('Failed to load libraries:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingLibrary) {
        await videoLibraryApi.updateLibrary(editingLibrary.id, formData)
      } else {
        await videoLibraryApi.createLibrary(formData)
      }
      setShowCreateModal(false)
      setEditingLibrary(null)
      setFormData({ title: '', description: '', coverImage: '', isPublished: false })
      loadLibraries()
    } catch (error) {
      console.error('Failed to save library:', error)
    }
  }

  const handleEdit = (library: VideoLibrary) => {
    setEditingLibrary(library)
    setFormData({
      title: library.title,
      description: library.description || '',
      coverImage: library.coverImage || '',
      isPublished: library.isPublished
    })
    setShowCreateModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this library?')) return
    try {
      await videoLibraryApi.deleteLibrary(id)
      loadLibraries()
    } catch (error) {
      console.error('Failed to delete library:', error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Video Libraries</h1>
          <p className="text-gray-600">Manage video content for your students</p>
        </div>
        <button
          onClick={() => {
            setEditingLibrary(null)
            setFormData({ title: '', description: '', coverImage: '', isPublished: false })
            setShowCreateModal(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Library
        </button>
      </div>

      {/* Libraries grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : libraries.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Video className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No video libraries yet</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-4 text-blue-600 hover:text-blue-700"
          >
            Create your first library
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {libraries.map(library => (
            <div
              key={library.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Cover image */}
              <div className="aspect-video bg-gray-100 relative">
                {library.coverImage ? (
                  <img
                    src={library.coverImage}
                    alt={library.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600">
                    <Video className="w-12 h-12 text-white opacity-80" />
                  </div>
                )}
                <span className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${
                  library.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {library.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{library.title}</h3>
                {library.description && (
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">{library.description}</p>
                )}

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Video className="w-4 h-4" />
                    {library._count?.videos || 0} videos
                  </span>
                  <span>{library.categories?.length || 0} categories</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => navigate(`/admin/videos/libraries/${library.id}`)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    Manage
                  </button>
                  <button
                    onClick={() => handleEdit(library)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(library.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {editingLibrary ? 'Edit Library' : 'Create Library'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter library title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter library description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://..."
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <label htmlFor="isPublished" className="text-sm text-gray-700">
                  Publish immediately
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false)
                    setEditingLibrary(null)
                  }}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingLibrary ? 'Save Changes' : 'Create Library'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default VideoLibrariesPage
