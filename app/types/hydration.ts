export interface HydrationData {
  today_record?: {
    amount: number;
    goal?: number;
  };
  stats?: {
    current_streak: number;
    longest_streak: number;
  };
  reminders?: Array<{
    time: string;
    is_active: boolean;
  }>;
}