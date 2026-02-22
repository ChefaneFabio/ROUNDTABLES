import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Building2,
  Users,
  ShoppingCart,
  BarChart3,
  BookOpen,
  GraduationCap,
  Globe,
  FileText,
  ChevronDown,
  ChevronUp,
  Star,
} from 'lucide-react'
import { catalogApi } from '../services/organizationApi'

interface CatalogCourse {
  id: string
  name: string
  description?: string
  price?: number
  currency: string
  courseType: string
  language?: string
}

const steps = [
  {
    icon: Building2,
    title: 'Register Your Organization',
    description: 'Create a free organization account with your company details. Set up billing information for Italian electronic invoicing.',
  },
  {
    icon: ShoppingCart,
    title: 'Purchase Seat Licenses',
    description: 'Browse our course catalog and buy seat licenses for your team. Pay securely with Stripe. Seats are provisioned instantly.',
  },
  {
    icon: Users,
    title: 'Invite & Track Employees',
    description: 'Allocate seats to employees, monitor their progress, and access detailed analytics from your organization dashboard.',
  },
]

const features = [
  { icon: ShoppingCart, title: 'Seat-Based Licensing', description: 'Purchase exactly the number of seats you need. Add more anytime.' },
  { icon: BarChart3, title: 'Employee Progress Tracking', description: 'Monitor individual and team progress with detailed analytics.' },
  { icon: BookOpen, title: 'Self-Paced & Live Courses', description: 'Choose from self-paced video courses and live instructor-led sessions.' },
  { icon: GraduationCap, title: 'CEFR-Aligned Curriculum', description: 'All courses follow the Common European Framework of Reference.' },
  { icon: Globe, title: 'Dedicated Org Dashboard', description: 'Manage employees, seats, and billing from a single dashboard.' },
  { icon: FileText, title: 'Italian Invoicing Support', description: 'Full support for Fattura Elettronica, SDI, and PEC billing.' },
]

const testimonials = [
  {
    quote: 'Maka has transformed our team\'s language capabilities. The seat-based model makes budgeting straightforward.',
    author: 'Maria R.',
    role: 'HR Director',
    company: 'TechCorp Italy',
  },
  {
    quote: 'The progress tracking features help us measure ROI on our language training investment with clear data.',
    author: 'Luca B.',
    role: 'Training Manager',
    company: 'EuroFinance',
  },
  {
    quote: 'Easy onboarding for our employees. The self-paced courses fit perfectly around busy work schedules.',
    author: 'Sofia M.',
    role: 'Operations Lead',
    company: 'Global Logistics',
  },
]

const faqs = [
  {
    q: 'How does seat-based licensing work?',
    a: 'You purchase a number of seats for a specific course. Each seat can be allocated to one employee. If an employee no longer needs access, you can revoke the seat and reassign it.',
  },
  {
    q: 'Can I add more seats later?',
    a: 'Yes. You can purchase additional seats at any time from the Purchase Seats page. New seats are added to your existing license instantly.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We accept all major credit and debit cards through Stripe. Invoices are generated automatically with full Italian electronic invoicing (Fattura Elettronica) support.',
  },
  {
    q: 'How do I track employee progress?',
    a: 'Your organization dashboard shows real-time progress for all enrolled employees, including course completion rates, assessment scores, and attendance records.',
  },
  {
    q: 'Is there a minimum number of seats?',
    a: 'No minimum. You can start with as few as one seat and scale up as your needs grow.',
  },
  {
    q: 'Can I try before I buy?',
    a: 'Yes. Many of our courses offer free preview content that you can view without an account. Browse the catalog to see available previews.',
  },
]

export function BusinessPage() {
  const [courses, setCourses] = useState<CatalogCourse[]>([])
  const [isLoadingCourses, setIsLoadingCourses] = useState(true)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    fetchCourses()
  }, [])

  async function fetchCourses() {
    try {
      const response = await catalogApi.getCourses({ limit: 50 })
      setCourses(response.data || [])
    } catch {
      // Catalog might be empty
    } finally {
      setIsLoadingCourses(false)
    }
  }

  const pricedCourses = courses.filter((c) => c.price && Number(c.price) > 0)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="Maka Learning Management Centre" className="h-10 w-auto" />
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">How It Works</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Pricing</a>
              <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Features</a>
              <a href="#faq" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">FAQ</a>
              <Link to="/catalog" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Catalog</Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Sign In
              </Link>
              <Link
                to="/register/organization"
                className="bg-primary-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Register Organization
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary-600 font-semibold mb-4 tracking-wide uppercase text-sm">
              B2B Language Training
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Language Training for Your Team
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Equip your workforce with professional language skills. Purchase seat licenses, assign employees, and track progress — all from one dashboard.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                to="/register/organization"
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/catalog"
                className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary-600 font-semibold mb-2 tracking-wide uppercase text-sm">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Three Steps to Get Started
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 relative">
                  <step.icon className="h-8 w-8 text-primary-600" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary-600 font-semibold mb-2 tracking-wide uppercase text-sm">Pricing</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Per-Seat Pricing
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Pay only for the seats you need. No hidden fees.
            </p>
          </div>

          {isLoadingCourses ? (
            <div className="text-center py-8 text-gray-500">Loading courses...</div>
          ) : pricedCourses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Course pricing will be available soon.</p>
              <Link to="/catalog" className="text-primary-600 hover:text-primary-700 font-medium">
                Browse the catalog
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pricedCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                      {course.courseType === 'LIVE' ? 'Live' : 'Self-Paced'}
                    </span>
                    {course.language && (
                      <span className="text-xs text-gray-500">{course.language}</span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.name}</h3>
                  {course.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                  )}
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      {course.currency || 'EUR'} {Number(course.price).toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">/ seat</span>
                  </div>
                  <Link
                    to={`/catalog/${course.id}`}
                    className="block w-full text-center bg-primary-600 text-white py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    View Course
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary-600 font-semibold mb-2 tracking-wide uppercase text-sm">Features</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-4">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary-600 font-semibold mb-2 tracking-wide uppercase text-sm">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Organizations
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.author} className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{t.quote}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{t.author}</p>
                  <p className="text-sm text-gray-500">{t.role}, {t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary-600 font-semibold mb-2 tracking-wide uppercase text-sm">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="font-medium text-gray-900">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-primary-100 mb-8 max-w-xl mx-auto">
            Register your organization today and start providing language training to your team.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/register/organization"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Register Organization
            </Link>
            <Link
              to="/catalog"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>&copy; {new Date().getFullYear()} Maka Learning Management Centre. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <Link to="/catalog" className="hover:text-white transition-colors">Catalog</Link>
              <Link to="/login" className="hover:text-white transition-colors">Sign In</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
