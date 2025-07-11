import { createContext, useContext } from 'react'

import { CURRENT_MONTH, CURRENT_YEAR } from '@/constants/dayjs'
import { HabitsType } from '@/types/forms'

export const HabitsContext = createContext<{
  habits: HabitsType[]
  setHabits: React.Dispatch<React.SetStateAction<HabitsType[]>>
  habitIndex: number | null
  completedHabits: Record<string, boolean>
  selectYear: number
  selectMonth: number
}>({
  habits: [],
  setHabits: () => {},
  habitIndex: null,
  completedHabits: {},
  selectYear: CURRENT_YEAR,
  selectMonth: CURRENT_MONTH
})

export const useHabitsContext = () => {
  return useContext(HabitsContext)
}
