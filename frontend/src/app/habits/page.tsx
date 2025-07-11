import { Metadata } from 'next'
import { cookies } from 'next/headers'

import HabitTrackingTable from '@/components/habit/HabitTrackingTable'
import { hanldeFirstTimeKeyChecking } from '@/components/habit/services/server-side-habit'
import { AUTH_COOKIE } from '@/constants/cookies'

export const metadata: Metadata = {
  title: 'Habit Tracking App',
  description: 'Personal Habit Tracking Page for ADHD people'
}

export default async function HabitPage() {
  const cookiesStore = await cookies()
  const { habits, ...checkingHabtis } = await hanldeFirstTimeKeyChecking(
    cookiesStore.get(AUTH_COOKIE)?.value
  )

  return (
    <div className="h-screen">
      <HabitTrackingTable
        habits={habits}
        checkingHabtis={checkingHabtis}
      />
    </div>
  )
}
