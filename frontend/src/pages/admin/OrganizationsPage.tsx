import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, Building2, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { organizationApi, seatLicenseApi } from '../../services/organizationApi'
import { coursesApi } from '../../services/api'

const OrganizationsPage: React.FC = () => {
  const [organizations, setOrganizations] = useState<any[]>([])
  const [courses, setCourses] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const limit = 10

  const [showLicenseModal, setShowLicenseModal] = useState(false)
  const [licenseForm, setLicenseForm] = useState({
    organizationId: '',
    courseId: '',
    totalSeats: 10,
    pricePerSeat: 0,
    startsAt: '',
    expiresAt: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  useEffect(() => {
    loadOrganizations()
  }, [page, search])

  useEffect(() => {
    loadCourses()
  }, [])

  const loadOrganizations = async () => {
    setIsLoading(true)
    try {
      const data = await organizationApi.getOrganizations({ page, limit, search: search || undefined })
      setOrganizations(data.data || [])
      setTotalPages(data.pagination?.totalPages || 1)
      setTotal(data.pagination?.total || 0)
    } catch (error) {
      console.error('Failed to load organizations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadCourses = async () => {
    try {
      const data = await coursesApi.getAll({ limit: 100 })
      setCourses(data.data || [])
    } catch (error) {
      console.error('Failed to load courses:', error)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1)
  }

  const handleCreateLicense = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')
    setSubmitSuccess('')

    try {
      await seatLicenseApi.create({
        organizationId: licenseForm.organizationId,
        courseId: licenseForm.courseId,
        totalSeats: licenseForm.totalSeats,
        pricePerSeat: licenseForm.pricePerSeat,
        startsAt: licenseForm.startsAt,
        expiresAt: licenseForm.expiresAt || undefined,
      })
      setSubmitSuccess('Seat license created successfully.')
      setLicenseForm({
        organizationId: '',
        courseId: '',
        totalSeats: 10,
        pricePerSeat: 0,
        startsAt: '',
        expiresAt: '',
      })
      setTimeout(() => {
        setShowLicenseModal(false)
        setSubmitSuccess('')
      }, 1500)
    } catch (error: any) {
      setSubmitError(error.message || 'Failed to create seat license.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Organizations</h1>
          <p className="text-gray-600">Manage organizations and seat licenses</p>
        </div>
        <button
          onClick={() => {
            setShowLicenseModal(true)
            setSubmitError('')
            setSubmitSuccess('')
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Seat License
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search organizations..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-1/4" />
                <div className="h-5 bg-gray-200 rounded w-1/5" />
                <div className="h-5 bg-gray-200 rounded w-1/6" />
                <div className="h-5 bg-gray-200 rounded w-1/12" />
                <div className="h-5 bg-gray-200 rounded w-1/12" />
              </div>
            ))}
          </div>
        </div>
      ) : organizations.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">
            {search ? 'No organizations match your search.' : 'No organizations found.'}
          </p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Industry</th>
                    <th className="text-center px-4 py-3 font-medium text-gray-600">Employees</th>
                    <th className="text-center px-4 py-3 font-medium text-gray-600">Seat Licenses</th>
                    <th className="text-center px-4 py-3 font-medium text-gray-600">Status</th>
                    <th className="text-center px-4 py-3 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {organizations.map((org) => (
                    <tr key={org.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900">{org.name}</td>
                      <td className="px-4 py-3 text-gray-600">{org.email || '-'}</td>
                      <td className="px-4 py-3 text-gray-600">{org.industry || '-'}</td>
                      <td className="px-4 py-3 text-center text-gray-600">
                        {org._count?.employees ?? org.employeesCount ?? 0}
                      </td>
                      <td className="px-4 py-3 text-center text-gray-600">
                        {org._count?.seatLicenses ?? org.seatLicensesCount ?? 0}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            org.isActive !== false
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {org.isActive !== false ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Link
                          to={`/admin/organizations/${org.id}`}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {(page - 1) * limit + 1} - {Math.min(page * limit, total)} of {total} organizations
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Create Seat License Modal */}
      {showLicenseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Create Seat License</h2>
              <button
                onClick={() => setShowLicenseModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitSuccess && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                {submitSuccess}
              </div>
            )}
            {submitError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {submitError}
              </div>
            )}

            <form onSubmit={handleCreateLicense} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organization *
                </label>
                <select
                  value={licenseForm.organizationId}
                  onChange={(e) => setLicenseForm({ ...licenseForm, organizationId: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select organization</option>
                  {organizations.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course *
                </label>
                <select
                  value={licenseForm.courseId}
                  onChange={(e) => setLicenseForm({ ...licenseForm, courseId: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title || course.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Seats *
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={licenseForm.totalSeats}
                    onChange={(e) =>
                      setLicenseForm({ ...licenseForm, totalSeats: parseInt(e.target.value) || 0 })
                    }
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Per Seat *
                  </label>
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    value={licenseForm.pricePerSeat}
                    onChange={(e) =>
                      setLicenseForm({ ...licenseForm, pricePerSeat: parseFloat(e.target.value) || 0 })
                    }
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Starts At *
                  </label>
                  <input
                    type="date"
                    value={licenseForm.startsAt}
                    onChange={(e) => setLicenseForm({ ...licenseForm, startsAt: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expires At
                  </label>
                  <input
                    type="date"
                    value={licenseForm.expiresAt}
                    onChange={(e) => setLicenseForm({ ...licenseForm, expiresAt: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowLicenseModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Creating...' : 'Create License'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrganizationsPage
