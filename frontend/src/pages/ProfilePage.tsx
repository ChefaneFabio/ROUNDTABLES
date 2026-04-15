import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { User, Mail, Phone, MapPin, Calendar, Save, Globe, FileText, Building2 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { authApi } from '../services/api'
import { LoadingPage } from '../components/common/LoadingSpinner'
import { Alert } from '../components/common/Alert'

const EMPTY_FORM = {
  name: '', surname: '', phone: '', address: '', city: '', province: '',
  postalCode: '', country: '', dateOfBirth: '', placeOfBirth: '',
  nationality: '', fiscalCode: '', gender: '', bio: '',
  preferredLanguage: 'en', nativeLanguage: '',
}

export const ProfilePage: React.FC = () => {
  const { user: authUser } = useAuth()
  const queryClient = useQueryClient()
  const [isEditing, setIsEditing] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [formData, setFormData] = useState({ ...EMPTY_FORM })

  const { data, isLoading, error } = useQuery('profile', authApi.getProfile)

  const user = data?.user || authUser

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        surname: user.surname || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        province: user.province || '',
        postalCode: user.postalCode || '',
        country: user.country || '',
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
        placeOfBirth: user.placeOfBirth || '',
        nationality: user.nationality || '',
        fiscalCode: user.fiscalCode || '',
        gender: user.gender || '',
        bio: user.bio || '',
        preferredLanguage: user.preferredLanguage || 'en',
        nativeLanguage: user.nativeLanguage || '',
      })
    }
  }, [user])

  const updateMutation = useMutation(authApi.updateProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries('profile')
      setIsEditing(false)
      setSuccessMsg('Profile updated successfully!')
      setTimeout(() => setSuccessMsg(''), 3000)
    }
  })

  const handleSave = () => updateMutation.mutate(formData)

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name || '', surname: user.surname || '', phone: user.phone || '',
        address: user.address || '', city: user.city || '', province: user.province || '',
        postalCode: user.postalCode || '', country: user.country || '',
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
        placeOfBirth: user.placeOfBirth || '', nationality: user.nationality || '',
        fiscalCode: user.fiscalCode || '', gender: user.gender || '', bio: user.bio || '',
        preferredLanguage: user.preferredLanguage || 'en', nativeLanguage: user.nativeLanguage || '',
      })
    }
    setIsEditing(false)
  }

  const set = (field: string, value: string) => setFormData(prev => ({ ...prev, [field]: value }))

  const getRoleBadge = () => {
    switch (user?.role) {
      case 'ADMIN': return { text: 'Administrator', color: 'bg-gray-100 text-gray-700' }
      case 'TEACHER': return { text: 'Trainer', color: 'bg-gray-100 text-gray-700' }
      case 'STUDENT': return { text: 'Learner', color: 'bg-gray-100 text-gray-700' }
      case 'ORG_ADMIN': return { text: 'HR Manager', color: 'bg-gray-100 text-gray-700' }
      default: return { text: 'User', color: 'bg-gray-100 text-gray-700' }
    }
  }

  if (isLoading) return <LoadingPage />

  const roleBadge = getRoleBadge()

  const Field = ({ label, field, icon: Icon, type = 'text', placeholder = '', readOnly = false }: {
    label: string; field: string; icon?: React.ElementType; type?: string; placeholder?: string; readOnly?: boolean
  }) => (
    <div>
      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">{label}</label>
      {isEditing && !readOnly ? (
        <input
          type={type}
          value={(formData as any)[field] || ''}
          onChange={e => set(field, e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gray-300 focus:border-gray-300 transition-colors"
        />
      ) : (
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg min-h-[38px] border border-transparent">
          {Icon && <Icon className="w-4 h-4 text-gray-400 flex-shrink-0" />}
          <span className="text-sm text-gray-900">{(user as any)?.[field] || (formData as any)[field] || '--'}</span>
        </div>
      )}
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-sm text-gray-400 mt-0.5">Personal and anagraphic information</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm font-medium transition-colors"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-white text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={updateMutation.isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm disabled:opacity-50 transition-colors"
            >
              <Save className="w-4 h-4" /> {updateMutation.isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>

      {successMsg && <Alert type="success" message={successMsg} />}
      {Boolean(error || updateMutation.error) && <Alert type="error" message={(updateMutation.error as Error)?.message || (error as Error)?.message || 'Failed to load profile'} />}

      {/* Profile Header Card */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="h-20 bg-gray-900" />
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-10 mb-2">
            <div className="w-20 h-20 rounded-full bg-gray-100 border-4 border-white flex items-center justify-center shadow-sm">
              <span className="text-2xl font-bold text-gray-600">
                {user?.name?.charAt(0)?.toUpperCase()}{user?.surname?.charAt(0)?.toUpperCase() || ''}
              </span>
            </div>
            <div className="pb-1 flex-1">
              <h2 className="text-xl font-bold text-gray-900">{user?.name} {user?.surname || ''}</h2>
              <div className="flex items-center gap-3 mt-1">
                <span className={`inline-flex px-2.5 py-0.5 rounded-md text-xs font-semibold ${roleBadge.color}`}>
                  {roleBadge.text}
                </span>
                <span className="text-xs text-gray-400">{user?.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700">
          You are in edit mode. Make your changes and click "Save Changes" to update your profile.
        </div>
      )}

      {/* Personal Information */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="First Name" field="name" icon={User} placeholder="First name" />
          <Field label="Surname" field="surname" icon={User} placeholder="Surname" />
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">Gender</label>
            {isEditing ? (
              <select value={formData.gender} onChange={e => set('gender', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gray-300 focus:border-gray-300">
                <option value="">--</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg min-h-[38px] border border-transparent">
                <span className="text-sm text-gray-900">{user?.gender === 'M' ? 'Male' : user?.gender === 'F' ? 'Female' : user?.gender || '--'}</span>
              </div>
            )}
          </div>
          <Field label="Date of Birth" field="dateOfBirth" icon={Calendar} type="date" />
          <Field label="Place of Birth" field="placeOfBirth" icon={MapPin} placeholder="City, Country" />
          <Field label="Nationality" field="nationality" icon={Globe} placeholder="e.g. Italian" />
          <Field label="Fiscal Code (Codice Fiscale)" field="fiscalCode" icon={FileText} placeholder="RSSMRA85M01H501Z" />
          <Field label="Native Language" field="nativeLanguage" icon={Globe} placeholder="e.g. Italian" />
        </div>
      </div>

      {/* Contact & Address */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">Contact & Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Email" field="email" icon={Mail} readOnly />
          <Field label="Phone" field="phone" icon={Phone} placeholder="+39 333 123 4567" />
          <Field label="Address" field="address" icon={MapPin} placeholder="Via Roma 1" />
          <Field label="City" field="city" icon={Building2} placeholder="Milan" />
          <Field label="Province" field="province" placeholder="MI" />
          <Field label="Postal Code" field="postalCode" placeholder="20100" />
          <Field label="Country" field="country" icon={Globe} placeholder="Italy" />
        </div>
      </div>

      {/* Bio & Preferences */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">Bio & Preferences</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">Bio</label>
            {isEditing ? (
              <textarea
                value={formData.bio}
                onChange={e => set('bio', e.target.value)}
                rows={3}
                placeholder="Tell us about yourself..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gray-300 focus:border-gray-300 transition-colors"
              />
            ) : (
              <p className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-900 min-h-[60px] border border-transparent">{user?.bio || '--'}</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">Platform Language</label>
              {isEditing ? (
                <select value={formData.preferredLanguage} onChange={e => set('preferredLanguage', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gray-300 focus:border-gray-300">
                  <option value="en">English</option>
                  <option value="it">Italian</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="es">Spanish</option>
                </select>
              ) : (
                <div className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-900 border border-transparent">
                  {user?.preferredLanguage === 'it' ? 'Italian' : user?.preferredLanguage === 'fr' ? 'French' : user?.preferredLanguage === 'de' ? 'German' : user?.preferredLanguage === 'es' ? 'Spanish' : 'English'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Account Info (read-only) */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">Account</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">Role</p>
            <div className="px-3 py-2 bg-gray-50 rounded-lg border border-transparent">
              <span className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold ${roleBadge.color}`}>
                {roleBadge.text}
              </span>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">Member Since</p>
            <p className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-900 border border-transparent">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB') : '--'}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">Last Login</p>
            <p className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-900 border border-transparent">
              {user?.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString('en-GB') : '--'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
