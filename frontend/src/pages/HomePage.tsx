import { Link } from 'react-router-dom'
import { GraduationCap, Users, Building2, ArrowRight, Globe, Award, Clock, Sparkles, Languages, Target } from 'lucide-react'

const portals = [
  {
    title: 'Corporate',
    description: 'Language training solutions for your organization. Manage employee enrollments, track progress, and view reports.',
    icon: Building2,
    gradient: 'from-corporate-500 to-corporate-700',
    bgLight: 'bg-blue-50',
    textColor: 'text-corporate-600',
    href: '/login?portal=corporate',
    features: ['Employee Enrollment', 'Progress Tracking', 'Training Reports', 'Flexible Scheduling'],
  },
  {
    title: 'Teacher',
    description: 'Access your teaching schedule, manage lessons, provide student feedback, and track attendance.',
    icon: GraduationCap,
    gradient: 'from-teacher-500 to-teacher-700',
    bgLight: 'bg-emerald-50',
    textColor: 'text-teacher-600',
    href: '/login?portal=teacher',
    features: ['Lesson Management', 'Student Feedback', 'Attendance Tracking', 'Course Materials'],
  },
  {
    title: 'Student',
    description: 'View your enrolled courses, attend lessons, track your progress, and receive personalized feedback.',
    icon: Users,
    gradient: 'from-student-500 to-student-700',
    bgLight: 'bg-violet-50',
    textColor: 'text-student-600',
    href: '/login?portal=student',
    features: ['Course Access', 'Progress Tracking', 'Lesson Schedule', 'Feedback & Scores'],
  },
]

const features = [
  {
    icon: Languages,
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

const stats = [
  { value: '15+', label: 'Languages' },
  { value: '50+', label: 'Expert Teachers' },
  { value: '1000+', label: 'Happy Students' },
  { value: '98%', label: 'Success Rate' },
]

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 border-b border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img src="/logo.svg" alt="Maka Language Centre" className="h-12 w-auto" />
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-primary-700 hover:text-primary-900 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-accent-500 to-accent-600 text-primary-900 px-6 py-2.5 rounded-full font-semibold hover:from-accent-400 hover:to-accent-500 transition-all shadow-lg shadow-accent-500/30"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900"></div>
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-accent-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
              <Sparkles className="h-4 w-4 text-accent-400" />
              <span className="text-accent-300 text-sm font-medium">Professional Language Training</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Master Any Language<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-300">
                With Confidence
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Expert teachers, personalized learning paths, and flexible schedules for individuals and organizations.
            </p>
            <div className="flex justify-center gap-4 flex-wrap mb-16">
              <Link
                to="/register"
                className="group bg-gradient-to-r from-accent-500 to-accent-400 text-primary-900 px-8 py-4 rounded-full font-bold text-lg hover:from-accent-400 hover:to-accent-300 transition-all shadow-xl shadow-accent-500/30 flex items-center gap-2"
              >
                Start Learning Today
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/register?type=corporate"
                className="group border-2 border-accent-400/50 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-accent-500/20 hover:border-accent-400 transition-all flex items-center gap-2"
              >
                Corporate Training
                <Building2 className="h-5 w-5" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-accent-400 mb-2">{stat.value}</div>
                  <div className="text-primary-200 text-sm uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-100 px-4 py-2 rounded-full mb-4">
              <Target className="h-4 w-4 text-primary-600" />
              <span className="text-primary-700 text-sm font-medium">Why Choose Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
              Your Success Is Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">Mission</span>
            </h2>
            <p className="text-primary-600 max-w-2xl mx-auto text-lg">
              We combine expert instruction with modern technology to deliver exceptional language learning experiences.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group bg-white rounded-2xl p-8 shadow-lg shadow-primary-100 hover:shadow-xl hover:shadow-primary-200 transition-all duration-300 border border-primary-100 hover:border-accent-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-primary-900 mb-3">{feature.title}</h3>
                <p className="text-primary-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portals Section */}
      <section id="portals" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-accent-100 px-4 py-2 rounded-full mb-4">
              <Globe className="h-4 w-4 text-accent-600" />
              <span className="text-accent-700 text-sm font-medium">Get Started</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
              Access Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-500 to-primary-600">Portal</span>
            </h2>
            <p className="text-primary-600 max-w-2xl mx-auto text-lg">
              Choose your portal to access your personalized dashboard and start your journey.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {portals.map((portal) => (
              <div
                key={portal.title}
                className="group bg-white rounded-3xl shadow-lg shadow-primary-100 overflow-hidden hover:shadow-2xl hover:shadow-primary-200 transition-all duration-500 border border-primary-100 hover:-translate-y-2"
              >
                <div className={`bg-gradient-to-br ${portal.gradient} p-8 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <portal.icon className="h-14 w-14 mb-4 relative z-10" />
                  <h3 className="text-3xl font-bold relative z-10">{portal.title}</h3>
                </div>
                <div className="p-8">
                  <p className="text-primary-600 mb-6 leading-relaxed">{portal.description}</p>
                  <ul className="space-y-3 mb-8">
                    {portal.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-primary-700">
                        <span className={`w-2 h-2 ${portal.bgLight} ${portal.textColor} rounded-full mr-3 ring-4 ring-opacity-30 ${portal.bgLight}`}></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={portal.href}
                    className={`flex items-center justify-center w-full bg-gradient-to-r ${portal.gradient} text-white py-4 rounded-xl font-semibold transition-all group-hover:shadow-lg`}
                  >
                    Access Portal
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent-400/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-300">Language Journey?</span>
          </h2>
          <p className="text-primary-200 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
            Whether you're an individual looking to learn a new language or a company seeking training for your team, we're here to help you succeed.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/register"
              className="group inline-flex items-center bg-gradient-to-r from-accent-500 to-accent-400 text-primary-900 px-8 py-4 rounded-full font-bold text-lg hover:from-accent-400 hover:to-accent-300 transition-all shadow-xl shadow-accent-500/30"
            >
              Register as Student
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/register?type=corporate"
              className="group inline-flex items-center border-2 border-accent-400/50 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-accent-500/20 hover:border-accent-400 transition-all"
            >
              Corporate Enquiry
              <Building2 className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-900 text-primary-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center mb-6 md:mb-0">
              <img src="/logo.svg" alt="Maka Language Centre" className="h-10 w-auto" />
            </div>
            <div className="flex gap-8">
              <Link to="/login" className="hover:text-accent-400 transition-colors font-medium">Sign In</Link>
              <Link to="/register" className="hover:text-accent-400 transition-colors font-medium">Register</Link>
              <a href="#portals" className="hover:text-accent-400 transition-colors font-medium">Portals</a>
            </div>
          </div>
          <div className="border-t border-primary-800 pt-8 text-center text-sm text-primary-400">
            <p>&copy; {new Date().getFullYear()} Maka Language Centre. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
