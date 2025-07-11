'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="h-screen w-screen flex">
      <div className="m-auto bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl transition-transform duration-300">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-center text-primary bg-clip-text">
            What do you like today?
          </h1>
          <div className="space-y-2">
            <Link
              href="/habits"
              className="w-full flex justify-center items-center px-4 py-2 text-sm font-semibold rounded-md text-white bg-primary hover:opacity-80"
            >
              Tracking My Habit
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
