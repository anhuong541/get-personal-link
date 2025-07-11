import { cache } from 'react'

import { collection, doc, getDoc, getDocs } from 'firebase/firestore'

import { CURRENT_MONTH, CURRENT_TIMEKEY, CURRENT_YEAR } from '@/constants/dayjs'
import { genCheckingHabitKey } from '@/lib/dayjs'
import { firestore } from '@/lib/firebase'
import { HabitsType } from '@/types/forms'

export const getApiHabits = cache(async (userId: string | undefined) => {
  if (!userId) return []
  const colRef = collection(firestore, 'users', userId, 'habits')
  const snapshot = await getDocs(colRef)
  return (snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as HabitsType[]).toSorted(
    (a: HabitsType, b: HabitsType) => a.order - b.order
  )
})

export const getApiHabitChecking = cache(async (userId: string | undefined, timeKey: string) => {
  if (!userId) return {}
  const docRef = doc(firestore, 'users', userId, 'habits-tracker', timeKey)
  const docSnap = await getDoc(docRef)
  return docSnap.exists() ? docSnap.data() : {}
})

export const hanldeFirstTimeKeyChecking = cache(async (userId: string | undefined) => {
  if (!userId) return { completedHabits: {}, habitsAchieved: {}, habits: [] }
  const habitsAchieved: Record<string, Record<string, number>> = {}
  const completedHabits: Record<string, boolean> = {}
  const [habits, checkingHabit] = await Promise.all([
    getApiHabits(userId),
    getApiHabitChecking(userId, CURRENT_TIMEKEY)
  ])

  const listHabits = habits.map((item: HabitsType) => item.id)
  const dayKeys = Object.keys(checkingHabit)
  for (let index = 0; index < dayKeys.length; index++) {
    const day = dayKeys[index]
    for (let idx = 0; idx < listHabits.length; idx++) {
      const habit = listHabits[idx]
      const key = genCheckingHabitKey(CURRENT_YEAR, CURRENT_MONTH, habit, day)
      if (checkingHabit[day][habit]) {
        completedHabits[key] = true
        if (!habitsAchieved[CURRENT_TIMEKEY]) habitsAchieved[CURRENT_TIMEKEY] = {}
        if (!habitsAchieved[CURRENT_TIMEKEY][habit]) habitsAchieved[CURRENT_TIMEKEY][habit] = 0
        habitsAchieved[CURRENT_TIMEKEY][habit]++
      }
    }
  }
  return { completedHabits, habitsAchieved, habits }
})
