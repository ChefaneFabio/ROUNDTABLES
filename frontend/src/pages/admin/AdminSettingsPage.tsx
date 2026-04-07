import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Settings, Users, Bell, Zap, Key, Building2, ChevronRight,
  Mail, Phone, MapPin, Save, CheckCircle
} from 'lucide-react'
import { Card } from '../../components/common/Card'
import { Button } from '../../components/common/Button'

interface GeneralSettings {
  schoolName: string
  contactEmail: string
  contactPhone: string
  address: string
  city: string
  country: string
}

const LINK_SECTIONS = [
  {
    title: 'User Management',
    description: 'Manage all platform users: admins, teachers, students, HR contacts',
    icon: Users,
    href: '/admin/users',
    color: 'bg-slate-100 text-slate-600',
  },
  {
    title: 'Notification Settings',
    description: 'Configure email notifications, reminders, and alert preferences',
    icon: Bell,
    href: '/admin/notification-settings',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    title: 'Integrations',
    description: 'Connect with HubSpot, QuickBooks, Zoom, and other services',
    icon: Zap,
    href: '/admin/integrations',
    color: 'bg-violet-50 text-violet-600',
  },
  {
    title: 'API Keys',
    description: 'Manage API keys for external access and third-party integrations',
    icon: Key,
    href: '/api-keys',
    color: 'bg-sky-50 text-sky-600',
  },
  {
    title: 'Organizations',
    description: 'View and manage B2B organizations and their HR admin accounts',
    icon: Building2,
    href: '/admin/organizations',
    color: 'bg-emerald-50 text-emerald-600',
  },
]

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<GeneralSettings>({
    schoolName: 'Maka Language Consulting',
    contactEmail: 'info@makalanguage.com',
    contactPhone: '+39 02 1234 5678',
    address: 'Via Roma 1',
    city: 'Milan',
    country: 'Italy',
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // In a real implementation, this would call an API endpoint
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-slate-100 rounded-xl">
          <Settings className="w-6 h-6 text-slate-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>
          <p className="text-sm text-gray-500">Configure your Maka Language Consulting platform</p>
        </div>
      </div>

      {/* General Settings */}
      <Card>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-semibold text-gray-900">General</h2>
            <p className="text-xs text-gray-400 mt-0.5">School name, contact details, and address</p>
          </div>
          {saved && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
              <CheckCircle className="w-3.5 h-3.5" /> Saved
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SettingsField
            icon={Building2}
            label="School / Platform Name"
            value={settings.schoolName}
            onChange={(v) => setSettings({ ...settings, schoolName: v })}
          />
          <SettingsField
            icon={Mail}
            label="Contact Email"
            value={settings.contactEmail}
            onChange={(v) => setSettings({ ...settings, contactEmail: v })}
            type="email"
          />
          <SettingsField
            icon={Phone}
            label="Contact Phone"
            value={settings.contactPhone}
            onChange={(v) => setSettings({ ...settings, contactPhone: v })}
          />
          <SettingsField
            icon={MapPin}
            label="Address"
            value={settings.address}
            onChange={(v) => setSettings({ ...settings, address: v })}
          />
          <SettingsField
            icon={MapPin}
            label="City"
            value={settings.city}
            onChange={(v) => setSettings({ ...settings, city: v })}
          />
          <SettingsField
            icon={MapPin}
            label="Country"
            value={settings.country}
            onChange={(v) => setSettings({ ...settings, country: v })}
          />
        </div>

        <div className="flex justify-end mt-5">
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Changes
          </Button>
        </div>
      </Card>

      {/* Quick Links */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Configuration</h2>
        <div className="space-y-2">
          {LINK_SECTIONS.map(section => (
            <Link
              key={section.href}
              to={section.href}
              className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 px-5 py-4 hover:border-gray-200 hover:shadow-sm transition-all group"
            >
              <div className={`p-2.5 rounded-xl ${section.color}`}>
                <section.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-900">{section.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{section.description}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function SettingsField({ icon: Icon, label, value, onChange, type = 'text' }: {
  icon: React.ElementType; label: string; value: string; onChange: (v: string) => void; type?: string
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-1.5">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-300"
      />
    </div>
  )
}
