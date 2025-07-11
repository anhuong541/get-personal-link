import { Analytics } from '@vercel/analytics/react'
import { Montserrat } from 'next/font/google'

import { cn } from '@/utils'

import Provider from '@/providers/Provider'

import type { Metadata } from 'next'

import './globals.css'

const montserrat = Montserrat({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: ['500', '400', '700', '600', '100', '300', '200', '800', '900']
})

export const metadata: Metadata = {
  title: 'Personal ADHD Productivity Tracking',
  description: 'Personal ADHD Productivity Tracking'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={cn(montserrat.className, 'antialiased')}>
        <Provider>{children}</Provider>
        <Analytics />
      </body>
    </html>
  )
}
