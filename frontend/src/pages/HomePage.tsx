import { Link } from 'react-router-dom'
import { GraduationCap, Users, BookOpen, ArrowRight, Globe, Award, Clock } from 'lucide-react'

const portals = [
  {
    title: 'Corporate',
    description: 'Language training solutions for your organization. Manage employee enrollments, track progress, and view reports.',
    icon: BookOpen,
    color: 'bg-blue-600 hover:bg-blue-700',
    href: '/login?portal=corporate',
    features: ['Employee Enrollment', 'Progress Tracking', 'Training Reports', 'Flexible Scheduling'],
  },
  {
    title: 'Teacher',
    description: 'Access your teaching schedule, manage lessons, provide student feedback, and track attendance.',
    icon: GraduationCap,
    color: 'bg-green-600 hover:bg-green-700',
    href: '/login?portal=teacher',
    features: ['Lesson Management', 'Student Feedback', 'Attendance Tracking', 'Course Materials'],
  },
  {
    title: 'Student',
    description: 'View your enrolled courses, attend lessons, track your progress, and receive personalized feedback.',
    icon: Users,
    color: 'bg-purple-600 hover:bg-purple-700',
    href: '/login?portal=student',
    features: ['Course Access', 'Progress Tracking', 'Lesson Schedule', 'Feedback & Scores'],
  },
]

const features = [
  {
    icon: Globe,
    title: 'Multiple Languages',
    description: 'Learn English, Italian, French, German, Spanish and more with native-speaking teachers.',
  },
  {
    icon: Award,
    title: 'Expert Teachers',
    description: 'Qualified instructors with years of experience in language education.',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Individual and group lessons tailored to your schedule and learning pace.',
  },
]

export function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img src="/logo.svg" alt="Maka Language Centre" className="h-10 w-10" />
              <span className="ml-3 text-xl font-bold text-gray-900">MAKA LANGUAGE CENTRE</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 font-medium"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to Maka Language Centre
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Professional language training for individuals and organizations. Learn with expert teachers in a supportive environment.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/register"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Learning
            </Link>
            <Link
              to="/register?type=corporate"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              Corporate Training
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to run a successful language school in one platform.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portals Section */}
      <section id="portals" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Access Your Portal</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose your portal below to sign in and access your personalized dashboard.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {portals.map((portal) => (
              <div
                key={portal.title}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className={`${portal.color} p-6 text-white`}>
                  <portal.icon className="h-12 w-12 mb-4" />
                  <h3 className="text-2xl font-bold">{portal.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{portal.description}</p>
                  <ul className="space-y-2 mb-6">
                    {portal.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-gray-500">
                        <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={portal.href}
                    className={`flex items-center justify-center w-full ${portal.color} text-white py-3 rounded-lg font-semibold transition-colors`}
                  >
                    Access Portal
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Language Journey?</h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Whether you're an individual looking to learn a new language or a company seeking training for your team, we're here to help.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/register"
              className="inline-flex items-center bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Register as Student
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/register?type=corporate"
              className="inline-flex items-center border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              Corporate Enquiry
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img src="/logo.svg" alt="Maka Language Centre" className="h-8 w-8" />
              <span className="ml-2 text-white font-semibold">MAKA LANGUAGE CENTRE</span>
            </div>
            <div className="flex gap-6">
              <Link to="/login" className="hover:text-white transition-colors">Sign In</Link>
              <Link to="/register" className="hover:text-white transition-colors">Register</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Maka Language Centre. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
