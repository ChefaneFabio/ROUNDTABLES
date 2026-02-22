import { useState, useEffect, FormEvent } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import {
  ShoppingCart,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  CreditCard,
  Loader2,
} from 'lucide-react'
import { catalogApi } from '../../services/organizationApi'
import { stripeApi } from '../../services/stripeApi'

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || ''
)

interface CatalogCourse {
  id: string
  name: string
  description?: string
  price?: number
  currency: string
  courseType: string
}

function PurchaseForm({ course, initialSeats }: { course: CatalogCourse; initialSeats: number }) {
  const stripe = useStripe()
  const elements = useElements()
  const [seats, setSeats] = useState(initialSeats)
  const [step, setStep] = useState<'configure' | 'payment' | 'success' | 'error'>('configure')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [, setClientSecret] = useState<string | null>(null)
  const [, setPaymentDetails] = useState<any>(null)

  const pricePerSeat = course.price || 0
  const total = seats * pricePerSeat
  const currency = course.currency || 'EUR'

  async function handleReview() {
    if (seats < 1) return
    setStep('payment')
  }

  async function handleSubmitPayment(e: FormEvent) {
    e.preventDefault()
    if (!stripe || !elements) return

    setIsProcessing(true)
    setError(null)

    try {
      // Create payment intent
      const intent = await stripeApi.createPaymentIntent(course.id, seats)
      setClientSecret(intent.clientSecret)
      setPaymentDetails(intent)

      // Confirm card payment
      const cardElement = elements.getElement(CardElement)
      if (!cardElement) throw new Error('Card element not found')

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        intent.clientSecret,
        { payment_method: { card: cardElement } }
      )

      if (stripeError) {
        setError(stripeError.message || 'Payment failed')
        setIsProcessing(false)
        return
      }

      if (paymentIntent?.status === 'succeeded') {
        setStep('success')
      } else {
        setError('Payment was not completed. Please try again.')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during payment')
    } finally {
      setIsProcessing(false)
    }
  }

  if (step === 'success') {
    return (
      <div className="text-center py-12">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful</h2>
        <p className="text-gray-600 mb-6">
          {seats} seat license{seats > 1 ? 's' : ''} for <strong>{course.name}</strong> have been provisioned.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/org/seats"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Manage Seat Allocations
          </Link>
          <Link
            to="/org/dashboard"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Course Info */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">{course.name}</h2>
        {course.description && (
          <p className="text-gray-600 text-sm mb-3">{course.description}</p>
        )}
        <p className="text-lg font-bold text-primary-600">
          {currency} {pricePerSeat.toFixed(2)} per seat
        </p>
      </div>

      {step === 'configure' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Configure Purchase</h3>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Seats
            </label>
            <input
              type="number"
              min={1}
              max={1000}
              value={seats}
              onChange={(e) => setSeats(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{seats} seat{seats > 1 ? 's' : ''} x {currency} {pricePerSeat.toFixed(2)}</span>
              <span>{currency} {total.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold text-gray-900">
              <span>Total</span>
              <span>{currency} {total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleReview}
            disabled={seats < 1 || pricePerSeat <= 0}
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <CreditCard className="h-5 w-5" />
            Proceed to Payment
          </button>
        </div>
      )}

      {step === 'payment' && (
        <form onSubmit={handleSubmitPayment} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>{course.name}</span>
              <span>{seats} seat{seats > 1 ? 's' : ''}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-semibold text-gray-900">
              <span>Total</span>
              <span>{currency} {total.toFixed(2)}</span>
            </div>
          </div>

          {/* Card Element */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Information
            </label>
            <div className="border border-gray-300 rounded-lg p-4">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#1f2937',
                      '::placeholder': { color: '#9ca3af' },
                    },
                    invalid: { color: '#ef4444' },
                  },
                }}
              />
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => { setStep('configure'); setError(null) }}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!stripe || isProcessing}
              className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-5 w-5" />
                  Pay {currency} {total.toFixed(2)}
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default function OrgPurchasePage() {
  const [searchParams] = useSearchParams()
  const preselectedCourseId = searchParams.get('courseId')
  const [courses, setCourses] = useState<CatalogCourse[]>([])
  const [selectedCourse, setSelectedCourse] = useState<CatalogCourse | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCourses()
  }, [])

  async function fetchCourses() {
    try {
      const response = await catalogApi.getCourses({ limit: 100 })
      const courseList = response.data || []
      setCourses(courseList)

      if (preselectedCourseId) {
        const match = courseList.find((c: CatalogCourse) => c.id === preselectedCourseId)
        if (match) setSelectedCourse(match)
      }
    } catch (err) {
      console.error('Failed to fetch courses:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          to="/org/dashboard"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <ShoppingCart className="h-6 w-6 text-primary-600" />
          Purchase Seat Licenses
        </h1>
        <p className="text-gray-600 mt-1">
          Buy seat licenses for your organization's employees.
        </p>
      </div>

      {!selectedCourse ? (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select a Course</h2>
          {courses.length === 0 ? (
            <p className="text-gray-500">No courses available in the catalog.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {courses
                .filter((c) => c.price && Number(c.price) > 0)
                .map((course) => (
                  <button
                    key={course.id}
                    onClick={() => setSelectedCourse(course)}
                    className="text-left bg-white rounded-lg shadow-md p-5 border border-gray-200 hover:border-primary-400 hover:shadow-lg transition-all"
                  >
                    <h3 className="font-semibold text-gray-900 mb-1">{course.name}</h3>
                    {course.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>
                    )}
                    <p className="text-lg font-bold text-primary-600">
                      {course.currency || 'EUR'} {Number(course.price).toFixed(2)} / seat
                    </p>
                  </button>
                ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedCourse(null)}
            className="text-sm text-gray-600 hover:text-gray-900 mb-4 inline-flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Choose a different course
          </button>

          <Elements stripe={stripePromise}>
            <PurchaseForm course={selectedCourse} initialSeats={1} />
          </Elements>
        </div>
      )}
    </div>
  )
}
