
import { useEffect, useState } from 'react';
import { databaseService } from '../services/database';
import { User, UserProgress, Achievement } from '../types/database';

export const useDatabase = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        const [userData, userProgress, userAchievements] = await Promise.all([
          databaseService.getUser(userId),
          databaseService.getUserProgress(userId),
          databaseService.getUserAchievements(userId)
        ]);

        setUser(userData);
        setProgress(userProgress);
        setAchievements(userAchievements);
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadUserData();
    }
  }, [userId]);

  const completeLesson = async (lessonId: string, moduleId: string, timeSpent: number = 0) => {
    if (!userId) return;
    
    try {
      const newProgress = await databaseService.completeLesson(userId, lessonId, moduleId, timeSpent);
      setProgress(prev => [...prev, newProgress]);
      
      // Update user points
      if (user) {
        const updatedUser = await databaseService.updateUser(userId, {
          total_points: user.total_points + 10,
          current_streak: user.current_streak + 1,
          last_activity: new Date().toISOString()
        });
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Error completing lesson:', error);
    }
  };

  const unlockAchievement = async (achievementId: string) => {
    if (!userId) return;
    
    try {
      await databaseService.unlockAchievement(userId, achievementId);
      const updatedAchievements = await databaseService.getUserAchievements(userId);
      setAchievements(updatedAchievements);
      
      // Update user points
      if (user) {
        const updatedUser = await databaseService.updateUser(userId, {
          total_points: user.total_points + 25
        });
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Error unlocking achievement:', error);
    }
  };

  return {
    user,
    progress,
    achievements,
    loading,
    completeLesson,
    unlockAchievement,
    databaseService
  };
};
