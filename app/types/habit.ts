export interface Habit {
  id: string;
  usuario: string;
  nombre: string;
  categoria?: string | null;
  tipo_habito?: string | null;
  objetivo: number;
  actual: number;
  meta_unidad?: string | null;
  frecuencia?: string | null;
  icono?: string | null;
  racha_actual: number;
  racha_record: number;
  color?: string;
  creado_en?: string;
  completed_dates: string[];
  last_reset?: string; // Añadir este campo
}

export type UpdateData = {
  actual: number;
  completed_dates: string[];
}

// Tipo para la creación de nuevos hábitos
export interface NewHabit {
  nombre: string;
  objetivo: number;
  meta_unidad?: string;
  frecuencia?: string;
  icono?: string;
  categoria?: string;
}
export interface HabitFormData {
  name: string;
  category: 'health' | 'productivity' | 'wellbeing';
  daily_goal: number;
}

export interface DailyProgress {
  date: string;
  habits: {
    habit_id: string;
    completed: boolean;
    quantity?: number;
  }[];
}

export interface ProgressUpdate {
  date: string;
  completed: boolean;
  quantity?: number;
}

export interface Achievement {
  id: number;
  name: string;
  icon: string;
  description: string;
  progress?: number;
  unlocked: boolean;
}

export interface AchievementsData {
  unlocked: Achievement[];
  locked: Achievement[];
  streak: number;
  nextReward: {
    name: string;
    daysLeft: number;
  };
}