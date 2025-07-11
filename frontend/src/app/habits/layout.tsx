import { ReactNode } from 'react'

import Header from '@/components/layouts/Header'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background h-screen sm:px-4">
      <Header />
      {children}
    </div>
  )
}
