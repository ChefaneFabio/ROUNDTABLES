import { Link } from 'react-router-dom'
import {
  ArrowRight, ClipboardCheck, BookOpen, Headphones, PenTool, Mic,
  Building2, Users, BarChart3, MapPin, Video, Calendar, FileText,
  CheckCircle, Globe, Award
} from 'lucide-react'

const CORE_SERVICES = [
  {
    icon: ClipboardCheck,
    title: 'Placement Testing',
    description: 'Versant-aligned 4-skill assessment (Reading, Listening, Writing, Speaking) to determine CEFR level from A1 to C2. Results in real-time for HR.',
    color: 'bg-slate-100 text-slate-700',
  },
  {
    icon: Video,
    title: 'Live Remote Training',
    description: 'One-to-one and group lessons via Zoom, Meet, or Teams. Automated meeting links, lesson reminders, and attendance tracking.',
    color: 'bg-blue-50 text-blue-700',
  },
  {
    icon: MapPin,
    title: 'In-Person Training',
    description: 'Face-to-face lessons at your offices or our locations. Location sharing via Google Maps, integrated scheduling.',
    color: 'bg-amber-50 text-amber-700',
  },
  {
    icon: Users,
    title: 'Roundtables',
    description: 'Group conversation sessions for language practice. Topic voting, facilitated discussions, peer learning in a collaborative environment.',
    color: 'bg-purple-50 text-purple-700',
  },
]

const PLATFORM_FEATURES = [
  { icon: BarChart3, text: 'Real-time HR dashboard with per-skill progress tracking' },
  { icon: FileText, text: 'Excel and PDF export of assessment results for client reporting' },
  { icon: Calendar, text: 'Lesson scheduling with conflict detection and automated reminders' },
  { icon: Globe, text: 'Multi-language support: English, French, German, Spanish, Italian' },
  { icon: Award, text: 'CEFR-aligned scoring with GSE equivalents (Versant/Pearson compatible)' },
  { icon: BookOpen, text: 'Course materials, exercises, and resources attached to each lesson' },
]

const SKILLS = [
  { icon: BookOpen, label: 'Reading', color: 'text-blue-600' },
  { icon: Headphones, label: 'Listening', color: 'text-green-600' },
  { icon: PenTool, label: 'Writing', color: 'text-amber-600' },
  { icon: Mic, label: 'Speaking', color: 'text-purple-600' },
]

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center gap-3">
              <img src="/favicon.webp" alt="Maka" className="h-9 w-9 rounded-full" />
              <span className="text-sm font-bold text-gray-900">MAKA <span className="font-normal text-gray-500">Language Consulting</span></span>
            </div>
            <nav className="hidden md:flex items-center gap-8 text-sm">
              <a href="#services" className="text-gray-600 hover:text-gray-900 font-medium">Services</a>
              <a href="#platform" className="text-gray-600 hover:text-gray-900 font-medium">Platform</a>
              <a href="#assessment" className="text-gray-600 hover:text-gray-900 font-medium">Assessment</a>
              <Link to="/business" className="text-gray-600 hover:text-gray-900 font-medium">For Business</Link>
            </nav>
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm text-gray-700 hover:text-gray-900 font-medium">Sign In</Link>
              <Link to="/business" className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800">
                Request a Demo
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-20">
        <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">
                Maka Language Consulting
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Corporate Language Training & Assessment Platform
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
                We help companies assess and train their employees' language skills. Placement tests, live training (remote and in-person), and real-time progress monitoring — all in one platform.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link
                  to="/business"
                  className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  Request a Demo <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/login"
                  className="border border-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
                >
                  Sign In to Platform
                </Link>
              </div>

              {/* 4 Skills visual */}
              <div className="flex gap-4 mt-10">
                {SKILLS.map(s => (
                  <div key={s.label} className="flex items-center gap-2 text-sm text-gray-400">
                    <s.icon className={`w-4 h-4 ${s.color}`} />
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">What We Do</p>
            <h2 className="text-3xl font-bold text-gray-900">
              End-to-End Language Training for Companies
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {CORE_SERVICES.map(service => (
              <div key={service.title} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-4`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works for companies */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">How It Works</p>
            <h2 className="text-3xl font-bold text-gray-900">
              From Assessment to Training in 3 Steps
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Assess',
                description: 'We assign a Versant-style placement test to your employees. 4 skills assessed: Reading, Listening, Writing, Speaking. Results available in real-time on your HR dashboard.',
                icon: ClipboardCheck,
              },
              {
                step: '02',
                title: 'Train',
                description: 'Based on results, we create personalized training programs. Live lessons (remote or in-person), roundtables for conversation practice, self-paced materials when needed.',
                icon: BookOpen,
              },
              {
                step: '03',
                title: 'Monitor',
                description: 'HR follows every employee\'s progress in real-time. Export reports in Excel, download PDF certificates. Re-assess periodically to measure improvement.',
                icon: BarChart3,
              },
            ].map(item => (
              <div key={item.step} className="relative">
                <div className="text-6xl font-black text-gray-100 mb-4">{item.step}</div>
                <div className="flex items-center gap-3 mb-3">
                  <item.icon className="w-5 h-5 text-gray-700" />
                  <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment section */}
      <section id="assessment" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">Placement Test</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Versant-Aligned Assessment
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our placement test follows the Versant/Pearson standard. Students are assessed on 4 skills across all CEFR levels (A1-C2).
                Results map to GSE scores and are immediately available to HR.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  'Adaptive difficulty — test adjusts based on student performance',
                  'Bilingual instructions (English + Italian)',
                  'Students can pause, save progress, and resume later',
                  'HR monitors all employees in real-time',
                  'Export results to Excel or download PDF reports',
                  'Level-specific tests (A1-C2) also available',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-gray-700 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/business"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800"
              >
                Request Assessment Demo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Test Structure</h3>
              <div className="space-y-4">
                {[
                  { icon: BookOpen, label: 'Reading & Language Use', time: '25 min', questions: '20 questions', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                  { icon: Headphones, label: 'Listening', time: '15 min', questions: '8 questions', color: 'bg-green-50 text-green-700 border-green-200' },
                  { icon: PenTool, label: 'Writing', time: '15 min', questions: '3 prompts', color: 'bg-amber-50 text-amber-700 border-amber-200' },
                  { icon: Mic, label: 'Speaking', time: '15 min', questions: '3 recordings', color: 'bg-purple-50 text-purple-700 border-purple-200' },
                ].map(section => (
                  <div key={section.label} className={`flex items-center gap-4 p-4 rounded-xl border ${section.color}`}>
                    <section.icon className="w-5 h-5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{section.label}</p>
                    </div>
                    <div className="text-right text-xs">
                      <p className="font-medium">{section.time}</p>
                      <p className="opacity-70">{section.questions}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-500">Total: ~70 minutes &middot; CEFR A1-C2 &middot; GSE 10-90</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform features */}
      <section id="platform" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">Platform</p>
            <h2 className="text-3xl font-bold text-gray-900">
              Everything HR Needs to Manage Language Training
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PLATFORM_FEATURES.map((feature, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-200">
                <feature.icon className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three portals */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">Access</p>
            <h2 className="text-3xl font-bold text-gray-900">Three Dedicated Portals</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Building2, title: 'HR / Company', desc: 'Monitor employee assessments in real-time. View per-skill progress, export results, download reports.', href: '/business', color: 'bg-gray-900 text-white' },
              { icon: Users, title: 'Students', desc: 'Take placement tests, attend lessons, view results and certificates. Pause and resume anytime.', href: '/login', color: 'bg-gray-100 text-gray-900' },
              { icon: Award, title: 'Teachers', desc: 'Manage lessons, review assessments, score writing and speaking, track student progress.', href: '/login', color: 'bg-gray-100 text-gray-900' },
            ].map(portal => (
              <Link key={portal.title} to={portal.href} className="group">
                <div className={`${portal.color} rounded-xl p-6 h-full transition-all hover:shadow-lg`}>
                  <portal.icon className="w-8 h-8 mb-4 opacity-70" />
                  <h3 className="text-lg font-bold mb-2">{portal.title}</h3>
                  <p className="text-sm opacity-80 leading-relaxed">{portal.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium opacity-70 group-hover:opacity-100">
                    Access Portal <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to assess and train your team?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Contact us to set up placement tests for your employees and start a tailored language training program.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/business" className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Request a Demo
            </Link>
            <Link to="/login" className="border border-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img src="/favicon.webp" alt="Maka" className="h-7 w-7 rounded-full" />
              <span className="text-sm">&copy; {new Date().getFullYear()} Maka Language Consulting</span>
            </div>
            <div className="flex gap-6 text-sm">
              <Link to="/login" className="hover:text-white">Sign In</Link>
              <Link to="/business" className="hover:text-white">For Business</Link>
              <Link to="/catalog" className="hover:text-white">Course Catalog</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
