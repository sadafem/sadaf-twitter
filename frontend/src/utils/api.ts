import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

// API base URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// API endpoints
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/signup',
    LOGOUT: '/auth/logout',
  },
  TWEETS: {
    LIST: '/tweets',
    CREATE: '/tweets',
    UPDATE: (id: string) => `/tweets/${id}`,
    DELETE: (id: string) => `/tweets/${id}`,
    LIKE: (id: string) => `/tweets/${id}/like`,
  },
  USERS: {
    PROFILE: '/users/profile',
    FOLLOW: (id: string) => `/users/${id}/follow`,
    UNFOLLOW: (id: string) => `/users/${id}/unfollow`,
  },
} 