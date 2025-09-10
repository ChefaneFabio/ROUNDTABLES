import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Mail,
  Plus,
  Search,
  Edit,
  Copy,
  Trash2,
  Send,
  Eye,
  FileText,
  Settings,
  Clock,
  Users,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Save
} from 'lucide-react'

interface EmailTemplate {
  id: string
  name: string
  subject: string
  type: 'TRAINER_REMINDER' | 'QUESTION_REQUEST' | 'QUESTION_EMAIL' | 'FEEDBACK_REQUEST' | 'FEEDBACK_EMAIL'
  content: string
  variables: string[]
  isActive: boolean
  lastUsed?: string
  usageCount: number
  createdAt: string
}

const templateTypes = {
  TRAINER_REMINDER: { 
    label: 'Trainer Reminder', 
    icon: Clock, 
    color: 'bg-orange-100 text-orange-800',
    description: 'Weekly reminder to trainers about upcoming sessions'
  },
  QUESTION_REQUEST: { 
    label: 'Question Request', 
    icon: MessageSquare, 
    color: 'bg-blue-100 text-blue-800',
    description: 'Request 3 questions from trainers'
  },
  QUESTION_EMAIL: { 
    label: 'Questions to Participants', 
    icon: Users, 
    color: 'bg-green-100 text-green-800',
    description: 'Send approved questions to participants'
  },
  FEEDBACK_REQUEST: { 
    label: 'Feedback Request', 
    icon: FileText, 
    color: 'bg-purple-100 text-purple-800',
    description: 'Request feedback from trainers after sessions'
  },
  FEEDBACK_EMAIL: { 
    label: 'Feedback to Participants', 
    icon: Send, 
    color: 'bg-pink-100 text-pink-800',
    description: 'Send individual feedback to participants'
  }
}

const defaultTemplates = {
  TRAINER_REMINDER: {
    subject: 'REMINDER: {{roundtable_name}} Session {{session_number}} - {{session_date}}',
    content: `Hi {{trainer_name}},

This is a reminder about your upcoming roundtable session:

📅 **Session Details:**
- Roundtable: {{roundtable_name}}
- Session: {{session_number}} of 10
- Topic: {{topic_title}}
- Date: {{session_date}}
- Time: {{session_time}}

Please remember to prepare 3 discussion questions for this topic and send them to us by {{deadline_date}}.

Best regards,
The Maka Team`,
    variables: ['trainer_name', 'roundtable_name', 'session_number', 'session_date', 'session_time', 'topic_title', 'deadline_date']
  },
  QUESTION_EMAIL: {
    subject: '{{roundtable_name}} | ROUNDTABLE {{session_date}} – QUESTIONS TO TOPIC "{{topic_title}}"',
    content: `Hi,

According to a recent survey, 80% of professionals believe that effective {{topic_context}} skills are critical for business success. As we explore the nuances of {{topic_title}} in this roundtable, it's essential to consider not only the tactical aspects but also the psychological and cultural dynamics that shape outcomes.

Please see below the opening questions for the upcoming discussion on "{{topic_title}}" on {{session_date}}:

{{questions_list}}

I hope you have a productive and insightful conversation.

Jean`,
    variables: ['roundtable_name', 'session_date', 'topic_title', 'topic_context', 'questions_list']
  },
  FEEDBACK_EMAIL: {
    subject: 'Your Roundtable Feedback - {{topic_title}}',
    content: `Hi {{participant_name}},

How are you doing?

I am passing along some feedback from {{trainer_name}} regarding your recent roundtable discussion on {{topic_title}}.

**{{trainer_name}}'s Feedback:**

{{feedback_content}}

Well done on your effort!

See you in the next conversation.

Jean`,
    variables: ['participant_name', 'trainer_name', 'topic_title', 'feedback_content']
  }
}

export function EmailTemplatesPage() {
  const navigate = useNavigate()
  const [templates, setTemplates] = useState<EmailTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [showEditor, setShowEditor] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null)
  const [previewMode, setPreviewMode] = useState(false)
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    subject: '',
    type: 'TRAINER_REMINDER' as keyof typeof templateTypes,
    content: '',
    variables: [] as string[]
  })

  useEffect(() => {
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    try {
      setLoading(true)
      // Simulate API call - in real implementation this would fetch from backend
      const mockTemplates: EmailTemplate[] = [
        {
          id: '1',
          name: 'Weekly Trainer Reminder',
          subject: 'REMINDER: {{roundtable_name}} Session {{session_number}} - {{session_date}}',
          type: 'TRAINER_REMINDER',
          content: defaultTemplates.TRAINER_REMINDER.content,
          variables: defaultTemplates.TRAINER_REMINDER.variables,
          isActive: true,
          usageCount: 45,
          createdAt: '2024-01-15',
          lastUsed: '2024-01-20'
        },
        {
          id: '2',
          name: 'Questions to Participants',
          subject: '{{roundtable_name}} | ROUNDTABLE {{session_date}} – QUESTIONS TO TOPIC "{{topic_title}}"',
          type: 'QUESTION_EMAIL',
          content: defaultTemplates.QUESTION_EMAIL.content,
          variables: defaultTemplates.QUESTION_EMAIL.variables,
          isActive: true,
          usageCount: 32,
          createdAt: '2024-01-15',
          lastUsed: '2024-01-19'
        },
        {
          id: '3',
          name: 'Individual Feedback',
          subject: 'Your Roundtable Feedback - {{topic_title}}',
          type: 'FEEDBACK_EMAIL',
          content: defaultTemplates.FEEDBACK_EMAIL.content,
          variables: defaultTemplates.FEEDBACK_EMAIL.variables,
          isActive: true,
          usageCount: 28,
          createdAt: '2024-01-15',
          lastUsed: '2024-01-18'
        }
      ]
      setTemplates(mockTemplates)
    } catch (error) {
      console.error('Error fetching templates:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveTemplate = async () => {
    try {
      if (editingTemplate) {
        // Update existing template
        const updated = templates.map(t => 
          t.id === editingTemplate.id 
            ? { ...editingTemplate, ...newTemplate }
            : t
        )
        setTemplates(updated)
        alert('Template updated successfully!')
      } else {
        // Create new template
        const template: EmailTemplate = {
          id: Date.now().toString(),
          ...newTemplate,
          isActive: true,
          usageCount: 0,
          createdAt: new Date().toISOString()
        }
        setTemplates([...templates, template])
        alert('Template created successfully!')
      }
      
      setShowEditor(false)
      setEditingTemplate(null)
      setNewTemplate({
        name: '',
        subject: '',
        type: 'TRAINER_REMINDER',
        content: '',
        variables: []
      })
    } catch (error) {
      console.error('Error saving template:', error)
      alert('Error saving template')
    }
  }

  const handleEditTemplate = (template: EmailTemplate) => {
    setEditingTemplate(template)
    setNewTemplate({
      name: template.name,
      subject: template.subject,
      type: template.type,
      content: template.content,
      variables: template.variables
    })
    setShowEditor(true)
  }

  const handleDuplicateTemplate = (template: EmailTemplate) => {
    setNewTemplate({
      name: `${template.name} (Copy)`,
      subject: template.subject,
      type: template.type,
      content: template.content,
      variables: template.variables
    })
    setEditingTemplate(null)
    setShowEditor(true)
  }

  const handleDeleteTemplate = async (templateId: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      setTemplates(templates.filter(t => t.id !== templateId))
      alert('Template deleted successfully!')
    }
  }

  const handleToggleActive = async (templateId: string) => {
    const updated = templates.map(t => 
      t.id === templateId 
        ? { ...t, isActive: !t.isActive }
        : t
    )
    setTemplates(updated)
  }

  const extractVariables = (text: string): string[] => {
    const matches = text.match(/\{\{([^}]+)\}\}/g)
    return matches ? matches.map(match => match.slice(2, -2)) : []
  }

  const handleContentChange = (content: string) => {
    const variables = [...new Set([
      ...extractVariables(newTemplate.subject),
      ...extractVariables(content)
    ])]
    setNewTemplate({
      ...newTemplate,
      content,
      variables
    })
  }

  const handleSubjectChange = (subject: string) => {
    const variables = [...new Set([
      ...extractVariables(subject),
      ...extractVariables(newTemplate.content)
    ])]
    setNewTemplate({
      ...newTemplate,
      subject,
      variables
    })
  }

  const renderPreview = (template: EmailTemplate | typeof newTemplate) => {
    let previewContent = template.content
    let previewSubject = template.subject
    
    // Replace variables with example data
    const exampleData: Record<string, string> = {
      trainer_name: 'Marco Rossi',
      roundtable_name: 'Leadership Training Q1',
      session_number: '3',
      session_date: '3rd December 2024',
      session_time: '14:00-15:00',
      topic_title: 'The Art of Negotiation',
      topic_context: 'negotiation',
      deadline_date: '26th November 2024',
      participant_name: 'Anna Bianchi',
      feedback_content: 'You effectively connected diversity and inclusion concepts...',
      questions_list: '1. What makes someone a good negotiator?\n2. Why is understanding the other party important?\n3. How important is trust in negotiation?'
    }

    template.variables.forEach(variable => {
      const value = exampleData[variable] || `[${variable}]`
      previewContent = previewContent.replace(new RegExp(`\\{\\{${variable}\\}\\}`, 'g'), value)
      previewSubject = previewSubject.replace(new RegExp(`\\{\\{${variable}\\}\\}`, 'g'), value)
    })

    return { previewContent, previewSubject }
  }

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = 
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.content.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = typeFilter === 'all' || template.type === typeFilter
    
    return matchesSearch && matchesType
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Maka Roundtables</h1>
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="/dashboard" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                <a href="/roundtables" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Roundtables</a>
                <a href="/clients" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Clients</a>
                <a href="/sessions" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Sessions</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Email Templates</h1>
            <p className="text-gray-600 mt-2">Manage automated email templates for your roundtable workflow</p>
          </div>
          <button
            onClick={() => {
              setEditingTemplate(null)
              setNewTemplate({
                name: '',
                subject: '',
                type: 'TRAINER_REMINDER',
                content: '',
                variables: []
              })
              setShowEditor(true)
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Template
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Mail className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Templates</p>
                <p className="text-2xl font-bold text-gray-900">{templates.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">
                  {templates.filter(t => t.isActive).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Send className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Sent</p>
                <p className="text-2xl font-bold text-gray-900">
                  {templates.reduce((sum, t) => sum + t.usageCount, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Types</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(templates.map(t => t.type)).size}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                {Object.entries(templateTypes).map(([key, type]) => (
                  <option key={key} value={key}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template) => {
              const typeInfo = templateTypes[template.type]
              const TypeIcon = typeInfo.icon

              return (
                <div key={template.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-lg mr-3">
                          <TypeIcon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${typeInfo.color}`}>
                            {typeInfo.label}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleToggleActive(template.id)}
                          className={`p-1 rounded ${
                            template.isActive 
                              ? 'text-green-600 hover:bg-green-50' 
                              : 'text-gray-400 hover:bg-gray-50'
                          }`}
                        >
                          {template.isActive ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                        </button>
                        
                        <button
                          onClick={() => {
                            const preview = renderPreview(template)
                            alert(`Subject: ${preview.previewSubject}\n\nContent:\n${preview.previewContent}`)
                          }}
                          className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={() => handleEditTemplate(template)}
                          className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={() => handleDuplicateTemplate(template)}
                          className="p-1 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={() => handleDeleteTemplate(template.id)}
                          className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Subject:</p>
                      <p className="text-sm font-medium text-gray-900 bg-gray-50 p-2 rounded">
                        {template.subject}
                      </p>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Variables ({template.variables.length}):</p>
                      <div className="flex flex-wrap gap-1">
                        {template.variables.map((variable, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {variable}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>Used {template.usageCount} times</span>
                      {template.lastUsed && (
                        <span>Last used: {new Date(template.lastUsed).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="col-span-2 text-center py-12">
              <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
              <p className="text-gray-600 mb-6">
                Create email templates to automate your roundtable communications
              </p>
              <button
                onClick={() => setShowEditor(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Create Your First Template
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Template Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">
                {editingTemplate ? 'Edit Template' : 'Create New Template'}
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  {previewMode ? 'Edit' : 'Preview'}
                </button>
                <button
                  onClick={() => setShowEditor(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="px-6 py-4">
              {previewMode ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Preview</h4>
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="mb-4">
                        <p className="text-sm text-gray-600">Subject:</p>
                        <p className="font-medium">{renderPreview(newTemplate).previewSubject}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Content:</p>
                        <div className="whitespace-pre-wrap bg-white p-4 rounded border">
                          {renderPreview(newTemplate).previewContent}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Template Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={newTemplate.name}
                        onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Weekly Trainer Reminder"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Template Type *
                      </label>
                      <select
                        required
                        value={newTemplate.type}
                        onChange={(e) => {
                          const type = e.target.value as keyof typeof templateTypes
                          const defaultTemplate = defaultTemplates[type]
                          if (defaultTemplate && !editingTemplate) {
                            setNewTemplate({
                              ...newTemplate,
                              type,
                              subject: defaultTemplate.subject,
                              content: defaultTemplate.content,
                              variables: defaultTemplate.variables
                            })
                          } else {
                            setNewTemplate({...newTemplate, type})
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {Object.entries(templateTypes).map(([key, type]) => (
                          <option key={key} value={key}>{type.label}</option>
                        ))}
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        {templateTypes[newTemplate.type].description}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={newTemplate.subject}
                      onChange={(e) => handleSubjectChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Use {{variable}} for dynamic content"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Content *
                    </label>
                    <textarea
                      required
                      rows={12}
                      value={newTemplate.content}
                      onChange={(e) => handleContentChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Write your email content here. Use {{variable}} for dynamic content."
                    />
                  </div>

                  {newTemplate.variables.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Detected Variables ({newTemplate.variables.length})
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {newTemplate.variables.map((variable, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                            {variable}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                <button
                  onClick={() => setShowEditor(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                {!previewMode && (
                  <button
                    onClick={handleSaveTemplate}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {editingTemplate ? 'Update Template' : 'Create Template'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}