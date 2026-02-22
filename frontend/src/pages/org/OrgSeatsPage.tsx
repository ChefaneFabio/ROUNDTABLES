import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { organizationApi, seatLicenseApi } from '../../services/organizationApi'
// Types used inline via any

interface EmployeeOption {
  id: string
  user?: { name: string; email: string }
}

export default function OrgSeatsPage() {
  const { organizationId } = useAuth()
  const [licenses, setLicenses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [allocating, setAllocating] = useState<string | null>(null)
  const [employees, setEmployees] = useState<EmployeeOption[]>([])
  const [selectedEmployee, setSelectedEmployee] = useState('')
  const [actionLoading, setActionLoading] = useState(false)
  const [actionError, setActionError] = useState('')
  const [actionSuccess, setActionSuccess] = useState('')

  const fetchLicenses = async () => {
    try {
      setLoading(true)
      const result = await seatLicenseApi.getAll({ organizationId: organizationId || undefined })
      setLicenses(result.data || [])
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load seat licenses')
    } finally {
      setLoading(false)
    }
  }

  const fetchEmployees = async () => {
    if (!organizationId) return
    try {
      const result = await organizationApi.getEmployees(organizationId, { limit: 100 })
      setEmployees(result.data || [])
    } catch {
      // Silently fail; employees dropdown will be empty
    }
  }

  useEffect(() => {
    fetchLicenses()
    fetchEmployees()
  }, [organizationId])

  const handleExpand = (licenseId: string) => {
    setExpandedId(expandedId === licenseId ? null : licenseId)
    setAllocating(null)
    setSelectedEmployee('')
  }

  const handleAllocate = async (licenseId: string) => {
    if (!selectedEmployee) return
    setActionLoading(true)
    setActionError('')
    setActionSuccess('')
    try {
      await seatLicenseApi.allocateSeat(licenseId, selectedEmployee)
      setActionSuccess('Seat allocated successfully!')
      setSelectedEmployee('')
      setAllocating(null)
      fetchLicenses()
    } catch (err: any) {
      setActionError(err.response?.data?.error || 'Failed to allocate seat')
    } finally {
      setActionLoading(false)
    }
  }

  const handleRevoke = async (licenseId: string, studentId: string, name: string) => {
    if (!window.confirm(`Revoke seat from ${name}?`)) return
    setActionLoading(true)
    setActionError('')
    setActionSuccess('')
    try {
      await seatLicenseApi.revokeSeat(licenseId, studentId)
      setActionSuccess('Seat revoked successfully!')
      fetchLicenses()
    } catch (err: any) {
      setActionError(err.response?.data?.error || 'Failed to revoke seat')
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Seat Licenses</h1>
        <p className="text-gray-600 mt-1">
          Manage course seat licenses and allocations
        </p>
      </div>

      {/* Alerts */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
          <button onClick={() => setError('')} className="float-right font-bold">&times;</button>
        </div>
      )}
      {actionError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {actionError}
          <button onClick={() => setActionError('')} className="float-right font-bold">&times;</button>
        </div>
      )}
      {actionSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {actionSuccess}
          <button onClick={() => setActionSuccess('')} className="float-right font-bold">&times;</button>
        </div>
      )}

      {/* Licenses Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {licenses.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No seat licenses
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Contact your school administrator to purchase seat licenses.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Seats
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Used
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Available
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expires
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {licenses.map((license: any) => {
                  const available = license.totalSeats - (license.usedSeats || 0)
                  const isExpanded = expandedId === license.id
                  return (
                    <React.Fragment key={license.id}>
                      <tr
                        onClick={() => handleExpand(license.id)}
                        className="hover:bg-gray-50 cursor-pointer"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {license.course?.name || 'Unknown Course'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {license.totalSeats}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {license.usedSeats || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span
                            className={`font-medium ${
                              available > 0 ? 'text-green-600' : 'text-red-600'
                            }`}
                          >
                            {available}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              license.status === 'ACTIVE'
                                ? 'bg-green-100 text-green-800'
                                : license.status === 'EXPIRED'
                                ? 'bg-red-100 text-red-800'
                                : license.status === 'SUSPENDED'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {license.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {license.expiresAt
                            ? new Date(license.expiresAt).toLocaleDateString()
                            : 'Never'}
                        </td>
                      </tr>

                      {/* Expanded Row: Allocations */}
                      {isExpanded && (
                        <tr>
                          <td colSpan={6} className="px-6 py-4 bg-gray-50">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-semibold text-gray-700">
                                  Seat Allocations
                                </h4>
                                {license.status === 'ACTIVE' && available > 0 && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setAllocating(
                                        allocating === license.id ? null : license.id
                                      )
                                    }}
                                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                  >
                                    {allocating === license.id
                                      ? 'Cancel'
                                      : 'Allocate Seat'}
                                  </button>
                                )}
                              </div>

                              {/* Allocate Form */}
                              {allocating === license.id && (
                                <div
                                  className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <select
                                    value={selectedEmployee}
                                    onChange={(e) =>
                                      setSelectedEmployee(e.target.value)
                                    }
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                  >
                                    <option value="">Select an employee</option>
                                    {employees.map((emp) => (
                                      <option key={emp.id} value={emp.id}>
                                        {emp.user?.name || 'Unknown'} (
                                        {emp.user?.email || ''})
                                      </option>
                                    ))}
                                  </select>
                                  <button
                                    onClick={() => handleAllocate(license.id)}
                                    disabled={!selectedEmployee || actionLoading}
                                    className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                                  >
                                    {actionLoading ? 'Allocating...' : 'Allocate'}
                                  </button>
                                </div>
                              )}

                              {/* Allocations List */}
                              {license.seatAllocations &&
                              license.seatAllocations.length > 0 ? (
                                <div className="space-y-2">
                                  {license.seatAllocations
                                    .filter((a: any) => !a.revokedAt)
                                    .map((allocation: any) => (
                                      <div
                                        key={allocation.id}
                                        className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <div>
                                          <p className="text-sm font-medium text-gray-900">
                                            {allocation.student?.user?.name ||
                                              'Unknown'}
                                          </p>
                                          <p className="text-xs text-gray-500">
                                            {allocation.student?.user?.email || ''}{' '}
                                            &middot; Allocated{' '}
                                            {new Date(
                                              allocation.allocatedAt
                                            ).toLocaleDateString()}
                                          </p>
                                        </div>
                                        <button
                                          onClick={() =>
                                            handleRevoke(
                                              license.id,
                                              allocation.studentId,
                                              allocation.student?.user?.name ||
                                                'this employee'
                                            )
                                          }
                                          disabled={actionLoading}
                                          className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                                        >
                                          Revoke
                                        </button>
                                      </div>
                                    ))}
                                </div>
                              ) : (
                                <p className="text-sm text-gray-500 italic">
                                  No seats allocated yet.
                                </p>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
