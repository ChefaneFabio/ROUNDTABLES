import { useState } from 'react'
import { useQuery } from 'react-query'
import {
  Users,
  BookOpen,
  Clock,
  TrendingUp,
  Download
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts'
import { useAuth } from '../contexts/AuthContext'
import { analyticsApi, CorporateAnalytics } from '../services/analyticsApi'
import { LoadingPage } from '../components/common/LoadingSpinner'
import { Alert } from '../components/common/Alert'
import { Card } from '../components/common/Card'
import { StatCard } from '../components/dashboard/StatCard'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d']

const CEFR_COLORS: Record<string, string> = {
  A1: '#22c55e',
  A2: '#16a34a',
  B1: '#3b82f6',
  B2: '#2563eb',
  C1: '#a855f7',
  C2: '#9333ea'
}

export function AnalyticsPage() {
  const { isSchool, isAdmin } = useAuth()
  const [dateRange] = useState<{ start?: string; end?: string }>({})

  const { data, isLoading, error } = useQuery<CorporateAnalytics>(
    ['corporateAnalytics', dateRange],
    () => analyticsApi.getCorporateAnalytics(dateRange.start, dateRange.end),
    { enabled: isSchool || isAdmin }
  )

  if (isLoading) return <LoadingPage />

  if (error) {
    return (
      <div className="max-w-7xl mx-auto">
        <Alert type="error" message="Failed to load analytics data" />
      </div>
    )
  }

  if (!data) return null

  const cefrData = Object.entries(data.cefrDistribution).map(([level, count]) => ({
    name: level,
    value: count,
    color: CEFR_COLORS[level] || '#gray'
  }))

  const enrollmentData = Object.entries(data.enrollmentsByStatus).map(([status, count]) => ({
    name: status.replace(/_/g, ' '),
    value: count
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Track your organization's learning progress</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          onClick={() => {/* Export functionality */}}
        >
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Employees"
          value={data.overview.totalEmployees}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Active Courses"
          value={data.overview.activeCourses}
          icon={BookOpen}
          color="green"
        />
        <StatCard
          title="Completion Rate"
          value={`${data.overview.completionRate}%`}
          icon={TrendingUp}
          color="purple"
        />
        <StatCard
          title="Training Hours"
          value={data.overview.totalTrainingHours}
          icon={Clock}
          color="yellow"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Progress Chart */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.monthlyProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="enrolled"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Enrolled"
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#22c55e"
                strokeWidth={2}
                name="Completed"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* CEFR Distribution */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">CEFR Level Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={cefrData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {cefrData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Enrollment Status */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Enrollment Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={enrollmentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6">
              {enrollmentData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Completions */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Completions</h3>
          {data.recentCompletions.length > 0 ? (
            <div className="space-y-3">
              {data.recentCompletions.map((completion, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{completion.studentName}</p>
                    <p className="text-sm text-gray-500">{completion.courseName}</p>
                  </div>
                  <div className="text-right">
                    {completion.grade && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-medium">
                        {completion.grade}
                      </span>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(completion.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No recent completions</p>
          )}
        </Card>

        {/* Top Performers */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
          {data.topPerformers.length > 0 ? (
            <div className="space-y-3">
              {data.topPerformers.map((performer, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-400' : 'bg-gray-300'
                    }`}>
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-gray-900">{performer.studentName}</p>
                      <p className="text-sm text-gray-500">{performer.courseName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary-600">{performer.averageScore}%</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No performance data yet</p>
          )}
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-lg shadow text-center">
          <p className="text-3xl font-bold text-gray-900">{data.overview.totalCourses}</p>
          <p className="text-sm text-gray-500">Total Courses</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow text-center">
          <p className="text-3xl font-bold text-gray-900">{data.overview.activeEmployees}</p>
          <p className="text-sm text-gray-500">Active Learners</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow text-center">
          <p className="text-3xl font-bold text-gray-900">{data.overview.averageScore}%</p>
          <p className="text-sm text-gray-500">Average Score</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow text-center">
          <p className="text-3xl font-bold text-gray-900">{data.overview.totalTrainingHours}h</p>
          <p className="text-sm text-gray-500">Training Hours</p>
        </div>
      </div>
    </div>
  )
}
