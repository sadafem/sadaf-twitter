import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { queryClient } from '@/lib/api'
import { LoginForm } from '@/components/auth/LoginForm'
import { RegisterForm } from '@/components/auth/RegisterForm'
import { TweetList } from '@/components/tweets/TweetList'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { authService } from '@/services/auth'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  return user ? <>{children}</> : <Navigate to="/login" />
}

function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await authService.logout()
      logout()
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Error signing out:', error)
      logout()
      navigate('/login', { replace: true })
    }
  }

  return (
    <div className="w-64 min-h-screen border-r border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-twitter-blue">Twitter</h1>
        <ThemeToggle />
      </div>
      <nav className="space-y-4">
        <a href="/home" className="block text-lg text-gray-900 dark:text-white hover:text-twitter-blue dark:hover:text-twitter-blue">Home</a>
        <a href="/explore" className="block text-lg text-gray-900 dark:text-white hover:text-twitter-blue dark:hover:text-twitter-blue">Explore</a>
        <a href="/notifications" className="block text-lg text-gray-900 dark:text-white hover:text-twitter-blue dark:hover:text-twitter-blue">Notifications</a>
        <a href="/messages" className="block text-lg text-gray-900 dark:text-white hover:text-twitter-blue dark:hover:text-twitter-blue">Messages</a>
        <a href="/profile" className="block text-lg text-gray-900 dark:text-white hover:text-twitter-blue dark:hover:text-twitter-blue">Profile</a>
      </nav>
      {user && (
        <div className="mt-8">
          <div className="mb-4">
            <span className="text-gray-900 dark:text-white">Signed in as </span>
            <span className="text-twitter-blue">@{user.username}</span>
          </div>
          <Button
            variant="outline"
            className="w-full text-red-500 hover:text-red-600 hover:bg-red-500/10"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              <div className="max-w-7xl mx-auto">
                <div className="flex">
                  <Sidebar />

                  {/* Main Content */}
                  <div className="flex-1 p-8 bg-white dark:bg-gray-900">
                    <main>
                      <Routes>
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route
                          path="/home"
                          element={
                            <PrivateRoute>
                              <TweetList />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="/"
                          element={<Navigate to="/home" replace />}
                        />
                      </Routes>
                    </main>
                  </div>

                  {/* Right Sidebar */}
                  <div className="w-80 min-h-screen border-l border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Who to follow</h3>
                      {/* Add suggested users here */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
