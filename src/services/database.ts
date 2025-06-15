
import { User, UserProgress, Achievement, LearningModule, Lesson, Quiz, QuizAttempt, UserSession } from '../types/database';

// Database interface that can be implemented with SQLite
export interface DatabaseService {
  // User operations
  getUser(id: string): Promise<User | null>;
  createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User>;
  
  // Progress operations
  getUserProgress(userId: string): Promise<UserProgress[]>;
  completeLesson(userId: string, lessonId: string, moduleId: string, timeSpent: number): Promise<UserProgress>;
  
  // Achievement operations
  getUserAchievements(userId: string): Promise<Achievement[]>;
  unlockAchievement(userId: string, achievementId: string): Promise<void>;
  
  // Learning content
  getLearningModules(): Promise<LearningModule[]>;
  getLessons(moduleId: string): Promise<Lesson[]>;
  
  // Quiz operations
  getQuiz(lessonId: string): Promise<Quiz | null>;
  submitQuizAnswer(userId: string, quizId: string, answer: number): Promise<QuizAttempt>;
  
  // Analytics
  createSession(userId: string): Promise<UserSession>;
  updateSession(sessionId: string, updates: Partial<UserSession>): Promise<UserSession>;
}

// Mock implementation using localStorage (temporary until SQLite backend is ready)
export class MockDatabaseService implements DatabaseService {
  private getStorageKey(key: string): string {
    return `ai_learning_${key}`;
  }

  private getData<T>(key: string): T[] {
    const data = localStorage.getItem(this.getStorageKey(key));
    return data ? JSON.parse(data) : [];
  }

  private setData<T>(key: string, data: T[]): void {
    localStorage.setItem(this.getStorageKey(key), JSON.stringify(data));
  }

  async getUser(id: string): Promise<User | null> {
    const users = this.getData<User>('users');
    return users.find(user => user.id === id) || null;
  }

  async createUser(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    const users = this.getData<User>('users');
    const user: User = {
      ...userData,
      id: `user_${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    users.push(user);
    this.setData('users', users);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const users = this.getData<User>('users');
    const index = users.findIndex(user => user.id === id);
    if (index === -1) throw new Error('User not found');
    
    users[index] = { ...users[index], ...updates, updated_at: new Date().toISOString() };
    this.setData('users', users);
    return users[index];
  }

  async getUserProgress(userId: string): Promise<UserProgress[]> {
    const progress = this.getData<UserProgress>('user_progress');
    return progress.filter(p => p.user_id === userId);
  }

  async completeLesson(userId: string, lessonId: string, moduleId: string, timeSpent: number): Promise<UserProgress> {
    const progress = this.getData<UserProgress>('user_progress');
    const existing = progress.find(p => p.user_id === userId && p.lesson_id === lessonId);
    
    if (existing) {
      return existing;
    }

    const newProgress: UserProgress = {
      id: `progress_${Date.now()}`,
      user_id: userId,
      lesson_id: lessonId,
      module_id: moduleId,
      completed_at: new Date().toISOString(),
      time_spent: timeSpent
    };

    progress.push(newProgress);
    this.setData('user_progress', progress);
    return newProgress;
  }

  async getUserAchievements(userId: string): Promise<Achievement[]> {
    const userAchievements = this.getData<{ user_id: string; achievement_id: string }>('user_achievements');
    const achievements = this.getData<Achievement>('achievements');
    
    const userAchievementIds = userAchievements
      .filter(ua => ua.user_id === userId)
      .map(ua => ua.achievement_id);
    
    return achievements.filter(a => userAchievementIds.includes(a.id));
  }

  async unlockAchievement(userId: string, achievementId: string): Promise<void> {
    const userAchievements = this.getData<{ user_id: string; achievement_id: string; unlocked_at: string }>('user_achievements');
    const existing = userAchievements.find(ua => ua.user_id === userId && ua.achievement_id === achievementId);
    
    if (!existing) {
      userAchievements.push({
        user_id: userId,
        achievement_id: achievementId,
        unlocked_at: new Date().toISOString()
      });
      this.setData('user_achievements', userAchievements);
    }
  }

  async getLearningModules(): Promise<LearningModule[]> {
    return this.getData<LearningModule>('learning_modules');
  }

  async getLessons(moduleId: string): Promise<Lesson[]> {
    const lessons = this.getData<Lesson>('lessons');
    return lessons.filter(lesson => lesson.module_id === moduleId);
  }

  async getQuiz(lessonId: string): Promise<Quiz | null> {
    const quizzes = this.getData<Quiz>('quizzes');
    return quizzes.find(quiz => quiz.lesson_id === lessonId) || null;
  }

  async submitQuizAnswer(userId: string, quizId: string, answer: number): Promise<QuizAttempt> {
    const quizzes = this.getData<Quiz>('quizzes');
    const quiz = quizzes.find(q => q.id === quizId);
    if (!quiz) throw new Error('Quiz not found');

    const attempt: QuizAttempt = {
      id: `attempt_${Date.now()}`,
      user_id: userId,
      quiz_id: quizId,
      selected_answer: answer,
      is_correct: answer === quiz.correct_answer,
      attempted_at: new Date().toISOString()
    };

    const attempts = this.getData<QuizAttempt>('quiz_attempts');
    attempts.push(attempt);
    this.setData('quiz_attempts', attempts);
    return attempt;
  }

  async createSession(userId: string): Promise<UserSession> {
    const sessions = this.getData<UserSession>('user_sessions');
    const session: UserSession = {
      id: `session_${Date.now()}`,
      user_id: userId,
      started_at: new Date().toISOString(),
      lessons_completed: 0,
      time_spent: 0
    };
    
    sessions.push(session);
    this.setData('user_sessions', sessions);
    return session;
  }

  async updateSession(sessionId: string, updates: Partial<UserSession>): Promise<UserSession> {
    const sessions = this.getData<UserSession>('user_sessions');
    const index = sessions.findIndex(s => s.id === sessionId);
    if (index === -1) throw new Error('Session not found');
    
    sessions[index] = { ...sessions[index], ...updates };
    this.setData('user_sessions', sessions);
    return sessions[index];
  }
}

// Singleton instance
export const databaseService = new MockDatabaseService();
