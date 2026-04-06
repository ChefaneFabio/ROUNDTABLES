import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, BookOpen, Globe, GraduationCap } from 'lucide-react'
import { catalogApi } from '../services/organizationApi'
import { Course, CourseType } from '../types'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { Badge } from '../components/common/Badge'
import { Pagination } from '../components/common/Table'

const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

export function CatalogPage() {
  const navigate = useNavigate()
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [meta, setMeta] = useState<{ page: number; limit: number; total: number; totalPages: number } | null>(null)
  const [search, setSearch] = useState('')
  const [language, setLanguage] = useState('')
  const [courseType, setCourseType] = useState('')
  const [cefrLevel, setCefrLevel] = useState('')

  useEffect(() => {
    fetchCourses()
  }, [page, language, courseType, cefrLevel])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(1)
      fetchCourses()
    }, 400)
    return () => clearTimeout(timeout)
  }, [search])

  async function fetchCourses() {
    setIsLoading(true)
    try {
      const params: Record<string, any> = { page, limit: 12 }
      if (search) params.search = search
      if (language) params.language = language
      if (courseType) params.courseType = courseType
      if (cefrLevel) params.cefrLevel = cefrLevel

      const result = await catalogApi.getCourses(params)
      setCourses(result.data || [])
      setMeta(result.meta || null)
    } catch (err) {
      console.error('Failed to fetch catalog courses:', err)
      setCourses([])
    } finally {
      setIsLoading(false)
    }
  }

  function clearFilters() {
    setSearch('')
    setLanguage('')
    setCourseType('')
    setCefrLevel('')
    setPage(1)
  }

  const hasActiveFilters = search || language || courseType || cefrLevel

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Course Catalog</h1>
            <p className="text-gray-600 mt-1">Browse language training courses and programs</p>
          </div>
          <Link
            to="/login"
            className="text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            Login
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={language}
            onChange={(e) => { setLanguage(e.target.value); setPage(1) }}
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          >
            <option value="">All Languages</option>
            <option value="English">English</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Spanish">Spanish</option>
            <option value="Italian">Italian</option>
          </select>

          <select
            value={courseType}
            onChange={(e) => { setCourseType(e.target.value); setPage(1) }}
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          >
            <option value="">All Types</option>
            <option value="LIVE">Live</option>
            <option value="SELF_PACED">Self-Paced</option>
          </select>

          <select
            value={cefrLevel}
            onChange={(e) => { setCefrLevel(e.target.value); setPage(1) }}
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          >
            <option value="">All Levels</option>
            {CEFR_LEVELS.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Course Grid */}
        {isLoading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-500">
              {hasActiveFilters
                ? 'Try adjusting your search or filters'
                : 'No courses are available at this time'}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CatalogCourseCard
                  key={course.id}
                  course={course}
                  onClick={() => navigate(`/catalog/${course.id}`)}
                />
              ))}
            </div>

            {meta && meta.totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={meta.totalPages}
                totalItems={meta.total}
                itemsPerPage={meta.limit}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </main>
    </div>
  )
}

function CatalogCourseCard({ course, onClick }: { course: Course; onClick: () => void }) {
  const teacherName = course.courseTeachers?.[0]?.teacher?.user?.name

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
    >
      {/* Thumbnail */}
      {course.thumbnailUrl ? (
        <img
          src={course.thumbnailUrl}
          alt={course.name}
          className="w-full h-44 object-cover"
        />
      ) : (
        <div className="w-full h-44 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
          <BookOpen className="h-16 w-16 text-white opacity-50" />
        </div>
      )}

      <div className="p-5">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant={course.courseType === 'SELF_PACED' ? 'info' : 'primary'}>
            {course.courseType === 'LIVE_REMOTE' ? 'Live Remote' : course.courseType === 'LIVE_IN_PERSON' ? 'In Person' : course.courseType === 'ROUNDTABLE' ? 'Roundtable' : course.courseType === 'SELF_PACED' ? 'Self-Paced' : 'Live'}
          </Badge>
          {course.language && (
            <Badge variant="gray">
              <Globe className="h-3 w-3 mr-1" />
              {course.language}
            </Badge>
          )}
          {(course as any).cefrLevel && (
            <Badge variant="success">
              <GraduationCap className="h-3 w-3 mr-1" />
              {(course as any).cefrLevel}
            </Badge>
          )}
        </div>

        {/* Name */}
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 mb-1">
          {course.name}
        </h3>

        {/* Description */}
        {course.description && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {course.description}
          </p>
        )}

        {/* Teacher */}
        {teacherName && (
          <p className="text-sm text-gray-500 mb-3">
            By {teacherName}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-lg font-bold text-gray-900">
            {course.price && course.price > 0
              ? `${course.currency || '$'}${course.price}`
              : 'Free'}
          </span>
          {course._count?.enrollments !== undefined && (
            <span className="text-sm text-gray-500">
              {course._count.enrollments} students
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
