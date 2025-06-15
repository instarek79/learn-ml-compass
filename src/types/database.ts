
// SQLite Database Schema Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
  learning_path: string;
  current_streak: number;
  total_points: number;
  last_activity: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  module_id: string;
  completed_at: string;
  time_spent: number;
  score?: number;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  criteria: string;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  order_index: number;
  created_at: string;
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  content: string;
  code_example?: string;
  order_index: number;
  estimated_time: number;
  created_at: string;
}

export interface Quiz {
  id: string;
  lesson_id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
}

export interface QuizAttempt {
  id: string;
  user_id: string;
  quiz_id: string;
  selected_answer: number;
  is_correct: boolean;
  attempted_at: string;
}

export interface UserSession {
  id: string;
  user_id: string;
  started_at: string;
  ended_at?: string;
  lessons_completed: number;
  time_spent: number;
}
