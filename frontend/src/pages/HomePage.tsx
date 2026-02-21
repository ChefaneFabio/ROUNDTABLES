import { Link } from 'react-router-dom'
import { GraduationCap, Users, Building2, ArrowRight, Award, Clock, Languages, CheckCircle, Shield, BarChart3, Headphones } from 'lucide-react'

const portals = [
  {
    title: 'Corporate Clients',
    description: 'Manage your organization\'s language training programs. Access employee progress reports, enrollment management, and training analytics.',
    icon: Building2,
    gradient: 'from-slate-700 to-slate-900',
    href: '/login?portal=corporate',
    features: ['Employee enrollment management', 'Progress tracking & reports', 'Customized training programs', 'Dedicated account support'],
  },
  {
    title: 'Teachers',
    description: 'Access your teaching dashboard. Manage lessons, track attendance, provide feedback, and access course materials.',
    icon: GraduationCap,
    gradient: 'from-primary-600 to-primary-800',
    href: '/login?portal=teacher',
    features: ['Lesson scheduling', 'Student progress tracking', 'Feedback & assessment tools', 'Course material access'],
  },
  {
    title: 'Students',
    description: 'Access your personalized learning dashboard. View enrolled courses, attend lessons, and track your language learning progress.',
    icon: Users,
    gradient: 'from-accent-600 to-accent-700',
    href: '/login?portal=student',
    features: ['Course enrollment', 'Progress monitoring', 'Lesson schedules', 'Teacher feedback access'],
  },
]

const services = [
  {
    icon: Languages,
    title: 'Multi-Language Programs',
    description: 'Comprehensive courses in English, Italian, French, German, Spanish, Portuguese, Chinese, Japanese, and more.',
  },
  {
    icon: Building2,
    title: 'Corporate Training',
    description: 'Tailored language programs designed to meet your organization\'s specific business communication needs.',
  },
  {
    icon: Users,
    title: 'Individual Instruction',
    description: 'Personalized one-on-one and small group lessons adapted to your learning objectives and schedule.',
  },
  {
    icon: BarChart3,
    title: 'Progress Analytics',
    description: 'Comprehensive tracking and reporting tools to measure learning outcomes and ROI on training investment.',
  },
]

const stats = [
  { value: '15+', label: 'Languages Offered' },
  { value: '50+', label: 'Qualified Instructors' },
  { value: '1,000+', label: 'Students Trained' },
  { value: '98%', label: 'Client Satisfaction' },
]

const benefits = [
  { icon: Award, title: 'Certified Instructors', description: 'All teachers hold recognized language teaching certifications' },
  { icon: Clock, title: 'Flexible Scheduling', description: 'Online and in-person options to fit your availability' },
  { icon: Shield, title: 'Quality Assured', description: 'Structured curriculum with measurable learning outcomes' },
  { icon: Headphones, title: 'Dedicated Support', description: 'Personal account management for corporate clients' },
]

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img src="/logo.png" alt="Maka Learning Management Centre" className="h-10 w-auto" />
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Services</a>
              <a href="#portals" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Access Portal</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">About</a>
            </nav>
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-primary-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary-600 font-semibold mb-4 tracking-wide uppercase text-sm">
                Language Management System
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Professional Language Training for Business & Individuals
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Maka Learning Management Centre provides comprehensive language education solutions. Our integrated platform serves corporate clients, individual learners, and educators with structured programs and measurable outcomes.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2"
                >
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/register?type=corporate"
                  className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors"
                >
                  Corporate Enquiries
                </Link>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Trusted by Organizations Worldwide</h3>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-3xl font-bold text-primary-600 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500 text-center">
                  A learning management system by <span className="font-medium text-gray-700">Maka Language Consulting</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary-600 font-semibold mb-2 tracking-wide uppercase text-sm">Our Services</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Language Solutions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              From individual instruction to enterprise-wide training programs, we deliver measurable language learning outcomes.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary-600 font-semibold mb-2 tracking-wide uppercase text-sm">Why Choose Us</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Quality-Driven Language Education
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Maka Learning Management Centre combines experienced educators, proven methodologies, and modern technology to deliver effective language training that meets professional standards.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop"
                alt="Professional language training"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Training Environment</h3>
                <p className="text-gray-600">
                  Our qualified instructors deliver structured lessons designed to achieve measurable language proficiency improvements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portals Section */}
      <section id="portals" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary-600 font-semibold mb-2 tracking-wide uppercase text-sm">Platform Access</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Access Your Portal
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Sign in to your dedicated dashboard based on your role within the Maka Learning Management Centre system.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {portals.map((portal) => (
              <div
                key={portal.title}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className={`bg-gradient-to-r ${portal.gradient} p-6 text-white`}>
                  <portal.icon className="h-10 w-10 mb-3" />
                  <h3 className="text-xl font-bold">{portal.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">{portal.description}</p>
                  <ul className="space-y-2 mb-6">
                    {portal.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 text-primary-600 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={portal.href}
                    className={`flex items-center justify-center w-full bg-gradient-to-r ${portal.gradient} text-white py-3 rounded-lg font-medium transition-all hover:opacity-90`}
                  >
                    Access Portal
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary-600 font-semibold mb-2 tracking-wide uppercase text-sm">About the Platform</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Built for Professional Language Education
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Maka Learning Management Centre is a comprehensive learning management system developed by Maka Language Consulting.
              The platform integrates course management, student tracking, scheduling, and progress analytics into a
              unified solution serving corporate clients, individual learners, and language educators.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                to="/register"
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Register Now
              </Link>
              <Link
                to="/register?type=corporate"
                className="border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                Corporate Enquiries
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Ready to Start Your Language Training?
              </h2>
              <p className="text-primary-100">
                Contact us to discuss your language learning requirements.
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                to="/register"
                className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <img src="/logo.png" alt="Maka Learning Management Centre" className="h-10 w-auto mb-4" />
              <p className="text-sm mb-4 max-w-md">
                A comprehensive learning management system developed by Maka Language Consulting.
                Providing professional language education solutions for organizations and individuals.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/login" className="hover:text-white transition-colors">Sign In</Link></li>
                <li><Link to="/register" className="hover:text-white transition-colors">Register</Link></li>
                <li><a href="#portals" className="hover:text-white transition-colors">Access Portals</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/register?type=corporate" className="hover:text-white transition-colors">Corporate Training</Link></li>
                <li><a href="#services" className="hover:text-white transition-colors">Individual Courses</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <p>&copy; {new Date().getFullYear()} Maka Learning Management Centre. All rights reserved.</p>
              <p className="text-gray-500">
                Developed by <span className="text-gray-400">Maka Language Consulting</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
