import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { authService } from '@/services/auth'
import { useAppDispatch } from '@/store/hooks'
import { login } from '@/store/authSlice'

export function RegisterForm() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = (username: string, email: string, password: string) => {
    // Username validation: letters and numbers only, 3-20 characters
    const usernamePattern = /^[a-zA-Z0-9]{3,20}$/
    if (!usernamePattern.test(username)) {
      setError('Username must be 3-20 characters and can only contain letters and numbers')
      return false
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address')
      return false
    }

    // Password validation: at least 6 characters
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const username = formData.get('username') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!validateForm(username, email, password)) {
      setIsLoading(false)
      return
    }

    try {
      const response = await authService.register({ username, email, password })
      localStorage.setItem('token', response.token)
      dispatch(login(response.user))
      navigate('/')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Registration failed. Please check your connection and try again.')
      }
      console.error('Registration error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Create an Account</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">
            Username
          </label>
          <Input
            id="username"
            name="username"
            type="text"
            required
            className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
            placeholder="Enter your Username"
            pattern="[a-zA-Z0-9]{3,20}"
            title="Username must be 3-20 characters and can only contain letters and numbers"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
            placeholder="Enter your Password"
            minLength={6}
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <Button
          type="submit"
          className="w-full bg-twitter-blue hover:bg-twitter-blue/70 text-white"
          disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Register'}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
        Already have an account?{' '}
        <a
          href="/login"
          className="text-twitter-blue hover:underline"
        >
          Login
        </a>
      </p>
    </div>
  )
} 