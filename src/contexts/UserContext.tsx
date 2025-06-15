
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: Date;
  learningPath: string;
  completedLessons: string[];
  achievements: Achievement[];
  currentStreak: number;
  totalPoints: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

interface UserContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  completeLesson: (lessonId: string) => void;
  addAchievement: (achievement: Achievement) => void;
  updateLearningPath: (path: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    // Initialize with demo user data
    return {
      id: 'demo-user',
      name: 'AI Learner',
      email: 'learner@ai-academy.com',
      joinDate: new Date('2024-01-01'),
      learningPath: 'beginner',
      completedLessons: [],
      achievements: [
        {
          id: 'welcome',
          title: 'Welcome to AI Academy',
          description: 'Started your AI learning journey',
          icon: '🎉',
          unlockedAt: new Date()
        }
      ],
      currentStreak: 1,
      totalPoints: 50
    };
  });

  const completeLesson = (lessonId: string) => {
    if (!user) return;
    
    if (!user.completedLessons.includes(lessonId)) {
      const updatedUser = {
        ...user,
        completedLessons: [...user.completedLessons, lessonId],
        totalPoints: user.totalPoints + 10,
        currentStreak: user.currentStreak + 1
      };
      setUser(updatedUser);
      
      // Check for achievements
      if (updatedUser.completedLessons.length === 1) {
        addAchievement({
          id: 'first-lesson',
          title: 'First Steps',
          description: 'Completed your first lesson',
          icon: '🚀',
          unlockedAt: new Date()
        });
      }
    }
  };

  const addAchievement = (achievement: Achievement) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      achievements: [...user.achievements, achievement],
      totalPoints: user.totalPoints + 25
    };
    setUser(updatedUser);
  };

  const updateLearningPath = (path: string) => {
    if (!user) return;
    
    setUser({
      ...user,
      learningPath: path
    });
  };

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      completeLesson,
      addAchievement,
      updateLearningPath
    }}>
      {children}
    </UserContext.Provider>
  );
};
