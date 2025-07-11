import dayjs from 'dayjs'

import { DAYS_NAME } from '@/components/habit/constants/configs'
import { Day } from '@/types/habit'

export const getMonthName = (monthNum: number, format: string) => {
  return dayjs().month(monthNum).format(format)
}

export const firebastDataFormat = (date: Date) => {
  const format = 'MMMM D, YYYY [at] h:mm:ss A [UTC]Z'
  return dayjs(date).format(format)
}

export const getDateKey = (year: number, month: number): string => {
  const result = `${year}-${getMonthName(month, 'MMM')}`
  return result
}

export const calculateDays = (selectYear: number, selectMonth: number) => {
  const startDate = dayjs(`${selectYear}-${selectMonth + 1}-1`)
  const daysInMonth = startDate.daysInMonth()
  const generatedDays: Day[] = []
  for (let i = 1; i <= daysInMonth; i++) {
    const date = startDate.date(i)
    generatedDays.push({
      date: i,
      dayName: DAYS_NAME[date.day()]
    })
  }
  return generatedDays
}

export const genCheckingHabitKey = (
  CURRENT_YEAR: number,
  CURRENT_MONTH: number,
  habit: string,
  day: string | number
) => `${CURRENT_YEAR}-${CURRENT_MONTH}-${habit}-${day}`
