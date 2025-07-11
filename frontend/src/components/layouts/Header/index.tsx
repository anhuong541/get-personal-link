'use client'

import { useRouter } from 'next/navigation'

import { ProductivityType } from '@/types'

import Avatar from './Avatar'
import SelectAppDropdown from './SelectAppDropdown'

const productivityMainHeader: Record<ProductivityType, { title: string }> = {
  habits: { title: 'Habit Tracking' },
  financial: { title: 'Financial Tracking' }
}

const keys = Object.keys(productivityMainHeader) as ProductivityType[]
const dropdownOptions = keys.map(key => ({
  label: productivityMainHeader[key].title,
  value: key
}))

export default function Header() {
  const router = useRouter()

  const handleOptionSelect = (value: string) => {
    setTimeout(() => {
      router.push('/' + value)
    })
  }

  return (
    <header className="relative h-14 md:h-16 flex items-center justify-between mx-auto px-4 md:px-0">
      <div className="flex">
        <div className="hidden md:block" />
      </div>

      <div className="absolute top-3 md:top-4 left-1/2 -translate-x-1/2 flex items-center">
        <h1 className="text-lg md:text-2xl font-bold flex items-center gap-1">
          <span className="text-primary">
            <span className="hidden sm:inline">Habit Tracking</span>
            <span className="sm:hidden">Habit Tracking</span>
          </span>
          App
        </h1>
      </div>

      <div className="flex items-center justify-end space-x-2 md:space-x-4">
        {/* Mobile dropdown for app selection */}
        <div className="sm:hidden">
          <SelectAppDropdown
            options={dropdownOptions}
            onSelect={handleOptionSelect}
            label=""
          />
        </div>

        {/* streaks */}
        {/* <div className="flex items-center justify-center gap-1 px-3 py-2 bg-yellow-100 rounded-full">
          <Flame className="text-red-500 w-6 h-6" />
          <p className="font-bold text-sm text-red-500 mr-1">2</p>
        </div> */}

        {/*  // TODO: Update Streacks and user profile on this. 
        //  The upgrade is gather all user profile on the info */}

        <Avatar />
      </div>
    </header>
  )
}
