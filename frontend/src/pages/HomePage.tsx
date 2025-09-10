import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  TrendingUp, 
  Award,
  ArrowRight,
  Mail,
  Building,
  Globe,
  Target,
  Zap,
  Shield
} from 'lucide-react'

export function HomePage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const features = [
    {
      icon: Users,
      title: 'Participant Management',
      description: 'Manage up to 6 participants per roundtable with automated invitations and tracking'
    },
    {
      icon: Target,
      title: 'Topic Voting System',
      description: 'Democratic selection of 8 topics from 10 proposals through participant voting'
    },
    {
      icon: Calendar,
      title: 'Automated Scheduling',
      description: '10 structured sessions with automatic calendar management and reminders'
    },
    {
      icon: MessageSquare,
      title: 'Trainer Coordination',
      description: 'Streamlined question collection and session preparation for trainers'
    },
    {
      icon: Mail,
      title: 'Email Automation',
      description: 'Professional templates for invitations, reminders, and feedback distribution'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Real-time dashboard for monitoring roundtable progress and completion'
    }
  ]

  const stats = [
    { value: '90%', label: 'Time Saved' },
    { value: '100%', label: 'Automated Workflow' },
    { value: '10', label: 'Sessions Per Roundtable' },
    { value: '24/7', label: 'Platform Availability' }
  ]

  const benefits = [
    {
      icon: Zap,
      title: 'Efficiency',
      description: 'Reduce manual coordination time from hours to minutes'
    },
    {
      icon: Shield,
      title: 'Reliability',
      description: 'Never miss a deadline with automated reminders and notifications'
    },
    {
      icon: Award,
      title: 'Quality',
      description: 'Standardized process ensures consistent training excellence'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Maka Roundtables</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">Features</button>
              <button className="text-gray-600 hover:text-gray-900">About</button>
              <button className="text-gray-600 hover:text-gray-900">Contact</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Automated Roundtable Management Platform
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your corporate training coordination with our intelligent automation system. 
              Manage participants, schedule sessions, and track progress - all in one platform.
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 flex items-center"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-md text-lg font-semibold hover:border-gray-400">
                View Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Roundtable Management
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to run successful corporate training roundtables
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="ml-4 text-xl font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Simple, automated workflow from setup to completion
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Create Roundtable', desc: 'Set up client and define 10 topics' },
              { step: '2', title: 'Invite Participants', desc: 'Add up to 6 participants' },
              { step: '3', title: 'Topic Voting', desc: 'Participants select 8 topics' },
              { step: '4', title: 'Run Sessions', desc: 'Automated scheduling and tracking' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="text-center">
                  <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Automate Your Roundtables?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join Maka Italia in revolutionizing corporate training management
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-6 py-3 rounded-md text-lg flex-1 max-w-md"
            />
            <button className="bg-white text-blue-600 px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-100">
              Request Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Maka Roundtables</h3>
              <p className="text-gray-400 text-sm">
                Automated platform for corporate training management
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-300">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-300">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">About Maka</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-300">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  training@makaitalia.com
                </li>
                <li className="flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  Maka Italia
                </li>
                <li className="flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  www.makaitalia.com
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            © 2024 Maka Italia. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}