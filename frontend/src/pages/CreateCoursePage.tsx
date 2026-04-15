import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useMutation } from 'react-query'
import { useForm, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ArrowLeft, Plus, Trash2, Video, Users, BookOpen, MapPin } from 'lucide-react'
import { coursesApi } from '../services/api'
import { Card, CardBody, CardHeader } from '../components/common/Card'
import { Button } from '../components/common/Button'

const schema = yup.object({
  name: yup.string().required('Course name is required'),
  description: yup.string(),
  courseType: yup.string().oneOf(['LIVE_REMOTE', 'LIVE_IN_PERSON', 'ROUNDTABLE', 'SELF_PACED']).required(),
  language: yup.string(),
  isPublic: yup.boolean(),
  startDate: yup.string(),
  endDate: yup.string(),
  maxStudents: yup.number().min(1).integer().nullable().transform((v, o) => (o === '' ? null : v)),
  price: yup.number().min(0).nullable().transform((v, o) => (o === '' ? null : v)),
  currency: yup.string(),
  modules: yup.array().of(
    yup.object({
      title: yup.string().required('Module title is required'),
      description: yup.string(),
    })
  ),
})

type FormData = yup.InferType<typeof schema>

export function CreateCoursePage() {
  const navigate = useNavigate()
  const [submitError, setSubmitError] = useState('')

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      courseType: 'LIVE_REMOTE',
      isPublic: true,
      currency: 'EUR',
      modules: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'modules',
  })

  const createMutation = useMutation(
    (data: FormData) => coursesApi.create(data),
    {
      onSuccess: (course) => {
        navigate(`/courses/${course.id}`)
      },
      onError: (error: Error) => {
        setSubmitError(error.message || 'Failed to create course')
      },
    }
  )

  const onSubmit = (data: FormData) => {
    setSubmitError('')
    createMutation.mutate(data)
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <Link
          to="/courses"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Courses
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Create Course</h1>
        <p className="text-gray-600 mt-1">Set up a new course for your learners</p>
      </div>

      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div>
              <label htmlFor="courseName" className="block text-sm font-medium text-gray-700 mb-1">
                Course Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="courseName"
                {...register('name')}
                className="input w-full"
                placeholder="e.g., English Conversation B1"
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="courseDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="courseDescription"
                {...register('description')}
                className="input w-full"
                rows={3}
                placeholder="Describe the course..."
              />
            </div>

            {/* Course Type Selection */}
            <div>
              <label id="courseTypeLabel" className="block text-sm font-medium text-gray-700 mb-2">
                Course Type <span className="text-red-500">*</span>
              </label>
              <input type="hidden" {...register('courseType')} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-labelledby="courseTypeLabel">
                {[
                  { value: 'LIVE_REMOTE', icon: Video, label: 'Live — Remote', desc: 'Online lessons via Zoom, Meet, or Teams. Trainer and learners connect remotely with video link.', color: 'border-blue-500 bg-blue-50', iconColor: 'text-blue-600 bg-blue-100' },
                  { value: 'LIVE_IN_PERSON', icon: MapPin, label: 'Live — In Person', desc: 'Face-to-face lessons at a physical location. Address and Google Maps link shared with participants.', color: 'border-amber-500 bg-amber-50', iconColor: 'text-amber-600 bg-amber-100' },
                  { value: 'ROUNDTABLE', icon: Users, label: 'Roundtable', desc: 'Group discussion sessions. Learners vote on topics and participate in collaborative conversations.', color: 'border-purple-500 bg-purple-50', iconColor: 'text-purple-600 bg-purple-100' },
                  { value: 'SELF_PACED', icon: BookOpen, label: 'Self-Paced', desc: 'Learners learn at their own pace with videos, exercises, and materials. No live sessions.', color: 'border-green-500 bg-green-50', iconColor: 'text-green-600 bg-green-100' },
                ].map(type => {
                  const Icon = type.icon
                  const isSelected = watch('courseType') === type.value
                  return (
                    <button
                      key={type.value}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      aria-label={type.label}
                      onClick={() => setValue('courseType', type.value as any)}
                      className={`p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                        isSelected ? type.color : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${isSelected ? type.iconColor : 'bg-gray-100 text-gray-500'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className="font-semibold text-sm text-gray-900">{type.label}</p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{type.desc}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="hidden">
                {/* Hidden — courseType handled above */}
              </div>

              <div>
                <label htmlFor="courseLanguage" className="block text-sm font-medium text-gray-700 mb-1">
                  Language
                </label>
                <input
                  type="text"
                  id="courseLanguage"
                  {...register('language')}
                  className="input w-full"
                  placeholder="e.g., English"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPublic"
                {...register('isPublic')}
                className="h-4 w-4 text-primary-600 rounded border-gray-300"
              />
              <label htmlFor="isPublic" className="text-sm text-gray-700">
                Make this course publicly visible in the catalog
              </label>
            </div>
          </CardBody>
        </Card>

        {/* Schedule & Pricing */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Schedule & Pricing</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  {...register('startDate')}
                  className="input w-full"
                />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  {...register('endDate')}
                  className="input w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="maxStudents" className="block text-sm font-medium text-gray-700 mb-1">
                  Max Learners
                </label>
                <input
                  type="number"
                  id="maxStudents"
                  {...register('maxStudents')}
                  className="input w-full"
                  placeholder="e.g., 20"
                  min={1}
                />
              </div>

              <div>
                <label htmlFor="coursePrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  id="coursePrice"
                  {...register('price')}
                  className="input w-full"
                  placeholder="0"
                  min={0}
                  step="0.01"
                />
              </div>

              <div>
                <label htmlFor="courseCurrency" className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <select id="courseCurrency" {...register('currency')} className="input w-full">
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Modules */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Modules</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                leftIcon={<Plus className="h-4 w-4" />}
                onClick={() => append({ title: '', description: '' })}
              >
                Add Module
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            {fields.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                No modules added yet. Modules help organize your course content.
              </p>
            ) : (
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-start gap-3 p-4 rounded-lg border border-gray-200"
                  >
                    <span className="flex-shrink-0 h-7 w-7 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-medium mt-1">
                      {index + 1}
                    </span>
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        {...register(`modules.${index}.title`)}
                        className="input w-full"
                        placeholder="Module title"
                      />
                      {errors.modules?.[index]?.title && (
                        <p className="text-sm text-red-600">
                          {errors.modules[index]?.title?.message}
                        </p>
                      )}
                      <input
                        type="text"
                        {...register(`modules.${index}.description`)}
                        className="input w-full"
                        placeholder="Module description (optional)"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-gray-400 hover:text-red-500 mt-1"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/courses')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={createMutation.isLoading}
          >
            Create Course
          </Button>
        </div>
      </form>
    </div>
  )
}
