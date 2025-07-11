import { useState, useEffect } from 'react'

import { User, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'

import { AUTH_COOKIE } from '@/constants/cookies'
import { auth } from '@/lib/firebase'
import { removeCookie } from '@/utils/server-cookies'

import useAppToast from './useToasts'

type FirebaseAuthState = {
  user: User | null
  loading: boolean
  logout: () => Promise<void>
}

export const useFirebaseAuth = (): FirebaseAuthState => {
  const router = useRouter()
  const { success: showSuccessToast, error: showErrorToast } = useAppToast()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const logout = async () => {
    // Sign out from Firebase Auth
    await signOut(auth)
      .then(async () => {
        await removeCookie(AUTH_COOKIE)
        showSuccessToast('Logged out successfully')
        router.push('/login')
      })
      .catch(error => {
        console.error('Logout error:', error)
        showErrorToast('An error occurred during logout')
      })
  }

  return {
    user,
    loading,
    logout
  }
}
