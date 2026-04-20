import React, { useState } from 'react'
import {
  Settings, Bell, Lock, Eye, EyeOff, Save, Shield, Trash2, CheckCircle, AlertCircle,
  GraduationCap, ClipboardCheck, Users
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { authApi } from '../services/api'
import { assessmentApi } from '../services/assessmentApi'

export const SettingsPage: React.FC = () => {
  const { isAdmin, user } = useAuth()
  const isTeacher = user?.role === 'TEACHER'
  const isStaff = isAdmin || isTeacher

  const [activeTab, setActiveTab] = useState('general')
  const [isSaving, setIsSaving] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const defaultSettings = {
    language: 'en',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Rome',
    darkMode: false,
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    lessonReminders: true,
    progressUpdates: true,
    marketingEmails: false,
    // Admin/Teacher notifications
    notifyTestCompletion: true,
    notifyAiScoring: true,
    notifySectionCompletion: true,
    notifyRetryRequests: true,
    notifyNewEnrollments: true,
    // Assessment defaults (admin)
    defaultTimeLimitReading: 25,
    defaultTimeLimitListening: 15,
    defaultTimeLimitWriting: 15,
    defaultTimeLimitSpeaking: 15,
    defaultQuestionsReading: 20,
    defaultQuestionsListening: 8,
    defaultQuestionsWriting: 3,
    defaultQuestionsSpeaking: 3,
    passingThreshold: 60,
    autoAssignOnEnroll: false,
    defaultAssessmentLanguage: 'English',
    aiAutoScore: true,
    showCorrectAnswersToStudents: false,
    allowRetryRequests: true,
    maxRetries: 2,
    // Test control
    allowPause: true,
    showTimer: true,
    autoSubmitOnExpiry: true,
    // Screen blocking / anti-cheating
    blockTabSwitch: true,
    blockCopyPaste: true,
    requireFullscreen: false,
    warnOnLeave: true,
    // Teacher preferences
    showStudentTranscripts: true,
    showAiEvaluation: true,
    // Privacy
    profileVisibility: 'school',
    showProgress: true,
    showCertificates: true
  }

  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('userSettings')
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings
    } catch {
      return defaultSettings
    }
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 5000)
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      localStorage.setItem('userSettings', JSON.stringify(settings))
      // If admin, also save assessment settings to backend
      if (isAdmin) {
        await assessmentApi.updateAssessmentSettings({
          allowPause: settings.allowPause,
          allowRetry: settings.allowRetryRequests,
          maxRetries: settings.maxRetries,
          showTimer: settings.showTimer,
          autoSubmitOnExpiry: settings.autoSubmitOnExpiry,
          blockTabSwitch: settings.blockTabSwitch,
          blockCopyPaste: settings.blockCopyPaste,
          requireFullscreen: settings.requireFullscreen,
          warnOnLeave: settings.warnOnLeave,
        }).catch(() => {}) // Don't fail if backend save fails
      }
      showMessage('success', 'Settings saved')
    } catch {
      showMessage('error', 'Failed to save settings')
    } finally {
      setIsSaving(false)
    }
  }

  const handlePasswordChange = async () => {
    if (passwordForm.newPassword.length < 6) {
      showMessage('error', 'New password must be at least 6 characters')
      return
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showMessage('error', 'Passwords do not match')
      return
    }
    setIsSaving(true)
    try {
      await authApi.changePassword(passwordForm.currentPassword, passwordForm.newPassword)
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      showMessage('success', 'Password changed successfully')
    } catch (e: any) {
      showMessage('error', e.response?.data?.error || 'Failed to change password')
    } finally {
      setIsSaving(false)
    }
  }

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    ...(isStaff ? [{ id: 'assessments', name: 'Assessments', icon: ClipboardCheck }] : []),
    ...(isAdmin ? [{ id: 'school', name: 'School', icon: GraduationCap }] : []),
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'privacy', name: 'Privacy', icon: Shield }
  ]

  const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
        enabled ? 'bg-slate-700' : 'bg-gray-300'
      }`}
    >
      <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${
        enabled ? 'translate-x-[18px]' : 'translate-x-[3px]'
      }`} />
    </button>
  )

  const SaveButton = () => (
    <button
      onClick={handleSave}
      disabled={isSaving}
      className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
    >
      {isSaving ? 'Saving...' : <><Save className="w-4 h-4" /> Save Changes</>}
    </button>
  )

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account and preferences</p>
      </div>

      {/* Message */}
      {message && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm ${
          message.type === 'success'
            ? 'bg-gray-50 border-gray-200 text-gray-700'
            : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          {message.type === 'success' ? <CheckCircle className="w-4 h-4 text-gray-500" /> : <AlertCircle className="w-4 h-4" />}
          {message.text}
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div>
        {/* ─── General ─── */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">Preferences</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Interface Language</label>
                  <select
                    value={settings.language}
                    onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm text-gray-900 focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none"
                  >
                    <option value="en">English</option>
                    <option value="it">Italiano</option>
                    <option value="es">Espa&ntilde;ol</option>
                    <option value="fr">Fran&ccedil;ais</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Timezone</label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm text-gray-900 focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none"
                  >
                    <option value="Europe/Rome">Rome (CET)</option>
                    <option value="Europe/London">London (GMT)</option>
                    <option value="Europe/Paris">Paris (CET)</option>
                    <option value="Europe/Berlin">Berlin (CET)</option>
                    <option value="Europe/Madrid">Madrid (CET)</option>
                    <option value="America/New_York">New York (EST)</option>
                    <option value="America/Los_Angeles">Los Angeles (PST)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
              </div>
            </div>
            <SaveButton />
          </div>
        )}

        {/* ─── Notifications ─── */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">Channels</h2>
              <div className="space-y-0 divide-y divide-gray-100">
                {[
                  { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                  { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive browser push notifications' },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                    <Toggle
                      enabled={settings[item.key as keyof typeof settings] as boolean}
                      onChange={() => setSettings({ ...settings, [item.key]: !settings[item.key as keyof typeof settings] })}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">General</h2>
              <div className="space-y-0 divide-y divide-gray-100">
                {[
                  { key: 'lessonReminders', label: 'Lesson Reminders', desc: 'Get reminded before scheduled lessons' },
                  { key: 'progressUpdates', label: 'Progress Updates', desc: 'Weekly progress summary' },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                    <Toggle
                      enabled={settings[item.key as keyof typeof settings] as boolean}
                      onChange={() => setSettings({ ...settings, [item.key]: !settings[item.key as keyof typeof settings] })}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Admin/Teacher notification preferences */}
            {isStaff && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">
                  {isAdmin ? 'Admin' : 'Trainer'} Notifications
                </h2>
                <div className="space-y-0 divide-y divide-gray-100">
                  {[
                    { key: 'notifyTestCompletion', label: 'Test Completions', desc: 'When a learner completes their full assessment' },
                    { key: 'notifyAiScoring', label: 'AI Scoring Results', desc: 'When AI finishes evaluating Writing/Speaking responses' },
                    { key: 'notifySectionCompletion', label: 'Section Completions', desc: 'When a learner completes each individual section' },
                    { key: 'notifyRetryRequests', label: 'Retry Requests', desc: 'When a learner requests to retake a section' },
                    ...(isAdmin ? [{ key: 'notifyNewEnrollments', label: 'New Enrollments', desc: 'When a new learner is added to the platform' }] : []),
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
                      </div>
                      <Toggle
                        enabled={settings[item.key as keyof typeof settings] as boolean}
                        onChange={() => setSettings({ ...settings, [item.key]: !settings[item.key as keyof typeof settings] })}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <SaveButton />
          </div>
        )}

        {/* ─── Assessments (Admin/Teacher) ─── */}
        {activeTab === 'assessments' && isStaff && (
          <div className="space-y-6">
            {isAdmin && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">Default Time Limits</h2>
                <p className="text-xs text-gray-400 mb-4">Default time limits for new assessments (in minutes)</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { key: 'defaultTimeLimitReading', label: 'Reading' },
                    { key: 'defaultTimeLimitListening', label: 'Listening' },
                    { key: 'defaultTimeLimitWriting', label: 'Writing' },
                    { key: 'defaultTimeLimitSpeaking', label: 'Speaking' },
                  ].map(item => (
                    <div key={item.key}>
                      <label className="block text-xs font-medium text-gray-600 mb-1">{item.label}</label>
                      <div className="flex items-center gap-1">
                        <input
                          type="number" min="5" max="60"
                          value={settings[item.key as keyof typeof settings] as number}
                          onChange={(e) => setSettings({ ...settings, [item.key]: parseInt(e.target.value) || 15 })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-1 focus:ring-gray-400 outline-none"
                        />
                        <span className="text-xs text-gray-400">min</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isAdmin && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">Default Questions per Section</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { key: 'defaultQuestionsReading', label: 'Reading' },
                    { key: 'defaultQuestionsListening', label: 'Listening' },
                    { key: 'defaultQuestionsWriting', label: 'Writing' },
                    { key: 'defaultQuestionsSpeaking', label: 'Speaking' },
                  ].map(item => (
                    <div key={item.key}>
                      <label className="block text-xs font-medium text-gray-600 mb-1">{item.label}</label>
                      <input
                        type="number" min="1" max="50"
                        value={settings[item.key as keyof typeof settings] as number}
                        onChange={(e) => setSettings({ ...settings, [item.key]: parseInt(e.target.value) || 5 })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-1 focus:ring-gray-400 outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">Scoring & Grading</h2>
              <div className="space-y-5">
                {isAdmin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Passing Threshold (%)</label>
                    <p className="text-xs text-gray-400 mb-2">Minimum percentage to pass a CEFR level</p>
                    <input
                      type="number" min="40" max="90"
                      value={settings.passingThreshold}
                      onChange={(e) => setSettings({ ...settings, passingThreshold: parseInt(e.target.value) || 60 })}
                      className="w-32 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-1 focus:ring-gray-400 outline-none"
                    />
                  </div>
                )}
                <div className="space-y-0 divide-y divide-gray-100">
                  {[
                    { key: 'aiAutoScore', label: 'Auto AI Scoring', desc: 'Automatically score Writing/Speaking with AI when section completes', admin: true },
                    { key: 'allowPause', label: 'Allow Pause & Resume', desc: 'Learners can pause the test and come back later to finish', admin: true },
                    { key: 'showTimer', label: 'Show Countdown Timer', desc: 'Display the remaining time to learners during the test', admin: true },
                    { key: 'autoSubmitOnExpiry', label: 'Auto-submit on Time Expiry', desc: 'Automatically submit and close the section when time runs out', admin: true },
                    { key: 'blockTabSwitch', label: 'Block Tab Switching', desc: 'Detect and log when learners switch tabs or lose focus during the test', admin: true },
                    { key: 'blockCopyPaste', label: 'Block Copy/Paste & Right-Click', desc: 'Prevent learners from copying content or right-clicking during the test', admin: true },
                    { key: 'requireFullscreen', label: 'Require Fullscreen Mode', desc: 'Force the test to run in fullscreen — exit is logged as a violation and re-requested', admin: true },
                    { key: 'warnOnLeave', label: 'Warn on Page Leave', desc: 'Show a browser warning if the learner tries to navigate away during the test', admin: true },
                    { key: 'showCorrectAnswersToStudents', label: 'Show Correct Answers to Learners', desc: 'Learners can see the correct answers after completing the test', admin: true },
                    { key: 'allowRetryRequests', label: 'Allow Retry Requests', desc: 'Learners can request to retake completed sections', admin: true },
                    { key: 'showStudentTranscripts', label: 'Show Speaking Transcripts', desc: 'Display speech-to-text transcripts in review panel', admin: false },
                    { key: 'showAiEvaluation', label: 'Show AI Evaluation Details', desc: 'Show full AI scoring breakdown when reviewing responses', admin: false },
                  ]
                  .filter(item => isAdmin || !item.admin)
                  .map(item => (
                    <div key={item.key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
                      </div>
                      <Toggle
                        enabled={settings[item.key as keyof typeof settings] as boolean}
                        onChange={() => setSettings({ ...settings, [item.key]: !settings[item.key as keyof typeof settings] })}
                      />
                    </div>
                  ))}
                </div>
                {isAdmin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Max Retries per Section</label>
                    <input
                      type="number" min="1" max="5"
                      value={settings.maxRetries}
                      onChange={(e) => setSettings({ ...settings, maxRetries: parseInt(e.target.value) || 2 })}
                      className="w-32 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-1 focus:ring-gray-400 outline-none"
                    />
                  </div>
                )}
              </div>
            </div>

            {isAdmin && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">Enrollment Defaults</h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Default Assessment Language</label>
                    <select
                      value={settings.defaultAssessmentLanguage}
                      onChange={(e) => setSettings({ ...settings, defaultAssessmentLanguage: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm text-gray-900 focus:ring-1 focus:ring-gray-400 outline-none"
                    >
                      <option value="English">English</option>
                      <option value="Italian">Italian</option>
                      <option value="French">French</option>
                      <option value="Spanish">Spanish</option>
                      <option value="German">German</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Auto-assign Placement Test</p>
                      <p className="text-sm text-gray-500 mt-0.5">Automatically assign a placement test when a new learner enrolls</p>
                    </div>
                    <Toggle
                      enabled={settings.autoAssignOnEnroll}
                      onChange={() => setSettings({ ...settings, autoAssignOnEnroll: !settings.autoAssignOnEnroll })}
                    />
                  </div>
                </div>
              </div>
            )}

            <SaveButton />
          </div>
        )}

        {/* ─── School (Admin only) ─── */}
        {activeTab === 'school' && isAdmin && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">School Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <GraduationCap className="w-8 h-8 text-gray-400" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Maka Language Consulting</p>
                    <p className="text-xs text-gray-500">Language training, coaching, and skills development</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">Supported Languages</h2>
              <p className="text-xs text-gray-400 mb-3">Languages available for assessments and courses</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { flag: '\u{1F1EC}\u{1F1E7}', name: 'English' },
                  { flag: '\u{1F1EE}\u{1F1F9}', name: 'Italian' },
                  { flag: '\u{1F1EB}\u{1F1F7}', name: 'French' },
                  { flag: '\u{1F1EA}\u{1F1F8}', name: 'Spanish' },
                  { flag: '\u{1F1E9}\u{1F1EA}', name: 'German' },
                ].map(lang => (
                  <div key={lang.name} className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-sm text-gray-700">{lang.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">Staff Access</h2>
              <p className="text-xs text-gray-400 mb-3">Quick overview of team members with access</p>
              <div className="space-y-2">
                {[
                  { role: 'Administrators', desc: 'Full access to all settings, learners, and assessments', icon: Shield },
                  { role: 'Trainers', desc: 'Can review assessments, score responses, and manage lessons', icon: Users },
                  { role: 'Learners', desc: 'Can take assessments, view courses, and track progress', icon: GraduationCap },
                ].map(item => (
                  <div key={item.role} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                    <item.icon className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.role}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── Security ─── */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">Change Password</h2>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none"
                  />
                </div>
                <button
                  onClick={handlePasswordChange}
                  disabled={isSaving || !passwordForm.currentPassword || !passwordForm.newPassword}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {isSaving ? 'Updating...' : <><Lock className="w-4 h-4" /> Change Password</>}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ─── Privacy ─── */}
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">Profile Visibility</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Who can see your profile</label>
                <select
                  value={settings.profileVisibility}
                  onChange={(e) => setSettings({ ...settings, profileVisibility: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm text-gray-900 focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none"
                >
                  <option value="public">Public - Anyone can see your profile</option>
                  <option value="school">School Only - Only school members</option>
                  <option value="private">Private - Only you</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">Data Sharing</h2>
              <div className="space-y-0 divide-y divide-gray-100">
                {[
                  { key: 'showProgress', label: 'Show Learning Progress', desc: 'Allow others to see your progress' },
                  { key: 'showCertificates', label: 'Show Certificates', desc: 'Display earned certificates on profile' }
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                    <Toggle
                      enabled={settings[item.key as keyof typeof settings] as boolean}
                      onChange={() => setSettings({ ...settings, [item.key]: !settings[item.key as keyof typeof settings] })}
                    />
                  </div>
                ))}
              </div>
            </div>

            <SaveButton />

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-red-500 uppercase tracking-wide mb-2">Danger Zone</h2>
              <p className="text-sm text-gray-500 mb-4">Permanently delete your account and all data</p>
              <button className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors">
                <Trash2 className="w-4 h-4" />
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SettingsPage
