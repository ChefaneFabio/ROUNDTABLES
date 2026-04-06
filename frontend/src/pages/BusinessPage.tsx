import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Users,
  ClipboardCheck,
  BarChart3,
  BookOpen,
  GraduationCap,
  Globe,
  FileText,
  ChevronDown,
  ChevronUp,
  Star,
  Video,
  Headphones,
  PenTool,
  Mic,
  Calendar,
  Download,
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
    icon: ClipboardCheck,
    title: 'Assess',
    description: 'We deploy a Versant-aligned placement test to your employees. 4 skills assessed (Reading, Listening, Writing, Speaking) with results mapped to CEFR levels A1-C2. HR monitors results in real-time.',
  },
  {
    icon: BookOpen,
    title: 'Train',
    description: 'Based on assessment results, we design tailored training programs. Live lessons via Zoom, Meet, or Teams. In-person sessions at your offices. Roundtables for conversation practice.',
  },
  {
    icon: BarChart3,
    title: 'Monitor',
    description: 'HR tracks every employee\'s progress through a dedicated dashboard. Export results to Excel, download PDF reports, and re-assess periodically to measure improvement.',
  },
]

const features = [
  { icon: ClipboardCheck, title: 'Placement Testing', description: 'Versant-style 4-skill assessment (R/L/W/S) with CEFR and GSE scoring.' },
  { icon: BarChart3, title: 'HR Dashboard', description: 'Real-time per-skill progress tracking for every employee.' },
  { icon: Video, title: 'Remote Training', description: 'Live lessons via Zoom, Google Meet, or Microsoft Teams with automated links.' },
  { icon: GraduationCap, title: 'CEFR-Aligned (A1-C2)', description: 'All courses and assessments follow the Common European Framework.' },
  { icon: Globe, title: '5 Languages', description: 'English, French, German, Spanish, and Italian training available.' },
  { icon: Download, title: 'Excel & PDF Export', description: 'Export assessment results and progress reports for internal reporting.' },
  { icon: Calendar, title: 'Lesson Scheduling', description: 'Conflict detection, automated reminders, and attendance tracking.' },
  { icon: Users, title: 'Roundtables', description: 'Group conversation sessions for real-world language practice.' },
  { icon: FileText, title: 'Italian Invoicing', description: 'Full support for Fattura Elettronica, SDI, and PEC billing.' },
]

const testimonials = [
  {
    quote: 'The placement test gave us an immediate, objective snapshot of our team\'s language levels. The training program that followed was precisely targeted.',
    author: 'Maria R.',
    role: 'HR Director',
    company: 'TechCorp Italy',
  },
  {
    quote: 'Being able to export Excel reports and track progress in real-time made it easy to justify the training investment to management.',
    author: 'Luca B.',
    role: 'Training Manager',
    company: 'EuroFinance',
  },
  {
    quote: 'The Zoom-based lessons fit perfectly into our employees\' schedules. Maka handled everything from scheduling to reminders.',
    author: 'Sofia M.',
    role: 'Operations Lead',
    company: 'Global Logistics',
  },
]

const faqs = [
  {
    q: 'How does the placement test work?',
    a: 'We assign a Versant-aligned placement test that assesses 4 skills: Reading, Listening, Writing, and Speaking. Results are mapped to CEFR levels (A1-C2) and GSE scores. HR can monitor all employees in real-time from the dashboard.',
  },
  {
    q: 'What languages do you offer?',
    a: 'We currently offer training and assessment in English, French, German, Spanish, and Italian. Each language follows the same CEFR-aligned methodology.',
  },
  {
    q: 'Can lessons be held remotely?',
    a: 'Yes. We support live lessons via Zoom, Google Meet, and Microsoft Teams. Meeting links are generated automatically and sent to all participants. In-person training is also available.',
  },
  {
    q: 'How does HR track employee progress?',
    a: 'Your HR dashboard shows real-time progress for all enrolled employees, including per-skill assessment scores, lesson attendance, and overall CEFR level advancement. Results can be exported to Excel or downloaded as PDF reports.',
  },
  {
    q: 'What are Roundtables?',
    a: 'Roundtables are facilitated group conversation sessions where employees practice speaking in a structured but relaxed environment. Topics are voted on in advance, and sessions are led by qualified trainers.',
  },
  {
    q: 'How do I get started?',
    a: 'Contact us to schedule a demo. We will walk you through the placement test, training options, and HR monitoring tools. We can typically set up your first assessment within a few days.',
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
            <Link to="/" className="flex items-center gap-3">
              <img src="/favicon.webp" alt="Maka" className="h-9 w-9 rounded-full" />
              <span className="text-sm font-bold text-gray-900">MAKA <span className="font-normal text-gray-500">Language Consulting</span></span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">How It Works</a>
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
                className="bg-gray-900 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Request a Demo
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-24 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-400 font-semibold mb-4 tracking-widest uppercase text-sm">
              Corporate Language Training & Assessment
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Assess, Train, and Monitor Your Team's Language Skills
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Versant-aligned placement tests, live training via Zoom/Meet/Teams, and a real-time HR dashboard with Excel and PDF exports. Five languages, all CEFR levels.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                to="/register/organization"
                className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                Request a Demo
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/catalog"
                className="border-2 border-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Browse Courses
              </Link>
            </div>
            <div className="flex gap-6 justify-center mt-10">
              {[
                { icon: BookOpen, label: 'Reading' },
                { icon: Headphones, label: 'Listening' },
                { icon: PenTool, label: 'Writing' },
                { icon: Mic, label: 'Speaking' },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-2 text-sm text-gray-400">
                  <s.icon className="w-4 h-4" />
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gray-500 font-semibold mb-2 tracking-widest uppercase text-sm">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              From Assessment to Training in 3 Steps
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 relative">
                  <step.icon className="h-8 w-8 text-gray-700" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
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
            <p className="text-gray-500 font-semibold mb-2 tracking-widest uppercase text-sm">Pricing</p>
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
            <p className="text-gray-500 font-semibold mb-2 tracking-widest uppercase text-sm">Features</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything HR Needs
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="h-6 w-6 text-gray-700" />
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
            <p className="text-gray-500 font-semibold mb-2 tracking-widest uppercase text-sm">Testimonials</p>
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
            <p className="text-gray-500 font-semibold mb-2 tracking-widest uppercase text-sm">FAQ</p>
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
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to assess and train your team?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Contact us to schedule a demo. We will walk you through the placement test, training options, and HR monitoring tools.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/register/organization"
              className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Request a Demo
            </Link>
            <Link
              to="/catalog"
              className="border-2 border-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
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
            <p>&copy; {new Date().getFullYear()} Maka Language Consulting. All rights reserved.</p>
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
