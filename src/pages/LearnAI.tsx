
import React, { useState } from 'react';
import { Brain, Target, Zap, ArrowRight } from 'lucide-react';
import { MLAlgorithmExplorer } from '../components/MLAlgorithmExplorer';
import { LearningModule } from '../components/LearningModule';
import { learningModules } from '../data/learningContent';
import { Link } from 'react-router-dom';

const LearnAI = () => {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const handleLessonComplete = (moduleId: string, lessonId: string) => {
    const lessonKey = `${moduleId}_${lessonId}`;
    setCompletedLessons(prev => new Set([...prev, lessonKey]));
  };

  const handleCodeExample = (code: string) => {
    // Store code in localStorage to pass to coding area
    localStorage.setItem('sharedCode', code);
    // Navigate to coding area will be handled by Link component
  };

  const getModulesWithProgress = () => {
    return learningModules.map(module => ({
      ...module,
      lessons: module.lessons.map(lesson => ({
        ...lesson,
        completed: completedLessons.has(`${module.id}_${lesson.id}`)
      }))
    }));
  };

  const modulesWithProgress = getModulesWithProgress();
  const totalLessons = modulesWithProgress.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedCount = completedLessons.size;
  const overallProgress = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center">
            <Brain className="w-10 h-10 mr-4 text-cyan-400" />
            Learn AI from Scratch
          </h1>
          
          {/* Introduction Section */}
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-6 border border-cyan-400/30 mb-6">
            <h2 className="text-xl font-semibold text-cyan-400 mb-3">🎓 What is AI Learning?</h2>
            <p className="text-slate-300 mb-4">
              Your comprehensive journey to master Artificial Intelligence through structured, interactive lessons. 
              From basic concepts to advanced neural networks, learn at your own pace with hands-on examples and real-world applications.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-white mb-2">📚 Learning Approach:</h4>
                <ul className="text-slate-300 space-y-1">
                  <li>• Interactive lessons with detailed content</li>
                  <li>• Progressive difficulty levels</li>
                  <li>• Hands-on Python code examples</li>
                  <li>• Real-world case studies and applications</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">🎯 Learning Path:</h4>
                <ul className="text-slate-300 space-y-1">
                  <li>• Start with AI fundamentals and history</li>
                  <li>• Learn data handling and preprocessing</li>
                  <li>• Master machine learning algorithms</li>
                  <li>• Dive deep into neural networks</li>
                </ul>
              </div>
            </div>
            
            {/* Progress Overview */}
            <div className="mt-6 p-4 bg-white/10 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-white">Overall Progress</h4>
                <span className="text-cyan-400 font-semibold">{completedCount}/{totalLessons} lessons</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <p className="text-sm text-slate-300 mt-1">{overallProgress.toFixed(1)}% complete</p>
            </div>
          </div>
        </div>

        {/* ML Algorithm Explorer */}
        <div className="mb-8">
          <MLAlgorithmExplorer />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">📖 Interactive Learning Modules</h2>
              
              <div className="space-y-6">
                {modulesWithProgress.map((module) => (
                  <LearningModule
                    key={module.id}
                    module={module}
                    onLessonComplete={handleLessonComplete}
                    onCodeExample={handleCodeExample}
                  />
                ))}
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <Link 
                  to="/code" 
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  <span>🐍</span>
                  <span>Practice Python Coding</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  to="/datasets" 
                  className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  <span>📊</span>
                  <span>Explore Datasets</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  to="/models" 
                  className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  <span>🤖</span>
                  <span>Try ML Models</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl p-6 border border-cyan-400/30">
              <h3 className="text-lg font-semibold text-cyan-400 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Learning Goals
              </h3>
              <ul className="space-y-3 text-sm text-white">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Understand AI fundamentals and terminology
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Learn different types of machine learning
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Master data preparation techniques
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Build and train your first AI model
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Practice with real datasets and code
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-400/30">
              <h3 className="text-lg font-semibold text-purple-400 mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Quick Tips
              </h3>
              <div className="space-y-3 text-sm text-white">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-medium mb-1">💡 Learn by Doing</p>
                  <p className="text-slate-300">Click "Try Code" buttons to run Python examples in the coding area</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-medium mb-1">🔬 Practice Regularly</p>
                  <p className="text-slate-300">Complete lessons and experiment with code modifications</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-medium mb-1">📊 Apply Knowledge</p>
                  <p className="text-slate-300">Use real datasets to practice what you've learned</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-medium mb-1">🤝 Build Projects</p>
                  <p className="text-slate-300">Combine learning modules to create complete AI applications</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-400/30">
              <h3 className="text-lg font-semibold text-green-400 mb-4">📋 Next Steps</h3>
              <div className="space-y-3 text-sm">
                <p className="text-white">
                  After completing the learning modules:
                </p>
                <ul className="text-slate-300 space-y-2">
                  <li>• Set up a Flask backend for Python execution</li>
                  <li>• Practice with different datasets</li>
                  <li>• Build your first ML project</li>
                  <li>• Join AI communities and forums</li>
                  <li>• Work on real-world problems</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnAI;
