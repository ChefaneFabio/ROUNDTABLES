import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const stripeApi = {
  async createPaymentIntent(courseId: string, seats: number): Promise<{
    clientSecret: string
    paymentIntentId: string
    amount: number
    currency: string
    courseName: string
    seats: number
    pricePerSeat: number
  }> {
    const response = await api.post('/stripe/create-payment-intent', { courseId, seats })
    return response.data.data
  },

  async getPaymentHistory(): Promise<any[]> {
    const response = await api.get('/stripe/payment-history')
    return response.data.data || []
  },
}
