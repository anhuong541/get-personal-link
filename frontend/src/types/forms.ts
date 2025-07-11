export type HabitsType = {
  id: string
  label: string
  tag: string
  created_at: string
  category: string[]
  updated_at: string
  order: number
  description: string
  color: string
  goal: number
}

export type HabitForm = {
  label: string
  tag: string
  category: string[]
  order: number
  description: string
  color: string
  goal: number
}
