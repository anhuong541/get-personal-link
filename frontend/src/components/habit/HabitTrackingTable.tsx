'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'

import { DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import cloneDeep from 'lodash/cloneDeep'
import map from 'lodash/map'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import dynamic from 'next/dynamic'

import { cn } from '@/utils'

import HabitAppSkeleton from '@/components/common/skeleton/HabitsAppSkeleton'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CURRENT_MONTH, CURRENT_TIMEKEY, CURRENT_YEAR, TODAY_NUM } from '@/constants/dayjs'
import { HabitsContext } from '@/contexts/HabitsContext'
import useReadFirstMount from '@/hooks/useFirstMount'
import { getMonthName, getDateKey, calculateDays, genCheckingHabitKey } from '@/lib/dayjs'
import {
  useMutationUpdateHabitsOrder,
  useQueryCheckingUserHabit
} from '@/lib/react-query/queryActions'
import { HabitsType } from '@/types/forms'
import { Day } from '@/types/habit'

import TableHabitRow from './HabitTrackingTableRow'
import AddHabitModal from './modals/AddHabitModal'
import EditHabitModal from './modals/EditHabitModal'

type Props = {
  habits: HabitsType[]
  checkingHabtis: {
    completedHabits: Record<string, boolean>
    habitsAchieved: Record<string, Record<string, number>>
  }
}

const DragHabitTableProvider = dynamic(() => import('./DragHabitTableProvider'), {
  ssr: false,
  loading: () => (
    <div className="lg:block hidden">
      <HabitAppSkeleton />
    </div>
  )
})

const HabitTrackingTable = ({ habits: listHabit, checkingHabtis }: Props) => {
  const { isMount } = useReadFirstMount()
  const [habits, setHabits] = useState<HabitsType[]>(listHabit)
  const [completedHabits, setCompletedHabits] = useState<Record<string, boolean>>(
    checkingHabtis.completedHabits
  )
  const [habitsAchieved, setHabitsAchieved] = useState<Record<string, Record<string, number>>>(
    checkingHabtis.habitsAchieved
  )
  const [selectMonth, setSelectMonth] = useState(CURRENT_MONTH)
  const [selectYear, setSelectYear] = useState(CURRENT_YEAR)
  const [habitIndex, setHabitIndex] = useState<number | null>(null)
  const [checkKey, setCheckKey] = useState<Record<string, boolean>>({
    [CURRENT_TIMEKEY]: true
  })

  const selectCurrentCheckingTime = useMemo(
    () => getDateKey(selectYear, selectMonth),
    [selectMonth, selectYear]
  )

  const { data: checkingHabit } = useQueryCheckingUserHabit(selectCurrentCheckingTime, checkKey)
  const { mutate: updateHabitsOrder } = useMutationUpdateHabitsOrder()

  const days: Day[] = useMemo(
    () => calculateDays(selectYear, selectMonth),
    [selectMonth, selectYear]
  )

  const updateArchived = useCallback(
    (habitId: string, month: number, year: number, type: 'plus' | 'minus') => {
      const dateKey = getDateKey(year, month)
      setHabitsAchieved(prev => {
        // duplicate action twice but still oke on production
        if (!prev[dateKey]) prev[dateKey] = {}
        if (!prev[dateKey][habitId]) prev[dateKey][habitId] = 0

        if (type === 'plus') {
          prev[dateKey][habitId]++
        } else if (type === 'minus' && prev[dateKey][habitId] > 0) {
          prev[dateKey][habitId]--
        }
        return prev
      })
    },
    []
  )

  const toggleHabit = useCallback(
    (habit: HabitsType, check: boolean, date: number) => {
      const key = genCheckingHabitKey(selectYear, selectMonth, habit.id, date)
      updateArchived(habit.id, selectMonth, selectYear, check ? 'plus' : 'minus')
      setCompletedHabits(prev => {
        prev[key] = check
        return prev
      })
    },
    [selectMonth, selectYear, updateArchived]
  )

  const increaseMonth = () => {
    setSelectMonth(prev => (prev === 11 ? 0 : prev + 1))
    if (selectMonth === 11) setSelectYear(prev => prev + 1)
  }

  const decreaseMonth = () => {
    setSelectMonth(prev => (prev === 0 ? 11 : prev - 1))
    if (selectMonth === 0) setSelectYear(prev => prev - 1)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      let newHabitsUpdated: HabitsType[] = []
      setHabits(items => {
        const oldIndex = items.findIndex(item => item.id === active.id)
        const newIndex = items.findIndex(item => item.id === over.id)
        const newIteams = arrayMove(items, oldIndex, newIndex)
        newHabitsUpdated = newIteams
        return newIteams
      })

      updateHabitsOrder(newHabitsUpdated)
    }
  }

  useEffect(() => {
    // checking habits
    if (checkingHabit && !checkKey[selectCurrentCheckingTime]) {
      const listHabits = map(habits, (item: HabitsType) => item.id)
      const dayKeys = Object.keys(checkingHabit)
      setCompletedHabits(prev => {
        const newCompleteHabits = cloneDeep(prev)
        dayKeys.forEach(day => {
          listHabits.forEach((habit: string) => {
            const key = genCheckingHabitKey(selectYear, selectMonth, habit, day)
            if (checkingHabit[day][habit]) {
              newCompleteHabits[key] = true
              updateArchived(habit, selectMonth, selectYear, 'plus')
            }
          })
        })
        return newCompleteHabits
      })
      setCheckKey(prev => ({
        ...prev,
        [selectCurrentCheckingTime]: true
      }))
    }
  }, [
    checkKey,
    checkingHabit,
    completedHabits,
    habits,
    selectCurrentCheckingTime,
    selectMonth,
    selectYear,
    updateArchived
  ])

  const habitsContextValue = useMemo(
    () => ({
      habits,
      setHabits,
      habitIndex,
      completedHabits,
      selectYear,
      selectMonth
    }),
    [completedHabits, habitIndex, habits, selectYear, selectMonth]
  )

  const DaysHeaderMemo = useMemo(
    () =>
      map(days, day => {
        return (
          <TableHead
            key={day.date}
            className={cn(
              'p-1 w-10 text-center font-normal',
              TODAY_NUM === day.date && 'bg-[#FFF3E0] border border-[#FFF3E0]'
            )}
          >
            <p className="text-xs text-gray-400">{day.dayName}</p>
            <div>{day.date}</div>
          </TableHead>
        )
      }),
    [days]
  )

  if (!isMount)
    return (
      <div className="lg:block hidden">
        <HabitAppSkeleton />
      </div>
    )

  return (
    <div className="p-2 m-auto bg-primary-foreground shadow-md rounded-md lg:block hidden">
      <HabitsContext value={habitsContextValue}>
        <div className="mx-auto p-4">
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              className="p-2"
              onClick={decreaseMonth}
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <h2 className="text-center w-[150px]">
              {getMonthName(selectMonth, 'MMMM')}, {selectYear}
            </h2>
            <button
              className="p-2"
              onClick={increaseMonth}
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>

          <DragHabitTableProvider handleDragEnd={handleDragEnd}>
            <div className="overflow-x-auto mb-4">
              <Table className="w-[1800px] 2xl:w-full">
                <TableHeader>
                  <TableRow className="text-sm">
                    <TableHead className="font-normal p-2 text-left max-w-[300px] text-primary">
                      Habits
                    </TableHead>
                    {DaysHeaderMemo}
                    <TableHead className="font-semibold p-2 text-center min-w-[80px] text-primary">
                      Goal
                    </TableHead>
                    <TableHead className="font-semibold p-2 text-center min-w-[80px] border-l text-primary">
                      Achieved
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <SortableContext
                    items={habits}
                    strategy={verticalListSortingStrategy}
                  >
                    {map(habits, (habit: HabitsType, index: number) => (
                      <TableHabitRow
                        habit={habit}
                        habitIndex={index}
                        days={days}
                        habitsAchieved={habitsAchieved}
                        selectCurrentCheckingTime={selectCurrentCheckingTime}
                        selectMonth={selectMonth}
                        selectYear={selectYear}
                        setHabitIndex={setHabitIndex}
                        toggleHabit={toggleHabit}
                        key={habit.id}
                      />
                    ))}
                  </SortableContext>
                </TableBody>
              </Table>
            </div>
          </DragHabitTableProvider>

          {/* Modals */}
          <EditHabitModal />
          <AddHabitModal />
        </div>
      </HabitsContext>
    </div>
  )
}

export default HabitTrackingTable
