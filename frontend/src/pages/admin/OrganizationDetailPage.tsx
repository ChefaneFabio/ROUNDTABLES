import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  ArrowLeft, Building2, Users, Mail, Phone, MapPin, Plus,
  Trash2, Edit2, Link2, X, Globe, GraduationCap, Send,
  Upload, Download, FileSpreadsheet, CheckCircle2, AlertCircle
} from 'lucide-react'
import { organizationContactsApi, coursesApi } from '../../services/api'
import { organizationApi } from '../../services/organizationApi'
import { assessmentApi } from '../../services/assessmentApi'
import { HelpHint } from '../../components/common/HelpHint'

export default function OrganizationDetailPage() {
  const { id: orgId } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const [showAddContact, setShowAddContact] = useState(false)
  const [editingContact, setEditingContact] = useState<string | null>(null)
  const [showLinkCourses, setShowLinkCourses] = useState<string | null>(null)
  const [showAssignTest, setShowAssignTest] = useState(false)
  const [showInviteLearner, setShowInviteLearner] = useState(false)
  const [showBulkUpload, setShowBulkUpload] = useState(false)

  const { data: employeesResp, isLoading: employeesLoading } = useQuery(
    ['org-employees', orgId],
    () => organizationApi.getEmployees(orgId!, { limit: 200 }),
    { enabled: !!orgId }
  )
  const employees: any[] = employeesResp?.data || employeesResp || []

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

      {/* Learners Section */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-lg font-semibold text-gray-900">Company Learners</h2>
              <HelpHint title="Adding learners to this company">
                <p><strong>Invite Learner</strong> — one learner at a time. Sends a welcome email with a temporary password.</p>
                <p><strong>Bulk Upload</strong> — for big rosters. Download the template, fill it, drop it back. You'll get a per-row report showing what got created or skipped.</p>
                <p><strong>Assign Placement Test</strong> — pick learners + language. These tests skip the approval queue.</p>
                <p>Learners must complete a short pre-test questionnaire before they can self-request a test. Bulk-uploaded learners with pre-test fields in the file skip this gate.</p>
              </HelpHint>
            </div>
            <p className="text-sm text-gray-500">
              Employees of {organization?.name || 'this company'} who can be assigned placement tests
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowInviteLearner(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50"
            >
              <Plus className="h-4 w-4" />
              Invite Learner
            </button>
            <button
              onClick={() => setShowBulkUpload(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50"
              title="Upload a roster file (.xlsx or .csv) to create many learners at once"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Bulk Upload
            </button>
            <button
              onClick={() => setShowAssignTest(true)}
              disabled={employees.length === 0}
              className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              title={employees.length === 0 ? 'Invite a learner first' : 'Assign a placement test'}
            >
              <Send className="h-4 w-4" />
              Assign Placement Test
            </button>
          </div>
        </div>

        <div className="p-6">
          {employeesLoading ? (
            <div className="text-center py-8 text-gray-400">Loading learners...</div>
          ) : employees.length === 0 ? (
            <div className="text-center py-8">
              <GraduationCap className="h-10 w-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No learners yet for this company</p>
              <p className="text-xs text-gray-400 mt-1">
                Invite employees from the company dashboard to get started
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {employees.map((emp: any) => {
                const name = emp.user?.name || emp.name || 'Unnamed'
                const email = emp.user?.email || emp.email || ''
                const level = emp.languageLevel || '—'
                return (
                  <div key={emp.id} className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-600 font-medium text-sm">
                          {name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{name}</p>
                        <p className="text-xs text-gray-500">{email}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                      {level}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Assign Placement Test Modal */}
      {showAssignTest && (
        <AssignPlacementTestModal
          orgName={organization?.name || 'Company'}
          employees={employees}
          onClose={() => setShowAssignTest(false)}
          onSuccess={() => {
            setShowAssignTest(false)
            queryClient.invalidateQueries(['org-employees', orgId])
          }}
        />
      )}

      {/* Invite Learner Modal */}
      {showInviteLearner && (
        <InviteLearnerModal
          orgId={orgId!}
          orgName={organization?.name || 'Company'}
          onClose={() => setShowInviteLearner(false)}
          onSuccess={() => {
            setShowInviteLearner(false)
            queryClient.invalidateQueries(['org-employees', orgId])
          }}
        />
      )}

      {/* Bulk Upload Modal */}
      {showBulkUpload && (
        <BulkUploadModal
          orgId={orgId!}
          orgName={organization?.name || 'Company'}
          onClose={() => setShowBulkUpload(false)}
          onSuccess={() => queryClient.invalidateQueries(['org-employees', orgId])}
        />
      )}

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

// ============================================================
// Assign Placement Test Modal
// ============================================================
function AssignPlacementTestModal({
  orgName,
  employees,
  onClose,
  onSuccess,
}: {
  orgName: string
  employees: any[]
  onClose: () => void
  onSuccess: () => void
}) {
  const [language, setLanguage] = useState('English')
  const [mode, setMode] = useState<'PLACEMENT' | 'PROGRESS'>('PLACEMENT')
  const [fixedLevel, setFixedLevel] = useState<'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'>('B1')
  const [selected, setSelected] = useState<Set<string>>(new Set(employees.map(e => e.id)))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<{ success: number; failed: number } | null>(null)

  const toggle = (id: string) => {
    const next = new Set(selected)
    next.has(id) ? next.delete(id) : next.add(id)
    setSelected(next)
  }

  const allSelected = selected.size === employees.length
  const toggleAll = () => setSelected(new Set(allSelected ? [] : employees.map(e => e.id)))

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const results = await assessmentApi.assignMultiSkillAssessment({
        studentIds: Array.from(selected),
        language,
        ...(mode === 'PROGRESS' ? { fixedLevel } : {}),
      })
      const failed = results.filter((r: any) => 'error' in r).length
      const success = results.length - failed
      setResult({ success, failed })
      if (failed === 0) {
        setTimeout(onSuccess, 1500)
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to assign placement test')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Assign Placement Test</h3>
            <p className="text-xs text-gray-500 mt-0.5">{orgName}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {['English', 'Italian', 'Spanish', 'French', 'German'].map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          {/* Test mode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Test type</label>
            <div className="grid grid-cols-2 gap-2">
              <label className={`flex items-start gap-2 p-3 border rounded-lg cursor-pointer ${mode === 'PLACEMENT' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}`}>
                <input
                  type="radio"
                  name="mode"
                  checked={mode === 'PLACEMENT'}
                  onChange={() => setMode('PLACEMENT')}
                  className="mt-0.5"
                />
                <div>
                  <p className="text-sm font-medium">Adaptive Placement</p>
                  <p className="text-xs text-gray-500">Auto-adapts the level. Use for first assessment.</p>
                </div>
              </label>
              <label className={`flex items-start gap-2 p-3 border rounded-lg cursor-pointer ${mode === 'PROGRESS' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}`}>
                <input
                  type="radio"
                  name="mode"
                  checked={mode === 'PROGRESS'}
                  onChange={() => setMode('PROGRESS')}
                  className="mt-0.5"
                />
                <div>
                  <p className="text-sm font-medium">Fixed Level (Progress)</p>
                  <p className="text-xs text-gray-500">All questions from one CEFR level.</p>
                </div>
              </label>
            </div>
            {mode === 'PROGRESS' && (
              <div className="mt-3 flex gap-1">
                {(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const).map(l => (
                  <button
                    key={l}
                    onClick={() => setFixedLevel(l)}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg ${fixedLevel === l ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Recipients */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Recipients ({selected.size}/{employees.length})
              </label>
              <button
                onClick={toggleAll}
                className="text-xs text-indigo-600 hover:text-indigo-700"
              >
                {allSelected ? 'Deselect all' : 'Select all'}
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg max-h-60 overflow-y-auto divide-y divide-gray-100">
              {employees.map(emp => {
                const name = emp.user?.name || emp.name || 'Unnamed'
                const email = emp.user?.email || emp.email || ''
                return (
                  <label key={emp.id} className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selected.has(emp.id)}
                      onChange={() => toggle(emp.id)}
                      className="rounded text-indigo-600"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
                      <p className="text-xs text-gray-500 truncate">{email}</p>
                    </div>
                  </label>
                )
              })}
            </div>
          </div>

          {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
          {result && (
            <p className="text-sm bg-green-50 text-green-700 px-3 py-2 rounded-lg">
              Assigned {result.success} / {result.success + result.failed}.
              {result.failed > 0 && ` ${result.failed} failed (probably already in progress).`}
            </p>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || selected.size === 0}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Assigning...' : `Assign to ${selected.size} learner${selected.size !== 1 ? 's' : ''}`}
          </button>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// Invite Learner Modal
// ============================================================
function InviteLearnerModal({
  orgId,
  orgName,
  onClose,
  onSuccess,
}: {
  orgId: string
  orgName: string
  onClose: () => void
  onSuccess: () => void
}) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    languageLevel: 'B1' as 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await organizationApi.inviteEmployee(orgId, form)
      onSuccess()
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to invite learner')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Invite Learner</h3>
            <p className="text-xs text-gray-500 mt-0.5">{orgName}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Mario Rossi"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="mario.rossi@company.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="text-xs text-gray-500 mt-1">An email with a temporary password will be sent here.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Initial CEFR level (best guess)</label>
            <div className="flex gap-1">
              {(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const).map(l => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setForm({ ...form, languageLevel: l })}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg ${form.languageLevel === l ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {l}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">The placement test will refine this.</p>
          </div>

          {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

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
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Sending invite...' : 'Send invite'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ============================================================
// Bulk Upload Modal — upload an Excel/CSV roster
// ============================================================
function BulkUploadModal({
  orgId,
  orgName,
  onClose,
  onSuccess,
}: {
  orgId: string
  orgName: string
  onClose: () => void
  onSuccess: () => void
}) {
  const [file, setFile] = useState<File | null>(null)
  const [sendInvites, setSendInvites] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<{
    total: number
    created: number
    skipped: number
    errored: number
    results: Array<{ row: number; status: 'created' | 'skipped' | 'error'; email: string; reason?: string }>
  } | null>(null)

  const handleTemplate = async () => {
    try {
      const blob = await organizationApi.downloadBulkTemplate(orgId)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${orgName.replace(/[^a-z0-9_-]+/gi, '_')}_learners_template.xlsx`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (e: any) {
      setError('Failed to download template')
    }
  }

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const data = await organizationApi.bulkUploadEmployees(orgId, file, sendInvites)
      setResult(data)
      if (data.created > 0) onSuccess()
    } catch (e: any) {
      setError(e.response?.data?.error || 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Bulk upload learners</h3>
            <p className="text-xs text-gray-500 mt-0.5">{orgName}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto">
          {!result && (
            <>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium text-gray-700">Excel format</p>
                <p className="text-xs text-gray-600">
                  Required columns: <code className="bg-white px-1.5 py-0.5 rounded">first_name</code>,{' '}
                  <code className="bg-white px-1.5 py-0.5 rounded">last_name</code>,{' '}
                  <code className="bg-white px-1.5 py-0.5 rounded">email</code>,{' '}
                  <code className="bg-white px-1.5 py-0.5 rounded">language</code>.
                </p>
                <p className="text-xs text-gray-600">
                  Optional: <code className="bg-white px-1 rounded">phone</code>,{' '}
                  <code className="bg-white px-1 rounded">job_role</code>,{' '}
                  <code className="bg-white px-1 rounded">language_level</code>,{' '}
                  <code className="bg-white px-1 rounded">needs_speaking</code>,{' '}
                  <code className="bg-white px-1 rounded">needs_reading</code>,{' '}
                  <code className="bg-white px-1 rounded">needs_writing</code>,{' '}
                  <code className="bg-white px-1 rounded">confidence</code>,{' '}
                  <code className="bg-white px-1 rounded">comments</code>.
                </p>
                <button
                  type="button"
                  onClick={handleTemplate}
                  className="inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  <Download className="h-4 w-4" />
                  Download template
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Roster file</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors">
                  <input
                    type="file"
                    id="bulk-file"
                    accept=".xlsx,.xls,.csv"
                    onChange={e => setFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <label htmlFor="bulk-file" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    {file ? (
                      <p className="text-sm text-gray-900 font-medium">{file.name}</p>
                    ) : (
                      <>
                        <p className="text-sm text-gray-900 font-medium">Choose .xlsx, .xls or .csv file</p>
                        <p className="text-xs text-gray-500 mt-1">Up to 1000 rows, 5 MB max</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sendInvites}
                  onChange={e => setSendInvites(e.target.checked)}
                  className="rounded"
                />
                Send invite email with temporary password to each new learner
              </label>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
              )}
            </>
          )}

          {result && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase">Created</span>
                  </div>
                  <p className="text-2xl font-bold text-green-900 mt-1">{result.created}</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-amber-700">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase">Skipped</span>
                  </div>
                  <p className="text-2xl font-bold text-amber-900 mt-1">{result.skipped}</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-red-700">
                    <X className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase">Errored</span>
                  </div>
                  <p className="text-2xl font-bold text-red-900 mt-1">{result.errored}</p>
                </div>
              </div>

              {(result.skipped + result.errored) > 0 && (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-3 py-2 text-xs font-medium text-gray-700">Issues</div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-gray-100">
                    {result.results
                      .filter(r => r.status !== 'created')
                      .map((r, i) => (
                        <div key={i} className="px-3 py-2 text-xs flex items-start gap-2">
                          <span className={`mt-0.5 inline-block w-12 text-right font-mono ${r.status === 'error' ? 'text-red-600' : 'text-amber-600'}`}>
                            Row {r.row}
                          </span>
                          <span className="text-gray-600 truncate flex-1">{r.email || '—'}</span>
                          <span className="text-gray-500">{r.reason}</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          {!result ? (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={!file || loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? 'Uploading...' : 'Upload'}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => { setResult(null); setFile(null) }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Upload another
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Done
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
