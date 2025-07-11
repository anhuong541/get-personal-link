export interface Habit {
  id: string;
  label: string;
  description?: string;
  goal: number;
  color?: string;
  icon?: string;
  order?: number;
  created_at: string;
  updated_at: string;
}
