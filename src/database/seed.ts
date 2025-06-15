
import { databaseService } from '../services/database';
import { Achievement, LearningModule, Lesson } from '../types/database';

// Initial data for the database
const achievements: Achievement[] = [
  {
    id: 'welcome',
    title: 'Welcome to AI Academy',
    description: 'Started your AI learning journey',
    icon: '🎉',
    points: 50,
    criteria: 'sign_up'
  },
  {
    id: 'first-lesson',
    title: 'First Steps',
    description: 'Completed your first lesson',
    icon: '🚀',
    points: 25,
    criteria: 'complete_lesson_1'
  },
  {
    id: 'streak-7',
    title: 'Week Warrior',
    description: 'Maintained a 7-day learning streak',
    icon: '⚡',
    points: 100,
    criteria: 'streak_7_days'
  },
  {
    id: 'module-complete',
    title: 'Module Master',
    description: 'Completed your first module',
    icon: '🏆',
    points: 150,
    criteria: 'complete_module'
  }
];

const learningModules: LearningModule[] = [
  {
    id: 'ai-fundamentals',
    title: 'AI Fundamentals',
    description: 'Introduction to Artificial Intelligence concepts and history',
    icon: '🧠',
    order_index: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning Basics',
    description: 'Core concepts of machine learning and algorithms',
    icon: '🤖',
    order_index: 2,
    created_at: new Date().toISOString()
  },
  {
    id: 'neural-networks',
    title: 'Neural Networks',
    description: 'Deep learning and neural network architectures',
    icon: '🔗',
    order_index: 3,
    created_at: new Date().toISOString()
  }
];

const lessons: Lesson[] = [
  {
    id: 'ai-intro',
    module_id: 'ai-fundamentals',
    title: 'What is Artificial Intelligence?',
    content: 'Artificial Intelligence (AI) is the simulation of human intelligence in machines...',
    order_index: 1,
    estimated_time: 15,
    created_at: new Date().toISOString()
  },
  {
    id: 'ai-history',
    module_id: 'ai-fundamentals',
    title: 'History of AI',
    content: 'The history of AI dates back to ancient civilizations...',
    code_example: 'print("Hello, AI World!")',
    order_index: 2,
    estimated_time: 20,
    created_at: new Date().toISOString()
  },
  {
    id: 'ml-intro',
    module_id: 'machine-learning',
    title: 'Introduction to Machine Learning',
    content: 'Machine Learning is a subset of AI that enables computers to learn...',
    code_example: 'import numpy as np\nimport pandas as pd\n\n# Load data\ndata = pd.read_csv("data.csv")',
    order_index: 1,
    estimated_time: 25,
    created_at: new Date().toISOString()
  }
];

export const seedDatabase = async () => {
  // Seed achievements
  localStorage.setItem('ai_learning_achievements', JSON.stringify(achievements));
  
  // Seed learning modules
  localStorage.setItem('ai_learning_learning_modules', JSON.stringify(learningModules));
  
  // Seed lessons
  localStorage.setItem('ai_learning_lessons', JSON.stringify(lessons));
  
  console.log('Database seeded successfully!');
};

// Auto-seed on first load
if (!localStorage.getItem('ai_learning_seeded')) {
  seedDatabase();
  localStorage.setItem('ai_learning_seeded', 'true');
}
