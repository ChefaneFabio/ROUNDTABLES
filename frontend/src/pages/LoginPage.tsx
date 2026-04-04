import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/common/Button'
import { Alert } from '../components/common/Alert'

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
})

type FormData = yup.InferType<typeof schema>

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const from = (location.state as any)?.from?.pathname || '/'

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const fillDemo = (email: string) => {
    setValue('email', email, { shouldValidate: true })
    setValue('password', 'demo123', { shouldValidate: true })
  }

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true)
      setError('')
      await login(data.email, data.password)
      navigate(from, { replace: true })
    } catch (err: any) {
      setError(err.message || 'Failed to login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/40 to-indigo-50/30 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex flex-col items-center">
          <img src="/favicon.webp" alt="Maka" className="h-20 w-20 rounded-full shadow-xl" />
        </div>
        <h2 className="mt-4 text-center text-3xl font-bold bg-gradient-to-r from-gray-900 via-primary-700 to-primary-600 bg-clip-text text-transparent">
          Sign in to MAKA LMC
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          New to Maka LMC?{' '}
          <Link
            to="/register"
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            Register here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/80 backdrop-blur-xl py-8 px-4 shadow-2xl border border-white/20 rounded-2xl sm:px-10">
          {error && (
            <Alert
              type="error"
              message={error}
              onClose={() => setError('')}
              className="mb-6"
            />
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="label">
                Email address
              </label>
              <input
                {...register('email')}
                type="email"
                autoComplete="email"
                className={`input focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-shadow ${errors.email ? 'input-error' : ''}`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="label">
                Password
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className={`input pr-10 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-shadow ${errors.password ? 'input-error' : ''}`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isLoading}
            >
              Sign in
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white/80 text-gray-400 text-xs uppercase tracking-wider font-medium">Quick demo access</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => fillDemo('admin@demo.com')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60 hover:bg-indigo-100 hover:border-indigo-300 transition-all duration-150 hover:shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                Admin
              </button>
              <button
                type="button"
                onClick={() => fillDemo('teacher@demo.com')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 hover:bg-emerald-100 hover:border-emerald-300 transition-all duration-150 hover:shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Teacher
              </button>
              <button
                type="button"
                onClick={() => fillDemo('student@demo.com')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/60 hover:bg-amber-100 hover:border-amber-300 transition-all duration-150 hover:shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Student
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-gray-400">
              Click a role to auto-fill credentials (password: demo123)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
