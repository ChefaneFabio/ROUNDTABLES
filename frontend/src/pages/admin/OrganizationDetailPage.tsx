import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  ArrowLeft, Building2, Users, Mail, Phone, MapPin, Plus,
  Trash2, Edit2, Link2, X, Globe
} from 'lucide-react'
import { organizationContactsApi, coursesApi } from '../../services/api'
import { organizationApi } from '../../services/organizationApi'

export default function OrganizationDetailPage() {
  const { id: orgId } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const [showAddContact, setShowAddContact] = useState(false)
  const [editingContact, setEditingContact] = useState<string | null>(null)
  const [showLinkCourses, setShowLinkCourses] = useState<string | null>(null)

  const { data: org, isLoading: orgLoading } = useQuery(
    ['organization', orgId],
    () => organizationApi.getOrganization(orgId!),
    { enabled: !!orgId }
  )

  const { data: contacts = [], isLoading: contactsLoading } = useQuery(
    ['org-contacts', orgId],
    () => organizationContactsApi.getForOrg(orgId!),
    { enabled: !!orgId }
  )

  const { data: allCourses = [] } = useQuery(
    ['all-courses'],
    async () => {
      const res = await coursesApi.getAll({ limit: 200 })
      return res.data || []
    }
  )

  const deleteMutation = useMutation(
    (contactId: string) => organizationContactsApi.delete(orgId!, contactId),
    { onSuccess: () => queryClient.invalidateQueries(['org-contacts', orgId]) }
  )

  const unlinkMutation = useMutation(
    ({ contactId, courseId }: { contactId: string; courseId: string }) =>
      organizationContactsApi.unlinkFromCourse(orgId!, contactId, courseId),
    { onSuccess: () => queryClient.invalidateQueries(['org-contacts', orgId]) }
  )

  if (orgLoading) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    )
  }

  const organization = org?.data || org

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <Link
          to="/admin/organizations"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Organizations
        </Link>

        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
            <Building2 className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{organization?.name || 'Organization'}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              {organization?.email && (
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5" />
                  {organization.email}
                </span>
              )}
              {organization?.industry && (
                <span className="flex items-center gap-1">
                  <Globe className="h-3.5 w-3.5" />
                  {organization.industry}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* HR Contacts Section */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">HR Contacts</h2>
            <p className="text-sm text-gray-500">
              Manage HR contacts and link them to specific courses for targeted notifications
            </p>
          </div>
          <button
            onClick={() => setShowAddContact(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Contact
          </button>
        </div>

        <div className="p-6">
          {contactsLoading ? (
            <div className="text-center py-8 text-gray-400">Loading contacts...</div>
          ) : contacts.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-10 w-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No HR contacts added yet</p>
              <p className="text-xs text-gray-400 mt-1">
                Add contacts to route course notifications to the right people
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {contacts.map((contact: any) => (
                <div
                  key={contact.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-indigo-700 font-medium text-sm">
                          {contact.name?.charAt(0)?.toUpperCase() || 'C'}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{contact.name}</p>
                        <div className="flex items-center gap-3 mt-0.5 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3.5 w-3.5" />
                            {contact.email}
                          </span>
                          {contact.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="h-3.5 w-3.5" />
                              {contact.phone}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          {contact.role && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                              {contact.role}
                            </span>
                          )}
                          {contact.branch && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
                              <MapPin className="h-3 w-3" />
                              {contact.branch}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setShowLinkCourses(contact.id)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Link to courses"
                      >
                        <Link2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setEditingContact(contact.id)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Edit contact"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete contact ${contact.name}?`)) {
                            deleteMutation.mutate(contact.id)
                          }
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        title="Delete contact"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Linked courses */}
                  {contact.courseContacts?.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs font-medium text-gray-500 mb-1.5">Linked Courses (receives notifications):</p>
                      <div className="flex flex-wrap gap-1.5">
                        {contact.courseContacts.map((cc: any) => (
                          <span
                            key={cc.id}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded-md text-xs"
                          >
                            {cc.course?.name || 'Unknown Course'}
                            <button
                              onClick={() => unlinkMutation.mutate({ contactId: contact.id, courseId: cc.course.id })}
                              className="hover:text-red-600 ml-0.5"
                              title="Unlink"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Contact Modal */}
      {showAddContact && (
        <ContactFormModal
          orgId={orgId!}
          onClose={() => setShowAddContact(false)}
          onSuccess={() => {
            setShowAddContact(false)
            queryClient.invalidateQueries(['org-contacts', orgId])
          }}
        />
      )}

      {/* Edit Contact Modal */}
      {editingContact && (
        <ContactFormModal
          orgId={orgId!}
          contact={contacts.find((c: any) => c.id === editingContact)}
          onClose={() => setEditingContact(null)}
          onSuccess={() => {
            setEditingContact(null)
            queryClient.invalidateQueries(['org-contacts', orgId])
          }}
        />
      )}

      {/* Link Courses Modal */}
      {showLinkCourses && (
        <LinkCoursesModal
          orgId={orgId!}
          contactId={showLinkCourses}
          contact={contacts.find((c: any) => c.id === showLinkCourses)}
          allCourses={allCourses}
          onClose={() => setShowLinkCourses(null)}
          onSuccess={() => {
            setShowLinkCourses(null)
            queryClient.invalidateQueries(['org-contacts', orgId])
          }}
        />
      )}
    </div>
  )
}

// ============================================================
// Contact Form Modal (Create / Edit)
// ============================================================
function ContactFormModal({
  orgId,
  contact,
  onClose,
  onSuccess
}: {
  orgId: string
  contact?: any
  onClose: () => void
  onSuccess: () => void
}) {
  const isEditing = !!contact
  const [form, setForm] = useState({
    name: contact?.name || '',
    email: contact?.email || '',
    phone: contact?.phone || '',
    role: contact?.role || '',
    branch: contact?.branch || ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isEditing) {
        await organizationContactsApi.update(orgId, contact.id, form)
      } else {
        await organizationContactsApi.create(orgId, form)
      }
      onSuccess()
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save contact')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {isEditing ? 'Edit Contact' : 'Add HR Contact'}
        </h2>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Branch / Location</label>
              <input
                type="text"
                value={form.branch}
                onChange={e => setForm({ ...form, branch: e.target.value })}
                placeholder="e.g. Milano, Roma"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <input
              type="text"
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
              placeholder="e.g. HR Manager, Training Coordinator"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : isEditing ? 'Update' : 'Add Contact'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ============================================================
// Link Courses Modal
// ============================================================
function LinkCoursesModal({
  orgId,
  contactId,
  contact,
  allCourses,
  onClose,
  onSuccess
}: {
  orgId: string
  contactId: string
  contact: any
  allCourses: any[]
  onClose: () => void
  onSuccess: () => void
}) {
  const linkedCourseIds = new Set(
    (contact?.courseContacts || []).map((cc: any) => cc.course?.id).filter(Boolean)
  )

  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)

  const unlinkedCourses = allCourses.filter(c => !linkedCourseIds.has(c.id))

  const toggleCourse = (courseId: string) => {
    const next = new Set(selected)
    if (next.has(courseId)) next.delete(courseId)
    else next.add(courseId)
    setSelected(next)
  }

  const handleLink = async () => {
    if (selected.size === 0) return
    setLoading(true)
    try {
      await organizationContactsApi.linkToCourses(orgId, contactId, Array.from(selected))
      onSuccess()
    } catch (err) {
      console.error('Failed to link courses:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Link Courses to {contact?.name}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          This contact will receive notifications for the selected courses
        </p>

        {unlinkedCourses.length === 0 ? (
          <p className="text-sm text-gray-500 py-4 text-center">All courses are already linked to this contact</p>
        ) : (
          <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg divide-y divide-gray-100">
            {unlinkedCourses.map(course => (
              <label
                key={course.id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selected.has(course.id)}
                  onChange={() => toggleCourse(course.id)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{course.name}</p>
                  <p className="text-xs text-gray-500">
                    {course.status} {course.language ? `- ${course.language}` : ''}
                  </p>
                </div>
              </label>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleLink}
            disabled={loading || selected.size === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Linking...' : `Link ${selected.size} Course${selected.size !== 1 ? 's' : ''}`}
          </button>
        </div>
      </div>
    </div>
  )
}
