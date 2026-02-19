import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { User, Mail, Phone, MapPin, Calendar, Camera, Save, Shield } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { authApi } from '../services/api'
import { LoadingPage } from '../components/common/LoadingSpinner'
import { Alert } from '../components/common/Alert'

export const ProfilePage: React.FC = () => {
  const { user: authUser } = useAuth()
  const queryClient = useQueryClient()
  const [isEditing, setIsEditing] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    bio: '',
    preferredLanguage: 'en'
  })

  const { data, isLoading, error } = useQuery('profile', authApi.getProfile)

  const user = data?.user || authUser
  const profile = data?.profile

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        bio: user.bio || '',
        preferredLanguage: user.preferredLanguage || 'en'
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

  const handleSave = () => {
    updateMutation.mutate(formData)
  }

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        bio: user.bio || '',
        preferredLanguage: user.preferredLanguage || 'en'
      })
    }
    setIsEditing(false)
  }

  const getRoleBadge = () => {
    switch (user?.role) {
      case 'ADMIN': return { text: 'Administrator', color: 'bg-red-100 text-red-800' }
      case 'TEACHER': return { text: 'Teacher', color: 'bg-green-100 text-green-800' }
      case 'STUDENT': return { text: 'Student', color: 'bg-purple-100 text-purple-800' }
      default: return { text: 'User', color: 'bg-gray-100 text-gray-800' }
    }
  }

  if (isLoading) return <LoadingPage />

  const roleBadge = getRoleBadge()

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600">Manage your personal information</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={updateMutation.isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {updateMutation.isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {successMsg && <Alert type="success" message={successMsg} />}
      {(error || updateMutation.error) && (
        <Alert type="error" message={(updateMutation.error as Error)?.message || 'Failed to load profile'} />
      )}

      {/* Profile Card */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Cover */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600" />

        {/* Avatar & Basic Info */}
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-12 mb-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-white border-4 border-white flex items-center justify-center bg-blue-100">
                <span className="text-3xl font-bold text-blue-600">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex-1 pb-2">
              <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
              <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${roleBadge.color}`}>
                {roleBadge.text}
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{user?.name}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">{user?.email}</span>
                <Shield className="w-4 h-4 text-green-500 ml-auto" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 234 567 8900"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className={user?.phone ? 'text-gray-900' : 'text-gray-500'}>
                    {user?.phone || 'Not provided'}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Language
              </label>
              {isEditing ? (
                <select
                  value={formData.preferredLanguage}
                  onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="it">Italian</option>
                </select>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                  <span className="text-gray-900">
                    {{ en: 'English', es: 'Spanish', fr: 'French', de: 'German', it: 'Italian' }[user?.preferredLanguage || 'en'] || user?.preferredLanguage || 'English'}
                  </span>
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter your address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className={user?.address ? 'text-gray-900' : 'text-gray-500'}>
                    {user?.address || 'Not provided'}
                  </span>
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  placeholder="Tell us about yourself..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <div className="px-4 py-2 bg-gray-50 rounded-lg min-h-[100px]">
                  <span className={user?.bio ? 'text-gray-900' : 'text-gray-500'}>
                    {user?.bio || 'No bio provided'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Role-specific info */}
      {profile && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {user?.role === 'ADMIN' ? 'School Details' :
             user?.role === 'TEACHER' ? 'Teacher Details' :
             user?.role === 'STUDENT' ? 'Student Details' : 'Details'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user?.role === 'ADMIN' && (
              <>
                {profile.company && (
                  <InfoItem label="Company" value={profile.company} />
                )}
                {profile.description && (
                  <InfoItem label="Description" value={profile.description} className="md:col-span-2" />
                )}
                <InfoItem label="Subscription" value={profile.subscriptionPlan?.replace(/_/g, ' ')} />
              </>
            )}
            {user?.role === 'TEACHER' && (
              <>
                {profile.expertise?.length > 0 && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500 mb-1">Expertise</p>
                    <div className="flex flex-wrap gap-2">
                      {profile.expertise.map((e: string) => (
                        <span key={e} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">{e}</span>
                      ))}
                    </div>
                  </div>
                )}
                {profile.school?.name && (
                  <InfoItem label="School" value={profile.school.name} />
                )}
              </>
            )}
            {user?.role === 'STUDENT' && (
              <>
                <InfoItem label="Language Level" value={profile.languageLevel} />
                {profile.school?.name && (
                  <InfoItem label="School" value={profile.school.name} />
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Account Info */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Member since</p>
              <p className="font-medium text-gray-900">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Unknown'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Shield className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Account Status</p>
              <p className={`font-medium ${user?.isActive ? 'text-green-600' : 'text-red-600'}`}>
                {user?.isActive ? 'Active' : 'Inactive'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoItem({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={`p-3 bg-gray-50 rounded-lg ${className || ''}`}>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  )
}

export default ProfilePage
