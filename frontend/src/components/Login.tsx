'use client'

import { signInWithPopup } from 'firebase/auth'
import { LayoutDashboard } from 'lucide-react'
import { useRouter } from 'next/navigation'

import GmailIcon from '@/components/icons/GmailIcon'
import { AUTH_COOKIE } from '@/constants/cookies'
import useAppToast from '@/hooks/useToasts'
import { auth, googleProvider } from '@/lib/firebase'
import { createCookie } from '@/utils/server-cookies'

export default function Login() {
  const router = useRouter()
  const { error: showErrorToast, success: showSuccessToast } = useAppToast()

  const handleGoogleSignIn = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider)
      await createCookie(AUTH_COOKIE, res.user.uid)
      showSuccessToast('Google login successful! Redirecting...')
      router.push(`/habits`)
    } catch (error) {
      console.error('Google Sign-In Error:', error)
      showErrorToast('Google sign-in failed. Please try again.')
    }
  }

  return (
    <div className="h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full flex flex-col gap-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary flex items-center justify-center">
            <LayoutDashboard className="h-8 w-8 text-white m-auto" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-gray-600">
            Sign in to access your{' '}
            <strong className="font-semibold text-primary">Productivity Tracking</strong>
          </p>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-sm font-semibold rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <GmailIcon />
          Continue with Google
        </button>
      </div>
    </div>
  )
}
