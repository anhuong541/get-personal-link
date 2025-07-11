export interface HabitTracking {
  [day: number]: {
    [habitKey: string]: boolean;
  };
}
