'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  User as FirebaseUser
} from 'firebase/auth'
import { auth } from '@/lib/firebase'
import apiClient from '@/lib/api-client'
import { toast } from 'sonner'

interface User {
  userId: string
  email: string
  firstName: string
  lastName: string
  role: 'photographer' | 'client' | 'guest' | 'admin'
  businessName?: string
  subscriptionTier: string
  limits: any
  currentUsage: any
}

interface AuthContextType {
  user: User | null
  firebaseUser: FirebaseUser | null
  loading: boolean
  error: string | null
  signInWithEmail: (email: string, password: string) => Promise<void>
  signInWithGoogle: (role?: string) => Promise<void>
  signUpWithEmail: (email: string, password: string, userData: any) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Role-based redirect mapping
  const getRoleDashboard = (role: string) => {
    const dashboards = {
      photographer: '/dashboard',
      admin: '/admin',
      client: '/client',
      guest: '/guest'
    }
    return dashboards[role as keyof typeof dashboards] || '/dashboard'
  }

  // Store session in localStorage and cookie
  const storeSession = (userData: User, token: string) => {
    setUser(userData)

    // Store in localStorage
    localStorage.setItem('photopedia:auth', JSON.stringify({
      user: userData,
      timestamp: Date.now(),
      expiresAt: Date.now() + 3600000 // 1 hour
    }))

    // Store in cookie for middleware
    document.cookie = `auth-token=${token}; path=/; max-age=3600; SameSite=Strict`
  }

  // Clear session
  const clearSession = () => {
    setUser(null)
    setFirebaseUser(null)
    localStorage.removeItem('photopedia:auth')
    document.cookie = 'auth-token=; path=/; max-age=0'
  }

  // Fetch user data from backend
  const fetchUserData = async () => {
    try {
      const response = await apiClient.get('/auth/me')
      return response.data.user
    } catch (error) {
      console.error('Failed to fetch user:', error)
      return null
    }
  }

  // Refresh user data
  const refreshUser = async () => {
    const userData = await fetchUserData()
    if (userData) {
      setUser(userData)
    }
  }

  // Sign in with email and password
  const signInWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)

      // Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const idToken = await userCredential.user.getIdToken()

      // Verify with backend and get user data
      const response = await apiClient.post('/auth/login')
      const userData = response.data.user

      // Store session
      storeSession(userData, idToken)

      toast.success(`Welcome back, ${userData.firstName}!`)

      // Redirect to role-based dashboard
      router.push(getRoleDashboard(userData.role))
    } catch (err: any) {
      const errorMessage = handleAuthError(err)
      setError(errorMessage)
      toast.error(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Sign up with email and password
  const signUpWithEmail = async (
    email: string,
    password: string,
    userData: { firstName: string; lastName: string; role: string; phone?: string }
  ) => {
    try {
      setLoading(true)
      setError(null)

      // Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const idToken = await userCredential.user.getIdToken()

      // Register with backend (creates DynamoDB record)
      const response = await apiClient.post('/auth/register', {
        email,
        password,
        ...userData
      })

      const newUser = response.data.user

      // Store session
      storeSession(newUser, idToken)

      toast.success('Account created successfully! Welcome to PhotoPedia.')

      // Redirect to role-based dashboard
      router.push(getRoleDashboard(newUser.role))
    } catch (err: any) {
      const errorMessage = handleAuthError(err)
      setError(errorMessage)
      toast.error(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Sign in with Google
  const signInWithGoogle = async (role?: string) => {
    try {
      setLoading(true)
      setError(null)

      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({
        prompt: 'select_account'
      })

      // Sign in with popup
      const result = await signInWithPopup(auth, provider)
      const idToken = await result.user.getIdToken()

      // Call backend to create/get user
      const response = await apiClient.post('/auth/google-signin', {
        idToken,
        role: role || 'photographer'
      })

      const userData = response.data.user
      const isNewUser = response.data.isNewUser

      // Store session
      storeSession(userData, idToken)

      toast.success(isNewUser ? 'Account created!' : `Welcome back, ${userData.firstName}!`)

      // Redirect to role-based dashboard
      router.push(getRoleDashboard(userData.role))
    } catch (err: any) {
      const errorMessage = handleAuthError(err)
      setError(errorMessage)
      toast.error(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Sign out
  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
      clearSession()
      toast.success('Signed out successfully')
      router.push('/login')
    } catch (err: any) {
      const errorMessage = handleAuthError(err)
      setError(errorMessage)
      toast.error(errorMessage)
    }
  }

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email, {
        url: `${window.location.origin}/login`,
        handleCodeInApp: false
      })
      toast.success('Password reset email sent! Check your inbox.')
    } catch (err: any) {
      const errorMessage = handleAuthError(err)
      setError(errorMessage)
      toast.error(errorMessage)
      throw err
    }
  }

  // Error handler
  const handleAuthError = (error: any): string => {
    if (error.code) {
      const firebaseErrors: Record<string, string> = {
        'auth/user-not-found': 'No account found with this email',
        'auth/wrong-password': 'Incorrect password',
        'auth/email-already-in-use': 'An account with this email already exists',
        'auth/weak-password': 'Password should be at least 6 characters',
        'auth/invalid-email': 'Invalid email address',
        'auth/popup-closed-by-user': 'Sign-in cancelled',
        'auth/network-request-failed': 'Network error. Please check your connection',
        'auth/too-many-requests': 'Too many attempts. Please try again later',
      }
      return firebaseErrors[error.code] || error.message
    }

    if (error.response) {
      return error.response.data?.message || 'An error occurred'
    }

    return error.message || 'An unexpected error occurred'
  }

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setFirebaseUser(firebaseUser)

        // Fetch full user data from backend
        const userData = await fetchUserData()
        if (userData) {
          const token = await firebaseUser.getIdToken()
          storeSession(userData, token)
        }
      } else {
        clearSession()
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  // Restore session on mount
  useEffect(() => {
    const stored = localStorage.getItem('photopedia:auth')
    if (stored) {
      try {
        const { user: storedUser, expiresAt } = JSON.parse(stored)
        if (Date.now() < expiresAt) {
          setUser(storedUser)
        } else {
          localStorage.removeItem('photopedia:auth')
        }
      } catch (error) {
        localStorage.removeItem('photopedia:auth')
      }
    }
  }, [])

  const value = {
    user,
    firebaseUser,
    loading,
    error,
    signInWithEmail,
    signInWithGoogle,
    signUpWithEmail,
    signOut,
    resetPassword,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
