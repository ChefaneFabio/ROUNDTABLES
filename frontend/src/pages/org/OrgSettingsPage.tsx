import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { organizationApi } from '../../services/organizationApi'

interface OrgForm {
  name: string
  email: string
  phone: string
  website: string
  description: string
  industry: string
  size: string
  vatNumber: string
  fiscalCode: string
  sdiCode: string
  pecEmail: string
  billingEmail: string
}

const SIZE_OPTIONS = [
  { value: '', label: 'Select size' },
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-500', label: '201-500 employees' },
  { value: '501-1000', label: '501-1000 employees' },
  { value: '1000+', label: '1000+ employees' },
]

export default function OrgSettingsPage() {
  const { organizationId } = useAuth()
  const [form, setForm] = useState<OrgForm>({
    name: '',
    email: '',
    phone: '',
    website: '',
    description: '',
    industry: '',
    size: '',
    vatNumber: '',
    fiscalCode: '',
    sdiCode: '',
    pecEmail: '',
    billingEmail: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!organizationId) return
    const fetchOrg = async () => {
      try {
        setLoading(true)
        const org = await organizationApi.getOrganization(organizationId)
        setForm({
          name: org.name || '',
          email: org.email || '',
          phone: org.phone || '',
          website: org.website || '',
          description: org.description || '',
          industry: org.industry || '',
          size: org.size || '',
          vatNumber: org.vatNumber || '',
          fiscalCode: org.fiscalCode || '',
          sdiCode: org.sdiCode || '',
          pecEmail: org.pecEmail || '',
          billingEmail: org.billingEmail || '',
        })
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load organization')
      } finally {
        setLoading(false)
      }
    }
    fetchOrg()
  }, [organizationId])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!organizationId) return
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      await organizationApi.updateOrganization(organizationId, form)
      setSuccess('Organization settings updated successfully!')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update organization')
    } finally {
      setSaving(false)
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
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Organization Settings
        </h1>
        <p className="text-gray-600 mt-1">
          Manage your organization profile and billing information
        </p>
      </div>

      {/* Alerts */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
          <button onClick={() => setError('')} className="float-right font-bold">&times;</button>
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {success}
          <button onClick={() => setSuccess('')} className="float-right font-bold">&times;</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            General Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organization Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={form.website}
                onChange={handleChange}
                placeholder="https://"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Industry
              </label>
              <input
                type="text"
                name="industry"
                value={form.industry}
                onChange={handleChange}
                placeholder="e.g. Technology, Finance, Education"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Size
              </label>
              <select
                name="size"
                value={form.size}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {SIZE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Brief description of your organization"
            />
          </div>
        </div>

        {/* Billing & Legal */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Billing & Legal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                VAT Number
              </label>
              <input
                type="text"
                name="vatNumber"
                value={form.vatNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. IT12345678901"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fiscal Code
              </label>
              <input
                type="text"
                name="fiscalCode"
                value={form.fiscalCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SDI Code
              </label>
              <input
                type="text"
                name="sdiCode"
                value={form.sdiCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="7-character SDI code"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PEC Email
              </label>
              <input
                type="email"
                name="pecEmail"
                value={form.pecEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="pec@example.it"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Billing Email
              </label>
              <input
                type="email"
                name="billingEmail"
                value={form.billingEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="billing@company.com"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
