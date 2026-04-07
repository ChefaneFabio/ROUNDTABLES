import { useState, useEffect } from 'react'
import { BarChart3, Users, BookOpen, TrendingUp, Package, Download } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import api from '../../services/api'
import { LoadingSpinner } from '../../components/common/LoadingSpinner'

export default function OrgReportsPage() {
  const { profile } = useAuth()
  const orgId = (profile as any)?.organizationId
  const [report, setReport] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!orgId) return
    api.get(`/organizations/${orgId}/reports`).then(r => {
      setReport(r.data.data || [])
    }).catch(console.error).finally(() => setLoading(false))
  }, [orgId])

  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner /></div>

  const totalEmployees = report.length
  const avgProgress = totalEmployees > 0
    ? Math.round(report.reduce((s, r) => s + r.avgProgress, 0) / totalEmployees)
    : 0
  const totalEnrollments = report.reduce((s, r) => s + r.totalEnrollments, 0)
  const activeEnrollments = report.reduce((s, r) => s + r.activeEnrollments, 0)
  const scormCompleted = report.reduce((s, r) => s + (r.scormCompleted || 0), 0)
  const scormTotal = report.reduce((s, r) => s + (r.scormTotal || 0), 0)

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employee Progress Reports</h1>
          <p className="text-gray-600">Track your team's learning progress</p>
        </div>
        {report.length > 0 && (
          <button
            onClick={() => {
              // Build CSV with course + SCORM data
              const rows = [['Employee', 'Email', 'Level', 'Course', 'Course Status', 'Progress', 'SCORM Module', 'SCORM Status', 'SCORM Score', 'SCORM Time']]
              report.forEach((emp: any) => {
                const maxRows = Math.max(emp.courses?.length || 0, emp.scormModules?.length || 0, 1)
                for (let i = 0; i < maxRows; i++) {
                  const c = emp.courses?.[i]
                  const s = emp.scormModules?.[i]
                  rows.push([
                    i === 0 ? emp.name : '',
                    i === 0 ? emp.email : '',
                    i === 0 ? emp.languageLevel || '' : '',
                    c?.courseName || '',
                    c?.enrollmentStatus || '',
                    c ? `${c.progress}%` : '',
                    s?.packageTitle || '',
                    s?.status || '',
                    s?.score !== null && s?.score !== undefined ? `${s.score}%` : '',
                    s?.totalTime || ''
                  ])
                }
              })
              const csv = rows.map(r => r.map(v => `"${(v || '').replace(/"/g, '""')}"`).join(',')).join('\n')
              const blob = new Blob([csv], { type: 'text/csv' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = `employee-progress-${new Date().toISOString().slice(0, 10)}.csv`
              document.body.appendChild(a)
              a.click()
              a.remove()
              URL.revokeObjectURL(url)
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        )}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg"><Users className="w-5 h-5 text-blue-600" /></div>
            <div><div className="text-2xl font-bold">{totalEmployees}</div><div className="text-xs text-gray-500">Employees</div></div>
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg"><BookOpen className="w-5 h-5 text-green-600" /></div>
            <div><div className="text-2xl font-bold">{activeEnrollments}</div><div className="text-xs text-gray-500">Active Courses</div></div>
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg"><TrendingUp className="w-5 h-5 text-purple-600" /></div>
            <div><div className="text-2xl font-bold">{avgProgress}%</div><div className="text-xs text-gray-500">Avg Progress</div></div>
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg"><BarChart3 className="w-5 h-5 text-orange-600" /></div>
            <div><div className="text-2xl font-bold">{totalEnrollments}</div><div className="text-xs text-gray-500">Total Enrollments</div></div>
          </div>
        </div>
      </div>

      {/* SCORM summary */}
      {scormTotal > 0 && (
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center gap-3 mb-3">
            <Package className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-semibold text-gray-700">E-Learning Modules</h3>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-indigo-700">{scormTotal}</div>
              <div className="text-xs text-gray-500">Total Attempts</div>
            </div>
            <div>
              <div className="text-xl font-bold text-green-700">{scormCompleted}</div>
              <div className="text-xs text-gray-500">Completed</div>
            </div>
            <div>
              <div className="text-xl font-bold text-gray-700">
                {scormTotal > 0 ? Math.round((scormCompleted / scormTotal) * 100) : 0}%
              </div>
              <div className="text-xs text-gray-500">Completion Rate</div>
            </div>
          </div>
        </div>
      )}

      {/* Employee table */}
      {report.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No employees enrolled yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Employee</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Level</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Courses</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">E-Learning</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {report.map((emp: any) => (
                <tr key={emp.studentId} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{emp.name}</div>
                    <div className="text-xs text-gray-500">{emp.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    {emp.languageLevel && (
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">{emp.languageLevel}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      {emp.courses.map((c: any, i: number) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-gray-700">{c.courseName}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                            c.enrollmentStatus === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                            c.enrollmentStatus === 'COMPLETED' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                          }`}>{c.enrollmentStatus}</span>
                        </div>
                      ))}
                      {emp.courses.length === 0 && <span className="text-gray-400">No courses</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {emp.scormModules && emp.scormModules.length > 0 ? (
                      <div className="space-y-1">
                        {emp.scormModules.map((s: any, i: number) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="text-gray-700 truncate max-w-[120px]" title={s.packageTitle}>{s.packageTitle}</span>
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                              s.status === 'PASSED' || s.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                              s.status === 'INCOMPLETE' ? 'bg-amber-100 text-amber-700' :
                              s.status === 'FAILED' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                            }`}>{s.status === 'NOT_ATTEMPTED' ? 'NOT STARTED' : s.status}</span>
                            {s.score !== null && (
                              <span className="text-xs text-gray-500">{s.score}%</span>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${emp.avgProgress}%` }} />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{emp.avgProgress}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
