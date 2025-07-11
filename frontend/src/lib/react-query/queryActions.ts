'use client'

import { useQuery, useMutation } from '@tanstack/react-query'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  writeBatch
} from 'firebase/firestore'

import { toKebabCase } from '@/utils'

import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { HabitForm, HabitsType } from '@/types/forms'

import { queryKeys } from './queryKeys'
import { firestore } from '../firebase'

// Queries
export const useQueryUserHabits = () => {
  const { user } = useFirebaseAuth()

  return useQuery({
    enabled: !!user?.uid,
    queryKey: [queryKeys.listUserHabits, user?.uid],
    queryFn: async () => {
      if (user?.uid) {
        const colRef = collection(firestore, 'users', user.uid, 'habits')
        const snapshot = await getDocs(colRef)
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      }
    }
  })
}

export const useQueryCheckingUserHabit = (
  timeKey: string,
  checkKey: { [key: string]: boolean }
) => {
  const { user } = useFirebaseAuth()

  return useQuery({
    enabled: !!user?.uid && !checkKey[timeKey],
    queryKey: [queryKeys.checkingHabits, user?.uid, timeKey],
    queryFn: async () => {
      if (!user?.uid) return {}
      const docRef = doc(firestore, 'users', user.uid, 'habits-tracker', timeKey)
      const docSnap = await getDoc(docRef)
      return docSnap.exists() ? docSnap.data() : {}
      // const res = await bffServerUrl.get(`/habits-checking/${user?.uid}/${timeKey}`)
      // return res.data.data
    }
  })
}

// Habit Mutations
export const useMutationMarkCheckingHabit = () => {
  const { user } = useFirebaseAuth()

  return useMutation({
    mutationFn: async ({
      day,
      habitKey,
      value,
      timeKey
    }: {
      day: number
      habitKey: string
      value: boolean
      timeKey: string
    }) => {
      if (user?.uid) {
        const docRef = doc(firestore, 'users', user.uid, 'habits-tracker', timeKey)
        const docSnap = await getDoc(docRef)
        const fieldPath = `${day}.${habitKey}`

        if (docSnap.exists()) {
          await updateDoc(docRef, { [fieldPath]: value })
        } else {
          await setDoc(docRef, { [day]: { [habitKey]: value } })
        }
      }
    }
  })
}

export const useMutationAddNewHabit = () => {
  const { user } = useFirebaseAuth()

  return useMutation({
    mutationFn: async (habit: HabitForm) => {
      if (user?.uid) {
        const habitId = toKebabCase(habit.label)
        const docRef = doc(firestore, 'users', user.uid, 'habits', habitId)

        await setDoc(docRef, {
          ...habit,
          id: habitId,
          goal: Number(habit.goal),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
      }
    }
  })
}

export const useMutationEditHabit = () => {
  const { user } = useFirebaseAuth()

  return useMutation({
    mutationFn: async ({ habit, habitId }: { habit: HabitForm; habitId: string }) => {
      if (user?.uid) {
        const docRef = doc(firestore, 'users', user.uid, 'habits', habitId)

        await updateDoc(docRef, {
          ...habit,
          id: habitId,
          goal: Number(habit.goal),
          updated_at: new Date().toISOString()
        })
      }
    }
  })
}

export const useMutationDeleteHabit = () => {
  const { user } = useFirebaseAuth()

  return useMutation({
    mutationFn: async (habitId: string) => {
      if (user?.uid) {
        const docRef = doc(firestore, 'users', user.uid, 'habits', habitId)
        await deleteDoc(docRef)
      }
    }
  })
}

export const useMutationUpdateHabitsOrder = () => {
  const { user } = useFirebaseAuth()

  return useMutation({
    mutationFn: async (habits: HabitsType[]) => {
      if (user?.uid) {
        const batch = writeBatch(firestore)
        habits.forEach((habit, habitIndex) => {
          const habitDocRef = doc(firestore, 'users', user.uid, 'habits', habit.id)
          batch.update(habitDocRef, { order: habitIndex + 1 })
        })
        await batch.commit()
      }
    }
  })
}
