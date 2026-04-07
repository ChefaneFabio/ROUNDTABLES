import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Users, Plus, Mail, Phone, Shield, X } from 'lucide-react'
import api from '../../services/api'
import { Card } from '../../components/common/Card'
import { Button } from '../../components/common/Button'
import { Alert } from '../../components/common/Alert'
import { LoadingPage } from '../../components/common/LoadingSpinner'

export default function TeamPage() {
  const queryClient = useQueryClient()
  const [showAdd, setShowAdd] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [form, setForm] = useState({ email: '', password: '', name: '', surname: '', phone: '' })

  // Load all admin users
  const { data, isLoading } = useQuery('adminUsers', async () => {
    const res = await api.get('/teachers', { params: { page: 1, limit: 100 } })
    // We don't have a dedicated admin list endpoint, so we'll use a workaround
    // Actually let's just fetch from users who are ADMIN
    return res.data
  })

  const addMutation = useMutation(
    async (data: typeof form) => {
      const res = await api.post('/auth/register/admin', data)
      return res.data.data
    },
    {
      onSuccess: () => {
        setShowAdd(false)
        setForm({ email: '', password: '', name: '', surname: '', phone: '' })
        setSuccess('Admin user created successfully. They can now sign in.')
        setTimeout(() => setSuccess(''), 5000)
        queryClient.invalidateQueries('adminUsers')
      },
      onError: (err: any) => {
        setError(err.response?.data?.error || 'Failed to create admin user')
      }
    }
  )

  if (isLoading) return <LoadingPage />

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8 text-gray-700" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Maka Team</h1>
            <p className="text-sm text-gray-500">Manage administrator accounts for Maka Language Consulting</p>
          </div>
        </div>
        <Button onClick={() => setShowAdd(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Admin
        </Button>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      {success && <Alert type="success" message={success} />}

      {/* Info */}
      <Card>
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-gray-500 mt-0.5" />
          <div className="text-sm text-gray-600">
            <p className="font-medium text-gray-800 mb-1">Admin accounts have full access to:</p>
            <ul className="space-y-1 text-gray-500">
              <li>Manage teachers, students, and organizations</li>
              <li>Assign and monitor placement tests</li>
              <li>View all anagraphic data and assessment results</li>
              <li>Export reports (XLSX, PDF), manage question banks</li>
              <li>Configure notification settings, integrations, API keys</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Current admin accounts info */}
      <Card>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Default Accounts</h2>
        <div className="space-y-3">
          {[
            { email: 'alessia@makalanguage.com', name: 'Alessia Carde', role: 'Platform Manager' },
            { email: 'info@makalanguage.com', name: 'Maka Admin', role: 'General Administration' },
            { email: 'admin@demo.com', name: 'Demo Admin', role: 'Demo / Testing' },
          ].map(admin => (
            <div key={admin.email} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
                  {admin.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{admin.name}</p>
                  <p className="text-xs text-gray-500">{admin.email}</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">{admin.role}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">Default password: demo123 — change after first login</p>
      </Card>

      {/* Add Admin Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Add Admin User</h2>
              <button onClick={() => setShowAdd(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">First Name</label>
                  <input
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Alessia"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Surname</label>
                  <input
                    value={form.surname}
                    onChange={e => setForm({ ...form, surname: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Carde"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="name@makalanguage.com"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Password</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="Min 8 characters"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Phone (optional)</label>
                <input
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="+39 333 123 4567"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
              <Button onClick={() => addMutation.mutate(form)} disabled={addMutation.isLoading || !form.email || !form.password || !form.name}>
                {addMutation.isLoading ? 'Creating...' : 'Create Admin'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
