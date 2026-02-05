import { Link } from 'react-router-dom'
import { GraduationCap, Users, Building2, ArrowRight, Globe, Award, Clock, Sparkles, Languages, Target, Play, CheckCircle2 } from 'lucide-react'

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
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=300&fit=crop',
  },
  {
    icon: Award,
    title: 'Expert Teachers',
    description: 'Qualified instructors with years of experience in language education.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Individual and group lessons tailored to your schedule and learning pace.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
  },
]

const stats = [
  { value: '15+', label: 'Languages' },
  { value: '50+', label: 'Expert Teachers' },
  { value: '1000+', label: 'Happy Students' },
  { value: '98%', label: 'Success Rate' },
]

const languages = [
  { name: 'English', flag: '🇬🇧' },
  { name: 'Italian', flag: '🇮🇹' },
  { name: 'French', flag: '🇫🇷' },
  { name: 'German', flag: '🇩🇪' },
  { name: 'Spanish', flag: '🇪🇸' },
  { name: 'Portuguese', flag: '🇵🇹' },
  { name: 'Chinese', flag: '🇨🇳' },
  { name: 'Japanese', flag: '🇯🇵' },
]

const benefits = [
  'Personalized learning paths',
  'Native-speaking instructors',
  'Flexible online & in-person classes',
  'Progress tracking & certificates',
  'Corporate training programs',
  'Small group & 1-on-1 sessions',
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

      {/* Hero Section with Video Background */}
      <section className="relative pt-24 pb-20 overflow-hidden min-h-[90vh] flex items-center">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=1080&fit=crop"
          >
            <source
              src="https://cdn.coverr.co/videos/coverr-students-in-a-classroom-1584/1080p.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/85 to-primary-900/90"></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-400/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-accent-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
                <Sparkles className="h-4 w-4 text-accent-400" />
                <span className="text-accent-300 text-sm font-medium">Professional Language Training</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Master Any Language<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-300">
                  With Confidence
                </span>
              </h1>
              <p className="text-xl text-primary-100 mb-8 leading-relaxed">
                Expert teachers, personalized learning paths, and flexible schedules for individuals and organizations.
              </p>

              {/* Benefits list */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {benefits.slice(0, 4).map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2 text-primary-100">
                    <CheckCircle2 className="h-5 w-5 text-accent-400 flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 flex-wrap">
                <Link
                  to="/register"
                  className="group bg-gradient-to-r from-accent-500 to-accent-400 text-primary-900 px-8 py-4 rounded-full font-bold text-lg hover:from-accent-400 hover:to-accent-300 transition-all shadow-xl shadow-accent-500/30 flex items-center gap-2"
                >
                  Start Learning Today
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#video-section"
                  className="group flex items-center gap-3 text-white font-semibold hover:text-accent-300 transition-colors"
                >
                  <span className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-accent-500/30 transition-colors">
                    <Play className="h-6 w-6 ml-1" />
                  </span>
                  Watch Video
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="hidden lg:block relative">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&h=700&fit=crop"
                  alt="Students learning languages"
                  className="rounded-3xl shadow-2xl"
                />
                {/* Floating card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent-400 to-accent-500 rounded-full flex items-center justify-center">
                      <Languages className="h-6 w-6 text-primary-900" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary-900">15+</p>
                      <p className="text-sm text-primary-600">Languages</p>
                    </div>
                  </div>
                </div>
                {/* Another floating card */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-teacher-500 to-teacher-600 rounded-full flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary-900">50+</p>
                      <p className="text-sm text-primary-600">Teachers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Languages We Teach */}
      <section className="py-12 bg-primary-50 border-y border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <span className="text-primary-600 font-medium">Languages we teach:</span>
            {languages.map((lang) => (
              <div key={lang.name} className="flex items-center gap-2 text-primary-700 hover:text-primary-900 transition-colors">
                <span className="text-2xl">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="video-section" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
              See How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">Transform Learning</span>
            </h2>
            <p className="text-primary-600 max-w-2xl mx-auto text-lg">
              Discover our innovative approach to language education
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary-200">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=675&fit=crop"
                alt="Language learning classroom"
                className="w-full"
              />
              <div className="absolute inset-0 bg-primary-900/40 flex items-center justify-center">
                <button
                  onClick={() => window.open('https://makalanguageconsulting.com', '_blank')}
                  className="group w-24 h-24 rounded-full bg-accent-500 flex items-center justify-center hover:bg-accent-400 transition-all hover:scale-110 shadow-2xl cursor-pointer"
                  aria-label="Learn more about Maka Language Centre"
                >
                  <Play className="h-10 w-10 text-primary-900 ml-1" />
                </button>
              </div>
            </div>

            {/* Decorative images */}
            <div className="hidden md:block absolute -left-16 top-1/2 -translate-y-1/2">
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=200&fit=crop"
                alt="Student studying"
                className="w-32 h-32 rounded-2xl shadow-xl object-cover"
              />
            </div>
            <div className="hidden md:block absolute -right-16 top-1/4">
              <img
                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=200&h=200&fit=crop"
                alt="Online learning"
                className="w-28 h-28 rounded-2xl shadow-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Images */}
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
                className="group bg-white rounded-3xl overflow-hidden shadow-lg shadow-primary-100 hover:shadow-xl hover:shadow-primary-200 transition-all duration-300 border border-primary-100 hover:border-accent-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 w-14 h-14 bg-gradient-to-br from-accent-400 to-accent-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <feature.icon className="h-7 w-7 text-primary-900" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-primary-900 mb-3">{feature.title}</h3>
                  <p className="text-primary-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with Background Image */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&h=600&fit=crop"
            alt="Students studying together"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary-900/85"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-accent-400 mb-2">{stat.value}</div>
                <div className="text-primary-200 text-sm uppercase tracking-wider">{stat.label}</div>
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
                        <CheckCircle2 className={`h-5 w-5 ${portal.textColor} mr-3`} />
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

      {/* Testimonial/Gallery Section */}
      <section className="py-24 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
              Learning in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">Action</span>
            </h2>
            <p className="text-primary-600 max-w-2xl mx-auto text-lg">
              Real moments from our language learning community
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2">
              <img
                src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&h=600&fit=crop"
                alt="Group language class"
                className="w-full h-full object-cover rounded-3xl shadow-lg"
              />
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=300&h=300&fit=crop"
                alt="One-on-one lesson"
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=300&h=300&fit=crop"
                alt="Online learning session"
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=300&h=300&fit=crop"
                alt="Students celebrating"
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&h=300&fit=crop"
                alt="Interactive classroom"
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
            </div>
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
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <img src="/logo.svg" alt="Maka Language Centre" className="h-12 w-auto mb-4" />
              <p className="text-primary-400 mb-4 max-w-md">
                A comprehensive language management system designed and developed by Maka Language Consulting to deliver exceptional language education experiences.
              </p>
              <div className="flex gap-2">
                {languages.slice(0, 5).map((lang) => (
                  <span key={lang.name} className="text-2xl" title={lang.name}>{lang.flag}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/login" className="hover:text-accent-400 transition-colors">Sign In</Link></li>
                <li><Link to="/register" className="hover:text-accent-400 transition-colors">Register</Link></li>
                <li><a href="#portals" className="hover:text-accent-400 transition-colors">Portals</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">For Organizations</h4>
              <ul className="space-y-2">
                <li><Link to="/register?type=corporate" className="hover:text-accent-400 transition-colors">Corporate Training</Link></li>
                <li><a href="#" className="hover:text-accent-400 transition-colors">Group Packages</a></li>
                <li><a href="#" className="hover:text-accent-400 transition-colors">Custom Programs</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-primary-400">
                &copy; {new Date().getFullYear()} Maka Language Centre. All rights reserved.
              </p>
              <p className="text-sm text-primary-500">
                Designed & Developed by <span className="text-accent-400 font-medium">Maka Language Consulting</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
