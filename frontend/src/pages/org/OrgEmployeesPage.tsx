import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { organizationApi } from '../../services/organizationApi'
import { LanguageLevel } from '../../types'

interface Employee {
  id: string
  languageLevel: string
  user?: { name: string; email: string }
  _count?: { enrollments: number }
}

export default function OrgEmployeesPage() {
  const { organizationId } = useAuth()
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showInviteForm, setShowInviteForm] = useState(false)
  const [inviteData, setInviteData] = useState({
    email: '',
    name: '',
    languageLevel: '',
  })
  const [inviteLoading, setInviteLoading] = useState(false)
  const [inviteError, setInviteError] = useState('')
  const [inviteSuccess, setInviteSuccess] = useState('')

  const fetchEmployees = async (p: number = page) => {
    if (!organizationId) return
    try {
      setLoading(true)
      const result = await organizationApi.getEmployees(organizationId, {
        page: p,
        limit: 10,
      })
      setEmployees(result.data || [])
      if (result.meta) {
        setTotalPages(result.meta.totalPages || 1)
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load employees')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmployees(page)
  }, [organizationId, page])

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!organizationId) return
    setInviteLoading(true)
    setInviteError('')
    setInviteSuccess('')
    try {
      await organizationApi.inviteEmployee(organizationId, {
        email: inviteData.email,
        name: inviteData.name,
        languageLevel: inviteData.languageLevel || undefined,
      })
      setInviteSuccess('Employee invited successfully!')
      setInviteData({ email: '', name: '', languageLevel: '' })
      setShowInviteForm(false)
      fetchEmployees(page)
    } catch (err: any) {
      setInviteError(
        err.response?.data?.error || 'Failed to invite employee'
      )
    } finally {
      setInviteLoading(false)
    }
  }

  const handleRemove = async (studentId: string, name: string) => {
    if (!organizationId) return
    if (!window.confirm(`Are you sure you want to remove ${name}?`)) return
    try {
      await organizationApi.removeEmployee(organizationId, studentId)
      fetchEmployees(page)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to remove employee')
    }
  }

  if (loading && employees.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-600 mt-1">
            Manage your organization's employees
          </p>
        </div>
        <button
          onClick={() => setShowInviteForm(!showInviteForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          {showInviteForm ? 'Cancel' : 'Invite Employee'}
        </button>
      </div>

      {/* Alerts */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
          <button onClick={() => setError('')} className="float-right font-bold">&times;</button>
        </div>
      )}
      {inviteSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {inviteSuccess}
          <button onClick={() => setInviteSuccess('')} className="float-right font-bold">&times;</button>
        </div>
      )}

      {/* Invite Form */}
      {showInviteForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Invite New Employee
          </h3>
          {inviteError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {inviteError}
            </div>
          )}
          <form onSubmit={handleInvite} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={inviteData.name}
                  onChange={(e) =>
                    setInviteData({ ...inviteData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={inviteData.email}
                  onChange={(e) =>
                    setInviteData({ ...inviteData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="employee@company.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Language Level
              </label>
              <select
                value={inviteData.languageLevel}
                onChange={(e) =>
                  setInviteData({
                    ...inviteData,
                    languageLevel: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select level (optional)</option>
                {Object.values(LanguageLevel).map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowInviteForm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={inviteLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {inviteLoading ? 'Inviting...' : 'Send Invite'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Employees Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {employees.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No employees yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by inviting your first employee.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Language Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Enrollments
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {employees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {emp.user?.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {emp.user?.email || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          {emp.languageLevel || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {emp._count?.enrollments || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button
                          onClick={() =>
                            handleRemove(emp.id, emp.user?.name || 'this employee')
                          }
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Page {page} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
