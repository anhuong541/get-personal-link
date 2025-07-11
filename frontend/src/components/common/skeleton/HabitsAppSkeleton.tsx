import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { cn } from '@/utils'

import { CURRENT_MONTH, CURRENT_YEAR, TODAY_NUM } from '@/constants/dayjs'
import { calculateDays, getMonthName } from '@/lib/dayjs'

const days = calculateDays(CURRENT_YEAR, CURRENT_MONTH)
const habits = Array.from({ length: 7 }, (_, i) => i + 1)

export default function HabitAppSkeleton() {
  return (
    <div className="p-2 bg-card shadow-md rounded-md lg:hidden">
      <div className="mx-auto p-4">
        <div className="flex items-center justify-center gap-4 mb-6">
          <button className="p-2">
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <h2 className="text-center w-[150px]">
            {getMonthName(CURRENT_MONTH, 'MMMM')}, {CURRENT_YEAR}
          </h2>
          <button className="p-2">
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-x-auto mb-4">
          <table className="border-collapse table-auto 2xl:w-full w-[1800px]">
            <thead>
              <tr className="text-sm">
                <th className="font-normal p-2 text-left w-[300px] text-primary">Habits</th>
                {days.map(day => (
                  <th
                    key={day.date}
                    className={cn(
                      'p-1 w-10 text-center font-normal',
                      TODAY_NUM === day.date && 'bg-[#FFF3E0] border border-[#FFF3E0]'
                    )}
                  >
                    <p className="text-xs text-gray-400">{day.dayName}</p>
                    <div>{day.date}</div>
                  </th>
                ))}
                <th className="font-semibold p-2 text-center min-w-[80px] text-primary">Goal</th>
                <th className="font-semibold p-2 text-center min-w-[80px] border-l text-primary">
                  Achieved
                </th>
              </tr>
            </thead>

            <tbody>
              {habits.map((_, idx) => {
                return (
                  <tr
                    key={idx}
                    className="animate-pulse"
                  >
                    <td className="w-[350px] bg-secondary h-10" />
                    <td colSpan={days.length + 3}>
                      <div className="flex flex-col space-x-1">
                        <div className="w-full bg-secondary h-10"></div>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
