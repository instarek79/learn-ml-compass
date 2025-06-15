
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Rocket, Target, Brain, Code } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
}

export const OnboardingWizard: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPath, setSelectedPath] = useState('');
  const [userName, setUserName] = useState('');
  const { user, setUser, updateLearningPath } = useUser();

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to AI Academy! 🎉',
      description: 'Your journey into artificial intelligence starts here',
      content: (
        <div className="text-center space-y-6">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
            <Brain className="w-16 h-16 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Ready to learn AI?</h3>
            <p className="text-slate-300 mb-6">
              Join thousands of learners mastering artificial intelligence through hands-on experience,
              interactive lessons, and real-world projects.
            </p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="bg-slate-800 rounded-lg p-4">
                <Rocket className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <p className="text-white font-semibold">Interactive Learning</p>
              </div>
              <div className="bg-slate-800 rounded-lg p-4">
                <Code className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="text-white font-semibold">Hands-on Coding</p>
              </div>
              <div className="bg-slate-800 rounded-lg p-4">
                <Target className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="text-white font-semibold">Real Projects</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'profile',
      title: 'Tell us about yourself',
      description: 'Help us personalize your learning experience',
      content: (
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
              What should we call you?
            </label>
            <input
              type="text"
              id="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter your name"
            />
          </div>
        </div>
      )
    },
    {
      id: 'path',
      title: 'Choose your learning path',
      description: 'Select the path that best matches your current level',
      content: (
        <div className="space-y-4">
          {[
            {
              id: 'beginner',
              title: 'Complete Beginner',
              description: 'New to AI and programming',
              icon: '🌱',
              duration: '8-12 weeks'
            },
            {
              id: 'intermediate',
              title: 'Some Experience',
              description: 'Know programming, new to AI',
              icon: '🚀',
              duration: '6-8 weeks'
            },
            {
              id: 'advanced',
              title: 'Advanced Learner',
              description: 'Have AI knowledge, want to deepen skills',
              icon: '⚡',
              duration: '4-6 weeks'
            }
          ].map((path) => (
            <div
              key={path.id}
              onClick={() => setSelectedPath(path.id)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedPath === path.id
                  ? 'border-cyan-400 bg-cyan-500/10'
                  : 'border-slate-600 bg-slate-800 hover:border-slate-500'
              }`}
            >
              <div className="flex items-start space-x-4">
                <span className="text-3xl">{path.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">{path.title}</h3>
                  <p className="text-slate-300 text-sm mb-2">{path.description}</p>
                  <p className="text-cyan-400 text-xs">Estimated time: {path.duration}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'ready',
      title: 'You\'re all set! 🎯',
      description: 'Time to start your AI learning journey',
      content: (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
            <Target className="w-12 h-12 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Welcome aboard, {userName || 'AI Learner'}! 🎉
            </h3>
            <p className="text-slate-300 mb-6">
              Your personalized learning path is ready. You'll start with foundational concepts
              and gradually work your way up to advanced AI techniques.
            </p>
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg p-4 border border-cyan-400/30">
              <h4 className="font-semibold text-cyan-400 mb-2">Your Learning Path: {selectedPath}</h4>
              <p className="text-sm text-slate-300">
                We've curated the perfect sequence of lessons, projects, and exercises for your level.
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      if (user && userName) {
        setUser({
          ...user,
          name: userName
        });
      }
      if (selectedPath) {
        updateLearningPath(selectedPath);
      }
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (steps[currentStep].id) {
      case 'profile':
        return userName.trim().length > 0;
      case 'path':
        return selectedPath !== '';
      default:
        return true;
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 max-w-2xl w-full border border-slate-700">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-slate-400">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-slate-400">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">{currentStepData.title}</h2>
          <p className="text-slate-300 mb-6">{currentStepData.description}</p>
          {currentStepData.content}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center space-x-2 px-4 py-2 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-600 text-white px-6 py-2 rounded-lg transition-all disabled:cursor-not-allowed"
          >
            <span>{currentStep === steps.length - 1 ? 'Get Started' : 'Next'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
