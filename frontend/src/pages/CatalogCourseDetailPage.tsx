import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Globe,
  GraduationCap,
  Play,
  FileText,
  Clock,
  BookOpen,
  Users,
  CheckCircle,
  Layers,
  Lock,
  Eye,
  X,
  ShoppingCart,
} from 'lucide-react'
import { catalogApi } from '../services/organizationApi'
import { useAuth } from '../contexts/AuthContext'
import { Course, CourseType, CourseContent, UserRole } from '../types'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { Badge } from '../components/common/Badge'

export function CatalogCourseDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { user, isAuthenticated } = useAuth()
  const [course, setCourse] = useState<Course | null>(null)
  const [contents, setContents] = useState<CourseContent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [previewItem, setPreviewItem] = useState<CourseContent | null>(null)

  useEffect(() => {
    if (!id) return
    fetchCourseDetail()
  }, [id])

  async function fetchCourseDetail() {
    setIsLoading(true)
    setError(null)
    try {
      const courseData = await catalogApi.getCourse(id!)
      setCourse(courseData)

      if (courseData.courseType === CourseType.SELF_PACED) {
        try {
          const contentData = await catalogApi.getCourseContents(id!)
          setContents(contentData || [])
        } catch {
          setContents([])
        }
      }
    } catch (err) {
      console.error('Failed to fetch course detail:', err)
      setError('Course not found or unavailable.')
    } finally {
      setIsLoading(false)
    }
  }

  function formatDuration(seconds?: number): string {
    if (!seconds) return ''
    const mins = Math.floor(seconds / 60)
    if (mins < 60) return `${mins} min`
    const hrs = Math.floor(mins / 60)
    const remainMins = mins % 60
    return remainMins > 0 ? `${hrs}h ${remainMins}m` : `${hrs}h`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{error || 'Course not found'}</h2>
          <Link to="/catalog" className="text-primary-600 hover:text-primary-700 font-medium">
            Back to Catalog
          </Link>
        </div>
      </div>
    )
  }

  const teachers = course.courseTeachers?.map((ct) => ct.teacher?.user?.name).filter(Boolean) || []
  const isSelfPaced = course.courseType === CourseType.SELF_PACED
  const isLive = (course.courseType as string) === 'LIVE' || course.courseType === CourseType.LIVE_REMOTE || course.courseType === CourseType.LIVE_IN_PERSON
  const sortedContents = [...contents].sort((a, b) => a.orderIndex - b.orderIndex)
  const isOrgAdmin = isAuthenticated && user?.role === UserRole.ORG_ADMIN

  // CTA link logic
  const ctaHref = isOrgAdmin
    ? `/org/purchase?courseId=${course.id}`
    : '/register/organization'
  const ctaLabel = isOrgAdmin ? 'Purchase Seats' : isSelfPaced ? 'Enroll Now' : 'Contact Us'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/catalog"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Catalog
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant={isLive ? 'info' : 'primary'}>
                  {isLive ? 'Live' : 'Self-Paced'}
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

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.name}</h1>

              {course.description && (
                <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
                  {course.description}
                </p>
              )}
            </div>

            {/* Teachers */}
            {teachers.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-gray-400" />
                  {teachers.length === 1 ? 'Instructor' : 'Instructors'}
                </h2>
                <ul className="space-y-2">
                  {teachers.map((name, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <div className="h-8 w-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-medium mr-3">
                        {name!.charAt(0).toUpperCase()}
                      </div>
                      {name}
                      {course.courseTeachers?.[i]?.isPrimary && (
                        <Badge variant="primary" className="ml-2">Primary</Badge>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Self-Paced Content Outline */}
            {isSelfPaced && sortedContents.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Layers className="h-5 w-5 mr-2 text-gray-400" />
                  Course Content
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  {sortedContents.length} {sortedContents.length === 1 ? 'item' : 'items'}
                  {sortedContents.some((c) => c.isPreview) && (
                    <span className="ml-2 text-primary-600">
                      - Items marked "Preview" can be viewed for free
                    </span>
                  )}
                </p>
                <ol className="space-y-3">
                  {sortedContents.map((content, index) => {
                    const isVideo = !!content.videoId
                    const item = isVideo ? content.video : content.exercise
                    const title = item?.title || 'Untitled'
                    const cefrLevel = isVideo ? content.video?.cefrLevel : content.exercise?.cefrLevel
                    const duration = isVideo ? content.video?.duration : undefined
                    const isPreviewContent = !!content.isPreview

                    return (
                      <li
                        key={content.id}
                        className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                          isPreviewContent
                            ? 'border-primary-200 bg-primary-50 cursor-pointer hover:bg-primary-100'
                            : 'border-gray-100 bg-gray-50'
                        }`}
                        onClick={() => isPreviewContent && setPreviewItem(content)}
                        role={isPreviewContent ? 'button' : undefined}
                        tabIndex={isPreviewContent ? 0 : undefined}
                      >
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </span>
                        <div className="flex-shrink-0 mt-0.5">
                          {isPreviewContent ? (
                            <Eye className="h-4 w-4 text-primary-500" />
                          ) : isVideo ? (
                            <Play className="h-4 w-4 text-blue-500" />
                          ) : (
                            <FileText className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium text-gray-900">{title}</span>
                            {isPreviewContent && (
                              <Badge variant="primary">Preview</Badge>
                            )}
                            {!isPreviewContent && (
                              <Lock className="h-3 w-3 text-gray-400" />
                            )}
                            {content.isRequired && (
                              <Badge variant="warning">Required</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                            <span className="capitalize">{isVideo ? 'Video' : content.exercise?.type || 'Exercise'}</span>
                            {duration && (
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-0.5" />
                                {formatDuration(duration)}
                              </span>
                            )}
                            {cefrLevel && (
                              <span className="flex items-center">
                                <GraduationCap className="h-3 w-3 mr-0.5" />
                                {cefrLevel}
                              </span>
                            )}
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ol>
              </div>
            )}

            {/* Live Course Modules */}
            {isLive && course.modules && course.modules.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Layers className="h-5 w-5 mr-2 text-gray-400" />
                  Modules
                </h2>
                <ul className="space-y-3">
                  {[...course.modules]
                    .sort((a, b) => a.orderIndex - b.orderIndex)
                    .map((mod) => (
                      <li key={mod.id} className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50">
                        <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{mod.title}</p>
                          {mod.description && (
                            <p className="text-xs text-gray-500 mt-0.5">{mod.description}</p>
                          )}
                        </div>
                      </li>
                    ))}
                </ul>
                {course._count?.lessons !== undefined && (
                  <p className="mt-4 text-sm text-gray-500">
                    {course._count.lessons} {course._count.lessons === 1 ? 'lesson' : 'lessons'} total
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price & CTA Card */}
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              {course.thumbnailUrl ? (
                <img
                  src={course.thumbnailUrl}
                  alt={course.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              ) : (
                <div className="w-full h-40 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-12 w-12 text-white opacity-50" />
                </div>
              )}

              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  {course.price && Number(course.price) > 0
                    ? `${course.currency || 'EUR'} ${Number(course.price).toFixed(2)}`
                    : 'Free'}
                </span>
                {course.price && Number(course.price) > 0 && (
                  <span className="text-sm text-gray-500 block">per seat</span>
                )}
              </div>

              <Link
                to={ctaHref}
                className="block w-full text-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isOrgAdmin && <ShoppingCart className="h-4 w-4" />}
                {ctaLabel}
              </Link>

              {/* Course Info */}
              <div className="mt-6 space-y-3 text-sm">
                {course.language && (
                  <div className="flex items-center justify-between text-gray-600">
                    <span className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-gray-400" />
                      Language
                    </span>
                    <span className="font-medium text-gray-900">{course.language}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-gray-600">
                  <span className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-gray-400" />
                    Type
                  </span>
                  <span className="font-medium text-gray-900">
                    {isLive ? 'Live' : 'Self-Paced'}
                  </span>
                </div>
                {(course as any).cefrLevel && (
                  <div className="flex items-center justify-between text-gray-600">
                    <span className="flex items-center">
                      <GraduationCap className="h-4 w-4 mr-2 text-gray-400" />
                      Level
                    </span>
                    <span className="font-medium text-gray-900">{(course as any).cefrLevel}</span>
                  </div>
                )}
                {course.school?.name && (
                  <div className="flex items-center justify-between text-gray-600">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-400" />
                      School
                    </span>
                    <span className="font-medium text-gray-900">{course.school.name}</span>
                  </div>
                )}
                {course._count?.enrollments !== undefined && (
                  <div className="flex items-center justify-between text-gray-600">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-400" />
                      Learners
                    </span>
                    <span className="font-medium text-gray-900">{course._count.enrollments}</span>
                  </div>
                )}
                {course.maxStudents > 0 && (
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Max capacity</span>
                    <span className="font-medium text-gray-900">{course.maxStudents}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                {previewItem.video?.title || previewItem.exercise?.title || 'Preview'}
              </h3>
              <button
                onClick={() => setPreviewItem(null)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              {previewItem.video?.url ? (
                <div>
                  <video
                    src={previewItem.video.url}
                    controls
                    className="w-full rounded-lg"
                    autoPlay
                  >
                    Your browser does not support the video tag.
                  </video>
                  {previewItem.video.description && (
                    <p className="mt-4 text-gray-600">{previewItem.video.description}</p>
                  )}
                </div>
              ) : previewItem.exercise ? (
                <div>
                  <Badge variant="primary" className="mb-3">{previewItem.exercise.type}</Badge>
                  {previewItem.exercise.description && (
                    <p className="text-gray-600 mb-4">{previewItem.exercise.description}</p>
                  )}
                  <p className="text-sm text-gray-500">
                    Enroll in this course to complete the exercise interactively.
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">Preview content is not available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
