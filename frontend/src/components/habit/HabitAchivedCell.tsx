import { useMemo } from 'react'

import { cn } from '@/utils'

interface HabitTrackerProps {
  archived: number
  goal: number
}

const HabitAchivedCell: React.FC<HabitTrackerProps> = ({ archived, goal }) => {
  const progress = useMemo(() => Math.min((archived / goal) * 100, 100), [archived, goal])
  const isCloseToGoal = useMemo(() => progress > 75, [progress])

  const motivationalMessage = useMemo(() => {
    if (progress === 100) {
      return 'You did it! 🎉'
    } else if (progress > 75) {
      return 'You’re on fire! 🔥'
    } else if (progress > 50) {
      return 'Halfway there! Keep it up!'
    } else {
      return null
    }
  }, [progress])

  return (
    <div className="flex flex-col text-center w-full whitespace-nowrap">
      <div className="bg-gray-300 rounded-md overflow-hidden">
        <div
          className="h-2 bg-orange-500 rounded transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      {motivationalMessage && (
        <div
          className={cn(`mt-1 text-xs transition-all duration-500`, {
            'text-orange-600 drop-shadow-[0_0_10px_rgb(255,87,34),0_0_20px_rgb(255,152,0)]':
              isCloseToGoal
          })}
        >
          <p>{motivationalMessage}</p>
        </div>
      )}
    </div>
  )
}

export default HabitAchivedCell
