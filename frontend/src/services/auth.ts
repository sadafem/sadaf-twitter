import { API_BASE_URL, ENDPOINTS } from '@/utils/api'

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterCredentials extends LoginCredentials {
  username: string
}

interface AuthResponse {
  user: {
    id: string
    username: string
    email: string
    avatar?: string
  }
  token: string
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.AUTH.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()
      
      if (!response.ok) {
        console.error('Login error response:', data)
        throw new Error(data.message || 'Login failed')
      }

      return data
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Network error. Please check your connection.')
    }
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      console.log('Sending registration request:', credentials)
      console.log(`${API_BASE_URL}${ENDPOINTS.AUTH.REGISTER}`)
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.AUTH.REGISTER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()
      
      if (!response.ok) {
        console.error('Registration error response:', {
          status: response.status,
          statusText: response.statusText,
          data: data,
          validationErrors: data.errors || data.validation || data.detail
        })
        throw new Error(data.message || data.detail || 'Registration failed')
      }

      return data
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Network error. Please check your connection.')
    }
  },

  async logout(): Promise<void> {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        // If no token exists, just clear local storage and return
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        return
      }

      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.AUTH.LOGOUT}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      // Always remove the token and user data, even if the server request fails
      localStorage.removeItem('token')
      localStorage.removeItem('user')

      if (!response.ok) {
        const data = await response.json()
        console.error('Logout error response:', data)
        throw new Error(data.message || 'Logout failed')
      }
    } catch (error) {
      console.error('Logout error:', error)
      // Even if there's an error, we want to clear the local storage
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      throw error
    }
  },
} 