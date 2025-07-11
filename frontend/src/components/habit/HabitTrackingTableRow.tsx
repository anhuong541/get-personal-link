'use client'

import { Dispatch, memo, useCallback, useMemo, useState } from 'react'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { useToggle } from 'react-toggle-management'

import { cn } from '@/utils'

import { TableCell, TableRow } from '@/components/ui/table'
import { getDateKey } from '@/lib/dayjs'
import { useMutationMarkCheckingHabit } from '@/lib/react-query/queryActions'
import { HabitsType } from '@/types/forms'
import { Day } from '@/types/habit'

import toggleKeys from './constants/toggleKeys'
import HabitAchivedCell from './HabitAchivedCell'
import HabitDayCell from './HabitDayCell'

const TableHabitRow = (props: {
  habit: HabitsType
  habitIndex: number
  days: Day[]
  habitsAchieved: Record<string, Record<string, number>>
  selectCurrentCheckingTime: string
  selectYear: number
  selectMonth: number
  setHabitIndex: Dispatch<React.SetStateAction<number | null>>
  toggleHabit: (habit: HabitsType, check: boolean, date: number) => void
}) => {
  const {
    habit,
    days,
    habitIndex,
    habitsAchieved,
    selectYear,
    selectMonth,
    selectCurrentCheckingTime,
    setHabitIndex,
    toggleHabit
  } = props

  const { open: openEditModal } = useToggle(toggleKeys.editHabitModal)
  const [showDrag, setShowDrag] = useState(false)

  const { mutateAsync: checkHabit } = useMutationMarkCheckingHabit()

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: habit.id
  })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 9999 : 10,
    backgroundColor: isDragging ? `${habit.color}20` : undefined,
    border: isDragging ? `1px solid ${habit.color}` : undefined
  }

  const triggerDayCell = useCallback(
    async (day: Day, check: boolean) => {
      toggleHabit(habit, check, day.date)
      await checkHabit({
        day: day.date,
        habitKey: habit.id,
        timeKey: selectCurrentCheckingTime,
        value: check
      })
    },
    [checkHabit, habit, selectCurrentCheckingTime, toggleHabit]
  )

  const ListHabitCell = useMemo(
    () =>
      days.map(day => (
        <HabitDayCell
          key={day.date}
          day={day}
          onClick={check => triggerDayCell(day, check)}
          isDragging={isDragging}
          habit={habit}
        />
      )),
    [days, habit, isDragging, triggerDayCell]
  )

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn('text-sm hover:bg-gray-100 relative', {
        'border-t': !isDragging
      })}
    >
      <TableCell
        className="p-2 cursor-pointer"
        onClick={() => {
          openEditModal()
          setHabitIndex(habitIndex)
        }}
        onMouseEnter={() => setShowDrag(true)}
        onMouseLeave={() => setShowDrag(false)}
      >
        <div className="flex items-center gap-2">
          {showDrag && (
            <button
              className="cursor-grab active:cursor-grabbing"
              aria-label="Drag to reorder habit row"
              {...listeners}
            >
              <GripVertical size={16} />
            </button>
          )}
          {habit.label}
        </div>
      </TableCell>
      {ListHabitCell}
      <TableCell className="p-2 text-center border-x">{habit.goal ?? 0}</TableCell>
      <TableCell className="p-2 text-center border-l w-[150px]">
        <HabitAchivedCell
          archived={habitsAchieved[getDateKey(selectYear, selectMonth)]?.[habit.id] ?? 0}
          goal={habit.goal ?? 0}
        />
      </TableCell>
    </TableRow>
  )
}

export default memo(TableHabitRow)
