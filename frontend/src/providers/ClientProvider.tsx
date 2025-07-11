'use client'

import { ReactNode } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToggleGlobalProvider } from 'react-toggle-management'

import { Toaster } from '@/components/ui/sonner'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  }
})

export default function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToggleGlobalProvider>
        {children}
        <Toaster />
      </ToggleGlobalProvider>
    </QueryClientProvider>
  )
}
