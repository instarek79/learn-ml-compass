
import React, { useState } from 'react';
import { Minimap } from '../components/Minimap';
import { StatsCard } from '../components/StatsCard';
import { UserProfile } from '../components/UserProfile';
import { OnboardingWizard } from '../components/OnboardingWizard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BookOpen, Database, Settings, Target, TrendingUp, Users, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const Dashboard = () => {
  const { user } = useUser();
  const [showOnboarding, setShowOnboarding] = useState(!user?.completedLessons.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs />
        
        {/* Header with Introduction */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome back, {user?.name || 'AI Learner'}! 👋
          </h1>
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-400/30">
            <h2 className="text-xl font-semibold text-purple-400 mb-3">🎯 Your AI Learning Hub</h2>
            <p className="text-slate-300 mb-4">
              Continue your journey mastering Artificial Intelligence. Track your progress, 
              explore new concepts, and build amazing projects with AI.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-white mb-2">✨ Today's Goals:</h4>
                <ul className="text-slate-300 space-y-1">
                  <li>• Complete 1 new lesson</li>
                  <li>• Practice coding with AI examples</li>
                  <li>• Explore a new dataset</li>
                  <li>• Maintain your learning streak</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">🏆 Recent Activity:</h4>
                <ul className="text-slate-300 space-y-1">
                  <li>• {user?.completedLessons.length || 0} lessons completed</li>
                  <li>• {user?.currentStreak || 0} day learning streak</li>
                  <li>• {user?.achievements.length || 0} achievements unlocked</li>
                  <li>• {user?.totalPoints || 0} total points earned</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="mb-8">
          <UserProfile />
        </div>

        {/* Minimap */}
        <div className="mb-8">
          <Minimap />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Lessons Completed"
            value={`${user?.completedLessons.length || 0}/24`}
            icon={BookOpen}
            gradient="from-blue-600 to-cyan-600"
            description="Keep up the great work!"
          />
          <StatsCard
            title="Learning Streak"
            value={`${user?.currentStreak || 0} days`}
            icon={Target}
            gradient="from-orange-600 to-red-600"
            description="Don't break the chain!"
          />
          <StatsCard
            title="Total Points"
            value={user?.totalPoints.toString() || "0"}
            icon={Award}
            gradient="from-purple-600 to-pink-600"
            description="Earn more by learning"
          />
          <StatsCard
            title="Achievements"
            value={user?.achievements.length.toString() || "0"}
            icon={Settings}
            gradient="from-green-600 to-emerald-600"
            description="Unlock new milestones"
          />
        </div>

        {/* Learning Path */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">📚 Your Learning Path</h2>
            
            <div className="space-y-4">
              {[
                { 
                  step: 1, 
                  title: "AI Fundamentals", 
                  desc: "Master the basics of artificial intelligence", 
                  status: user?.completedLessons.some(l => l.includes('intro')) ? "completed" : "start",
                  link: "/learn",
                  progress: user?.completedLessons.filter(l => l.includes('intro')).length || 0,
                  total: 3
                },
                { 
                  step: 2, 
                  title: "Data Preparation", 
                  desc: "Learn data cleaning and preprocessing", 
                  status: user?.completedLessons.some(l => l.includes('data')) ? "completed" : "next",
                  link: "/datasets",
                  progress: user?.completedLessons.filter(l => l.includes('data')).length || 0,
                  total: 2
                },
                { 
                  step: 3, 
                  title: "Machine Learning", 
                  desc: "Build and train your first ML models", 
                  status: user?.completedLessons.some(l => l.includes('ml')) ? "completed" : "locked",
                  link: "/models",
                  progress: user?.completedLessons.filter(l => l.includes('ml')).length || 0,
                  total: 4
                },
                { 
                  step: 4, 
                  title: "Advanced Projects", 
                  desc: "Apply your knowledge to real-world problems", 
                  status: "locked",
                  link: "/code",
                  progress: 0,
                  total: 5
                },
              ].map((item) => (
                <Link key={item.step} to={item.link} className="block">
                  <div className={`p-6 rounded-xl border transition-all hover:scale-[1.02] ${
                    item.status === 'completed' 
                      ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/30' 
                      : item.status === 'start'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/30' 
                      : item.status === 'next'
                      ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-400/30'
                      : 'bg-slate-800/50 border-slate-700'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 font-bold ${
                          item.status === 'completed' ? 'bg-green-500 text-white' 
                          : item.status === 'start' ? 'bg-cyan-500 text-white'
                          : item.status === 'next' ? 'bg-yellow-500 text-white'
                          : 'bg-slate-600 text-slate-400'
                        }`}>
                          {item.step}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white text-lg mb-2">{item.title}</h3>
                          <p className="text-slate-300 mb-3">{item.desc}</p>
                          <div className="flex items-center space-x-4">
                            <div className="flex-1">
                              <div className="flex justify-between text-xs text-slate-400 mb-1">
                                <span>Progress</span>
                                <span>{item.progress}/{item.total}</span>
                              </div>
                              <div className="w-full bg-slate-700 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full transition-all ${
                                    item.status === 'completed' ? 'bg-green-500' 
                                    : item.status === 'start' ? 'bg-cyan-500'
                                    : item.status === 'next' ? 'bg-yellow-500'
                                    : 'bg-slate-600'
                                  }`}
                                  style={{ width: `${(item.progress / item.total) * 100}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {item.status === 'start' && (
                      <div className="mt-4">
                        <div className="inline-block bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          👉 Continue Learning
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">⚡ Quick Actions</h2>
            
            <div className="grid grid-cols-1 gap-4">
              {[
                { 
                  icon: BookOpen, 
                  title: "Continue Learning", 
                  desc: "Pick up where you left off", 
                  color: "from-blue-500 to-cyan-500",
                  link: "/learn",
                  badge: "Next lesson ready"
                },
                { 
                  icon: Database, 
                  title: "Explore Data", 
                  desc: "Discover new datasets and insights", 
                  color: "from-purple-500 to-pink-500",
                  link: "/datasets",
                  badge: "12 datasets available"
                },
                { 
                  icon: Settings, 
                  title: "Train Models", 
                  desc: "Build and optimize ML algorithms", 
                  color: "from-green-500 to-emerald-500",
                  link: "/models",
                  badge: "8 models to try"
                },
                { 
                  icon: TrendingUp, 
                  title: "Code & Practice", 
                  desc: "Implement what you've learned", 
                  color: "from-orange-500 to-red-500",
                  link: "/code",
                  badge: "Python ready"
                },
              ].map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link key={index} to={action.link}>
                    <div className={`bg-gradient-to-br ${action.color} p-6 rounded-xl hover:scale-105 transition-transform cursor-pointer relative overflow-hidden`}>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3">
                          <Icon className="w-8 h-8 text-white" />
                          <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                            {action.badge}
                          </span>
                        </div>
                        <h3 className="font-semibold text-white mb-2">{action.title}</h3>
                        <p className="text-sm text-white/90">{action.desc}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Tips Section */}
            <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl p-6 border border-indigo-400/30">
              <h3 className="text-lg font-semibold text-white mb-3">💡 Today's Tip</h3>
              <p className="text-slate-300 text-sm mb-4">
                <strong>Active Learning:</strong> Don't just read about AI concepts - practice them! 
                Try modifying the code examples you see in lessons to understand how different 
                parameters affect the results.
              </p>
              <div className="flex items-center space-x-2 text-xs text-indigo-400">
                <Clock className="w-4 h-4" />
                <span>Estimated reading time: 2 minutes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Onboarding Wizard */}
        {showOnboarding && (
          <OnboardingWizard onComplete={() => setShowOnboarding(false)} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
