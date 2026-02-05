import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Key, Plus, Copy, Trash2, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react'
import api from '../services/api'
import { LoadingPage } from '../components/common/LoadingSpinner'
import { Alert } from '../components/common/Alert'
import { Card } from '../components/common/Card'
import { Button } from '../components/common/Button'
import { Modal } from '../components/common/Modal'

interface ApiKey {
  id: string
  name: string
  keyPrefix: string
  permissions: string[]
  isActive: boolean
  lastUsedAt?: string
  expiresAt?: string
  createdAt: string
}

const AVAILABLE_PERMISSIONS = [
  { value: 'read:courses', label: 'Read Courses' },
  { value: 'write:courses', label: 'Write Courses' },
  { value: 'read:enrollments', label: 'Read Enrollments' },
  { value: 'write:enrollments', label: 'Write Enrollments' },
  { value: 'read:students', label: 'Read Students' },
  { value: 'write:students', label: 'Write Students' },
  { value: 'read:progress', label: 'Read Progress' },
  { value: 'read:analytics', label: 'Read Analytics' },
  { value: '*', label: 'Full Access' }
]

export function ApiKeysPage() {
  const queryClient = useQueryClient()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newKeyResult, setNewKeyResult] = useState<{ key: string; name: string } | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    permissions: [] as string[],
    expiresAt: ''
  })

  // Fetch API keys
  const { data: apiKeys, isLoading, error } = useQuery<ApiKey[]>(
    'apiKeys',
    async () => {
      const response = await api.get('/external/keys')
      return response.data.data || []
    }
  )

  // Create API key
  const createKey = useMutation(
    async (data: typeof formData) => {
      const response = await api.post('/external/keys', {
        ...data,
        expiresAt: data.expiresAt || undefined
      })
      return response.data.data
    },
    {
      onSuccess: (data) => {
        setNewKeyResult({ key: data.key, name: data.name })
        setFormData({ name: '', permissions: [], expiresAt: '' })
        setShowCreateModal(false)
        queryClient.invalidateQueries('apiKeys')
      }
    }
  )

  // Delete API key
  const deleteKey = useMutation(
    async (id: string) => {
      await api.delete(`/external/keys/${id}`)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('apiKeys')
      }
    }
  )

  // Toggle API key status
  const toggleKeyStatus = useMutation(
    async ({ id, isActive }: { id: string; isActive: boolean }) => {
      await api.put(`/external/keys/${id}`, { isActive })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('apiKeys')
      }
    }
  )

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handlePermissionToggle = (permission: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }))
  }

  if (isLoading) return <LoadingPage />

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Key className="w-8 h-8 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">API Keys</h1>
            </div>
            <p className="text-gray-600">
              Manage API keys for third-party integrations with your school's data.
            </p>
          </div>
          <Button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create API Key
          </Button>
        </div>
      </div>

      {error ? <Alert type="error" message="Failed to load API keys" /> : null}

      {/* New Key Result */}
      {newKeyResult && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-green-800 mb-2">API Key Created: {newKeyResult.name}</p>
              <p className="text-sm text-green-700 mb-2">Copy this key now - it won't be shown again!</p>
              <div className="flex items-center gap-2 bg-white/50 p-2 rounded">
                <code className="flex-1 text-sm font-mono break-all text-green-900">{newKeyResult.key}</code>
                <button
                  onClick={() => copyToClipboard(newKeyResult.key)}
                  className="p-1 hover:bg-white rounded"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => setNewKeyResult(null)}
                className="mt-2 text-sm underline text-green-700"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* API Keys List */}
      {apiKeys && apiKeys.length > 0 ? (
        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <ApiKeyCard
              key={apiKey.id}
              apiKey={apiKey}
              onToggle={() => toggleKeyStatus.mutate({ id: apiKey.id, isActive: !apiKey.isActive })}
              onDelete={() => {
                if (confirm('Are you sure you want to delete this API key?')) {
                  deleteKey.mutate(apiKey.id)
                }
              }}
            />
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <Key className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No API Keys</h3>
          <p className="text-gray-500 mb-6">
            Create an API key to integrate with external systems.
          </p>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Your First API Key
          </Button>
        </Card>
      )}

      {/* Documentation Link */}
      <Card className="!p-4 bg-gray-50">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5" />
          <div className="text-sm text-gray-600">
            <p className="font-medium text-gray-700">API Documentation</p>
            <p className="mt-1">
              Use the API key in the <code className="bg-gray-200 px-1 rounded">X-API-Key</code> header.
              Base URL: <code className="bg-gray-200 px-1 rounded">/api/external/v1</code>
            </p>
            <p className="mt-2">
              Available endpoints: <code>/courses</code>, <code>/enrollments</code>, <code>/students</code>, <code>/progress</code>
            </p>
          </div>
        </div>
      </Card>

      {/* Create Modal */}
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Create API Key">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Key Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., HR System Integration"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Permissions
              </label>
              <div className="grid grid-cols-2 gap-2">
                {AVAILABLE_PERMISSIONS.map((perm) => (
                  <label
                    key={perm.value}
                    className={`flex items-center gap-2 p-2 rounded border cursor-pointer ${
                      formData.permissions.includes(perm.value)
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.permissions.includes(perm.value)}
                      onChange={() => handlePermissionToggle(perm.value)}
                      className="sr-only"
                    />
                    <span className={`w-4 h-4 rounded border flex items-center justify-center ${
                      formData.permissions.includes(perm.value)
                        ? 'bg-primary-600 border-primary-600'
                        : 'border-gray-300'
                    }`}>
                      {formData.permissions.includes(perm.value) && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </span>
                    <span className="text-sm">{perm.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiration (Optional)
              </label>
              <input
                type="date"
                value={formData.expiresAt}
                onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => createKey.mutate(formData)}
                disabled={!formData.name || formData.permissions.length === 0 || createKey.isLoading}
              >
                {createKey.isLoading ? 'Creating...' : 'Create Key'}
              </Button>
            </div>
          </div>
        </Modal>
    </div>
  )
}

function ApiKeyCard({
  apiKey,
  onToggle,
  onDelete
}: {
  apiKey: ApiKey
  onToggle: () => void
  onDelete: () => void
}) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">{apiKey.name}</h3>
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
              apiKey.isActive
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {apiKey.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          <p className="text-sm text-gray-500 font-mono mt-1">{apiKey.keyPrefix}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggle}
            className="p-2 hover:bg-gray-100 rounded-lg"
            title={apiKey.isActive ? 'Deactivate' : 'Activate'}
          >
            {apiKey.isActive ? (
              <EyeOff className="w-4 h-4 text-gray-500" />
            ) : (
              <Eye className="w-4 h-4 text-gray-500" />
            )}
          </button>
          <button
            onClick={onDelete}
            className="p-2 hover:bg-red-50 rounded-lg text-red-600"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1">
        {apiKey.permissions.map((perm) => (
          <span key={perm} className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">
            {perm}
          </span>
        ))}
      </div>

      <div className="mt-3 text-xs text-gray-500 flex gap-4">
        <span>Created: {new Date(apiKey.createdAt).toLocaleDateString()}</span>
        {apiKey.lastUsedAt && (
          <span>Last used: {new Date(apiKey.lastUsedAt).toLocaleDateString()}</span>
        )}
        {apiKey.expiresAt && (
          <span className={new Date(apiKey.expiresAt) < new Date() ? 'text-red-600' : ''}>
            Expires: {new Date(apiKey.expiresAt).toLocaleDateString()}
          </span>
        )}
      </div>
    </Card>
  )
}
