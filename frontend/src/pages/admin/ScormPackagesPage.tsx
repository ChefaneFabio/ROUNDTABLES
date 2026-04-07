import React, { useState, useEffect, useRef } from 'react'
import { Package, Upload, Trash2, Eye, EyeOff, Search, Users, ExternalLink, X } from 'lucide-react'
import { scormApi } from '../../services/api'

const ScormPackagesPage: React.FC = () => {
  const [packages, setPackages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState<any>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState('')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadTitle, setUploadTitle] = useState('')
  const [uploadDescription, setUploadDescription] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showAttemptsModal, setShowAttemptsModal] = useState<string | null>(null)
  const [attempts, setAttempts] = useState<any[]>([])
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadPackages()
  }, [page, search])

  const loadPackages = async () => {
    setIsLoading(true)
    try {
      const data = await scormApi.list({ page, limit: 20, search: search || undefined })
      setPackages(data.packages)
      setPagination(data.pagination)
    } catch (error) {
      console.error('Failed to load SCORM packages:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) return

    setIsUploading(true)
    setUploadProgress('Uploading and processing SCORM package...')
    try {
      await scormApi.upload(selectedFile, uploadTitle || undefined, uploadDescription || undefined)
      setShowUploadModal(false)
      setSelectedFile(null)
      setUploadTitle('')
      setUploadDescription('')
      setUploadProgress('')
      loadPackages()
    } catch (error: any) {
      setUploadProgress(`Error: ${error.message || 'Upload failed'}`)
    } finally {
      setIsUploading(false)
    }
  }

  const handleTogglePublish = async (pkg: any) => {
    try {
      await scormApi.update(pkg.id, { isPublished: !pkg.isPublished })
      loadPackages()
    } catch (error) {
      console.error('Failed to update package:', error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await scormApi.remove(id)
      setDeleteConfirm(null)
      loadPackages()
    } catch (error) {
      console.error('Failed to delete package:', error)
    }
  }

  const handleViewAttempts = async (packageId: string) => {
    setShowAttemptsModal(packageId)
    try {
      const data = await scormApi.getAttempts(packageId)
      setAttempts(data)
    } catch (error) {
      console.error('Failed to load attempts:', error)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      NOT_ATTEMPTED: 'bg-gray-100 text-gray-600',
      INCOMPLETE: 'bg-amber-100 text-amber-700',
      COMPLETED: 'bg-green-100 text-green-700',
      PASSED: 'bg-green-100 text-green-700',
      FAILED: 'bg-red-100 text-red-700'
    }
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[status] || colors.NOT_ATTEMPTED}`}>
        {status.replace('_', ' ')}
      </span>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SCORM Packages</h1>
          <p className="text-sm text-gray-500 mt-1">Upload and manage SCORM e-learning content</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Upload className="w-4 h-4" />
          Upload Package
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          placeholder="Search SCORM packages..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Packages list */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : packages.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No SCORM packages uploaded yet</p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="mt-4 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
          >
            Upload your first package
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Package</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Version</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Size</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Usage</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {packages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 rounded-lg">
                        <Package className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{pkg.title}</div>
                        <div className="text-xs text-gray-500">{pkg.filename}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-mono text-gray-600">
                      {pkg.version === 'SCORM_12' ? '1.2' : '2004'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {formatFileSize(pkg.fileSize)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span title="Attempts">{pkg._count?.attempts || 0} attempts</span>
                      <span title="In courses">{pkg._count?.courseContents || 0} courses</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {pkg.isPublished ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleViewAttempts(pkg.id)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 rounded transition-colors"
                        title="View attempts"
                      >
                        <Users className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleTogglePublish(pkg)}
                        className="p-1.5 text-gray-400 hover:text-indigo-600 rounded transition-colors"
                        title={pkg.isPublished ? 'Unpublish' : 'Publish'}
                      >
                        {pkg.isPublished ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <a
                        href={`/scorm/${pkg.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-gray-400 hover:text-green-600 rounded transition-colors"
                        title="Preview"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      {deleteConfirm === pkg.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(pkg.id)}
                            className="px-2 py-1 text-xs text-white bg-red-600 rounded hover:bg-red-700"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(pkg.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {page} of {pagination.pages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
            disabled={page === pagination.pages}
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Upload SCORM Package</h2>
              <button onClick={() => setShowUploadModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpload} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SCORM ZIP File *</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".zip"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Supports SCORM 1.2 and SCORM 2004 packages. Must contain imsmanifest.xml.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title (optional)</label>
                <input
                  type="text"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="Auto-detected from manifest if empty"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
                <textarea
                  value={uploadDescription}
                  onChange={(e) => setUploadDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {uploadProgress && (
                <p className={`text-sm ${uploadProgress.startsWith('Error') ? 'text-red-600' : 'text-indigo-600'}`}>
                  {uploadProgress}
                </p>
              )}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!selectedFile || isUploading}
                  className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                  {isUploading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Attempts Modal */}
      {showAttemptsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Student Attempts</h2>
              <button onClick={() => { setShowAttemptsModal(null); setAttempts([]) }} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              {attempts.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No attempts recorded yet</p>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-3 py-2 text-xs font-medium text-gray-500 uppercase">Student</th>
                      <th className="text-left px-3 py-2 text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="text-left px-3 py-2 text-xs font-medium text-gray-500 uppercase">Score</th>
                      <th className="text-left px-3 py-2 text-xs font-medium text-gray-500 uppercase">Time</th>
                      <th className="text-left px-3 py-2 text-xs font-medium text-gray-500 uppercase">Started</th>
                      <th className="text-right px-3 py-2 text-xs font-medium text-gray-500 uppercase"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {attempts.map((att) => (
                      <tr key={att.id}>
                        <td className="px-3 py-2 text-sm text-gray-900">
                          <div>{att.student?.user?.name} {att.student?.user?.surname || ''}</div>
                          <div className="text-xs text-gray-400">{att.student?.user?.email}</div>
                        </td>
                        <td className="px-3 py-2">{getStatusBadge(att.status)}</td>
                        <td className="px-3 py-2 text-sm text-gray-600">
                          {att.score !== null ? `${att.score}%` : '—'}
                        </td>
                        <td className="px-3 py-2 text-sm text-gray-600">
                          {att.totalTime || '—'}
                        </td>
                        <td className="px-3 py-2 text-sm text-gray-500">
                          {new Date(att.startedAt).toLocaleDateString()}
                        </td>
                        <td className="px-3 py-2 text-right">
                          <button
                            onClick={async () => {
                              if (!showAttemptsModal) return
                              await scormApi.resetAttempt(showAttemptsModal, att.id)
                              handleViewAttempts(showAttemptsModal)
                            }}
                            className="text-xs text-red-500 hover:text-red-700"
                            title="Reset this attempt"
                          >
                            Reset
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ScormPackagesPage
