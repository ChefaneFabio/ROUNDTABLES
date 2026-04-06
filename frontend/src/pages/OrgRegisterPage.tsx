import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { RegisterOrganizationRequest } from '../types'
import { Button } from '../components/common/Button'
import { Alert } from '../components/common/Alert'
import { Eye, EyeOff, Building2, UserCog, Receipt } from 'lucide-react'

const STEPS = [
  { label: 'Organization', icon: Building2 },
  { label: 'Admin Account', icon: UserCog },
  { label: 'Billing', icon: Receipt },
]

const SIZE_OPTIONS = ['1-10', '11-50', '51-200', '201-500', '500+']

export function OrgRegisterPage() {
  const { registerOrganization } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    organizationName: '',
    organizationEmail: '',
    phone: '',
    website: '',
    industry: '',
    size: '',
    adminName: '',
    adminEmail: '',
    adminPassword: '',
    confirmPassword: '',
    vatNumber: '',
    fiscalCode: '',
  })

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setFieldErrors((prev) => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const validateStep = (currentStep: number): boolean => {
    const errors: Record<string, string> = {}

    if (currentStep === 1) {
      if (!formData.organizationName.trim()) {
        errors.organizationName = 'Organization name is required'
      }
      if (!formData.organizationEmail.trim()) {
        errors.organizationEmail = 'Organization email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.organizationEmail)) {
        errors.organizationEmail = 'Invalid email address'
      }
    }

    if (currentStep === 2) {
      if (!formData.adminName.trim()) {
        errors.adminName = 'Admin name is required'
      }
      if (!formData.adminEmail.trim()) {
        errors.adminEmail = 'Admin email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.adminEmail)) {
        errors.adminEmail = 'Invalid email address'
      }
      if (!formData.adminPassword) {
        errors.adminPassword = 'Password is required'
      } else if (formData.adminPassword.length < 8) {
        errors.adminPassword = 'Password must be at least 8 characters'
      }
      if (formData.adminPassword !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords must match'
      }
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((s) => s + 1)
    }
  }

  const handleBack = () => {
    setFieldErrors({})
    setStep((s) => s - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(step)) return

    try {
      setIsLoading(true)
      setError('')

      const payload: RegisterOrganizationRequest = {
        organizationName: formData.organizationName,
        organizationEmail: formData.organizationEmail,
        adminName: formData.adminName,
        adminEmail: formData.adminEmail,
        adminPassword: formData.adminPassword,
        ...(formData.phone && { phone: formData.phone }),
        ...(formData.website && { website: formData.website }),
        ...(formData.industry && { industry: formData.industry }),
        ...(formData.size && { size: formData.size }),
        ...(formData.vatNumber && { vatNumber: formData.vatNumber }),
        ...(formData.fiscalCode && { fiscalCode: formData.fiscalCode }),
      }

      await registerOrganization(payload)
      navigate('/org/dashboard')
    } catch (err: any) {
      setError(err.message || 'Failed to create organization')
    } finally {
      setIsLoading(false)
    }
  }

  const renderFieldError = (field: string) =>
    fieldErrors[field] ? (
      <p className="mt-1 text-sm text-red-600">{fieldErrors[field]}</p>
    ) : null

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {STEPS.map((s, i) => {
        const stepNum = i + 1
        const isActive = step === stepNum
        const isCompleted = step > stepNum
        const Icon = s.icon

        return (
          <div key={stepNum} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : isCompleted
                      ? 'bg-primary-100 text-primary-700 border-2 border-primary-600'
                      : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`mt-1 text-xs font-medium ${
                  isActive
                    ? 'text-primary-700'
                    : isCompleted
                      ? 'text-primary-600'
                      : 'text-gray-400'
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`w-16 h-0.5 mx-2 mb-5 ${
                  step > stepNum ? 'bg-primary-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )

  const renderStep1 = () => (
    <div className="space-y-5">
      <div>
        <label className="label">Organization name *</label>
        <input
          type="text"
          value={formData.organizationName}
          onChange={(e) => updateField('organizationName', e.target.value)}
          className={`input ${fieldErrors.organizationName ? 'input-error' : ''}`}
          placeholder="Acme Corp"
        />
        {renderFieldError('organizationName')}
      </div>

      <div>
        <label className="label">Organization email *</label>
        <input
          type="email"
          value={formData.organizationEmail}
          onChange={(e) => updateField('organizationEmail', e.target.value)}
          className={`input ${fieldErrors.organizationEmail ? 'input-error' : ''}`}
          placeholder="info@acmecorp.com"
        />
        {renderFieldError('organizationEmail')}
      </div>

      <div>
        <label className="label">Phone (optional)</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => updateField('phone', e.target.value)}
          className="input"
          placeholder="e.g., +39 123 456 7890"
        />
      </div>

      <div>
        <label className="label">Website (optional)</label>
        <input
          type="url"
          value={formData.website}
          onChange={(e) => updateField('website', e.target.value)}
          className="input"
          placeholder="https://acmecorp.com"
        />
      </div>

      <div>
        <label className="label">Industry (optional)</label>
        <input
          type="text"
          value={formData.industry}
          onChange={(e) => updateField('industry', e.target.value)}
          className="input"
          placeholder="e.g., Technology, Education, Finance"
        />
      </div>

      <div>
        <label className="label">Organization size (optional)</label>
        <select
          value={formData.size}
          onChange={(e) => updateField('size', e.target.value)}
          className="input"
        >
          <option value="">Select size...</option>
          {SIZE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt} employees
            </option>
          ))}
        </select>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-5">
      <div>
        <label className="label">Admin name *</label>
        <input
          type="text"
          value={formData.adminName}
          onChange={(e) => updateField('adminName', e.target.value)}
          className={`input ${fieldErrors.adminName ? 'input-error' : ''}`}
          autoComplete="name"
          placeholder="John Doe"
        />
        {renderFieldError('adminName')}
      </div>

      <div>
        <label className="label">Admin email *</label>
        <input
          type="email"
          value={formData.adminEmail}
          onChange={(e) => updateField('adminEmail', e.target.value)}
          className={`input ${fieldErrors.adminEmail ? 'input-error' : ''}`}
          autoComplete="email"
          placeholder="john@acmecorp.com"
        />
        {renderFieldError('adminEmail')}
      </div>

      <div>
        <label className="label">Password *</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={formData.adminPassword}
            onChange={(e) => updateField('adminPassword', e.target.value)}
            className={`input pr-10 ${fieldErrors.adminPassword ? 'input-error' : ''}`}
            autoComplete="new-password"
            placeholder="Min. 8 characters"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
        {renderFieldError('adminPassword')}
      </div>

      <div>
        <label className="label">Confirm password *</label>
        <input
          type={showPassword ? 'text' : 'password'}
          value={formData.confirmPassword}
          onChange={(e) => updateField('confirmPassword', e.target.value)}
          className={`input ${fieldErrors.confirmPassword ? 'input-error' : ''}`}
          autoComplete="new-password"
        />
        {renderFieldError('confirmPassword')}
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-5">
      <p className="text-sm text-gray-500">
        These fields are optional. You can add or update billing information later from your
        organization settings.
      </p>

      <div>
        <label className="label">VAT number (optional)</label>
        <input
          type="text"
          value={formData.vatNumber}
          onChange={(e) => updateField('vatNumber', e.target.value)}
          className="input"
          placeholder="e.g., IT12345678901"
        />
      </div>

      <div>
        <label className="label">Fiscal code (optional)</label>
        <input
          type="text"
          value={formData.fiscalCode}
          onChange={(e) => updateField('fiscalCode', e.target.value)}
          className="input"
          placeholder="e.g., RSSMRA85M01H501Z"
        />
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img src="/logo.svg" alt="Maka Language Consulting" className="h-14 w-auto" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Register your Organization
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Set up your organization on Maka LMS
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {renderStepIndicator()}

          {error && (
            <Alert
              type="error"
              message={error}
              onClose={() => setError('')}
              className="mb-6"
            />
          )}

          <form onSubmit={handleSubmit}>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}

            <div className="mt-8 flex items-center justify-between gap-4">
              {step > 1 ? (
                <Button type="button" variant="secondary" onClick={handleBack}>
                  Back
                </Button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button type="submit" isLoading={isLoading}>
                  Create Organization
                </Button>
              )}
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
