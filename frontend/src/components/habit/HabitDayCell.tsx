import React, { FC, memo, useEffect } from 'react'

import { CheckIcon } from 'lucide-react'
import { useToggle } from 'react-toggle-management'

import { cn } from '@/utils'

import { TableCell } from '@/components/ui/table'
import { TODAY_NUM } from '@/constants/dayjs'
import { useHabitsContext } from '@/contexts/HabitsContext'
import { genCheckingHabitKey } from '@/lib/dayjs'
import { HabitsType } from '@/types/forms'

interface HabitDayCellProps {
  day: {
    date: number
    dayName: string
  }
  onClick?: (check: boolean) => void
  className?: string
  isDragging?: boolean
  habit: HabitsType
}

const HabitDayCell: FC<HabitDayCellProps> = props => {
  const { day, className, isDragging, onClick = () => {}, habit } = props
  const { completedHabits, selectMonth, selectYear } = useHabitsContext()

  const { isOpen, open, close, toggle } = useToggle(
    `habit-checking-${genCheckingHabitKey(selectYear, selectMonth, habit.id, day.date)}`
  )

  useEffect(() => {
    if (completedHabits?.[genCheckingHabitKey(selectYear, selectMonth, habit.id, day.date)]) {
      open()
    } else {
      close()
    }
  }, [completedHabits, day.date, habit.id, selectMonth, selectYear, open, close])

  return (
    <TableCell
      className={cn(
        'text-center border-l w-10 cursor-pointer border-b',
        TODAY_NUM === day.date && 'border-x border-gray-300',
        className
      )}
      style={{
        backgroundColor: isOpen ? habit.color : !isDragging ? '#fff' : `${habit.color}20`
      }}
      onClick={() => {
        onClick(!isOpen)
        toggle()
      }}
    >
      <div className="h-10 mx-auto rounded flex items-center justify-center">
        {isOpen && <CheckIcon className="w-4 h-4 text-white" />}
      </div>
    </TableCell>
  )
}

export default memo(HabitDayCell)
