
import React from 'react';
import { Minimap } from '../components/Minimap';
import { StatsCard } from '../components/StatsCard';
import { BookOpen, Database, Settings, Target, TrendingUp, Users, Award, Clock } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome to AI Academy
          </h1>
          <p className="text-xl text-slate-300">
            Master Artificial Intelligence from the ground up with interactive learning
          </p>
        </div>

        {/* Minimap */}
        <div className="mb-8">
          <Minimap />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Lessons Completed"
            value="0/24"
            icon={BookOpen}
            gradient="from-blue-600 to-cyan-600"
            description="Start your AI journey"
          />
          <StatsCard
            title="Datasets Available"
            value="12"
            icon={Database}
            gradient="from-purple-600 to-pink-600"
            description="Ready to explore"
          />
          <StatsCard
            title="ML Models"
            value="8"
            icon={Settings}
            gradient="from-green-600 to-emerald-600"
            description="From basic to advanced"
          />
          <StatsCard
            title="Progress"
            value="0%"
            icon={Target}
            gradient="from-orange-600 to-red-600"
            description="Begin your journey"
          />
        </div>

        {/* Learning Path */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Learning Path</h2>
            
            <div className="space-y-4">
              {[
                { step: 1, title: "AI Fundamentals", desc: "Understand what AI is and its applications", status: "start" },
                { step: 2, title: "Data Preparation", desc: "Learn to clean and prepare datasets", status: "locked" },
                { step: 3, title: "Choose ML Model", desc: "Select the right model for your problem", status: "locked" },
                { step: 4, title: "Train & Evaluate", desc: "Train your model and assess performance", status: "locked" },
              ].map((item) => (
                <div key={item.step} className={`p-4 rounded-xl border ${
                  item.status === 'start' 
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/30' 
                    : 'bg-slate-800/50 border-slate-700'
                }`}>
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                      item.status === 'start' ? 'bg-cyan-500 text-white' : 'bg-slate-600 text-slate-400'
                    }`}>
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="text-sm text-slate-300">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: BookOpen, title: "Start Learning", desc: "Begin with AI basics", color: "from-blue-500 to-cyan-500" },
                { icon: Database, title: "Explore Data", desc: "Browse datasets", color: "from-purple-500 to-pink-500" },
                { icon: Settings, title: "Try Models", desc: "Experiment with ML", color: "from-green-500 to-emerald-500" },
                { icon: TrendingUp, title: "View Progress", desc: "Track your growth", color: "from-orange-500 to-red-500" },
              ].map((action, index) => {
                const Icon = action.icon;
                return (
                  <div key={index} className={`bg-gradient-to-br ${action.color} p-6 rounded-xl hover:scale-105 transition-transform cursor-pointer`}>
                    <Icon className="w-8 h-8 text-white mb-3" />
                    <h3 className="font-semibold text-white mb-1">{action.title}</h3>
                    <p className="text-xs text-white/80">{action.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl p-6 border border-indigo-400/30">
              <h3 className="text-lg font-semibold text-white mb-3">🚀 Getting Started</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Start with the "Learn AI" section to understand the basics</li>
                <li>• Practice in the "Coding Area" with interactive examples</li>
                <li>• Explore different datasets and see how they work</li>
                <li>• Choose and configure your first machine learning model</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
