
import React from 'react';
import { Minimap } from '../components/Minimap';
import { StatsCard } from '../components/StatsCard';
import { BookOpen, Database, Settings, Target, TrendingUp, Users, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Introduction */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to AI Academy Dashboard
          </h1>
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-400/30">
            <h2 className="text-xl font-semibold text-purple-400 mb-3">🎯 What is this Dashboard?</h2>
            <p className="text-slate-300 mb-4">
              Your central hub for learning Artificial Intelligence from scratch. This dashboard provides an overview 
              of your learning progress, quick access to all sections, and a clear learning path to guide your AI journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-white mb-2">✨ Key Features:</h4>
                <ul className="text-slate-300 space-y-1">
                  <li>• Track your learning progress</li>
                  <li>• Access interactive lessons</li>
                  <li>• Practice coding with real examples</li>
                  <li>• Explore machine learning datasets</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">🚀 Getting Started:</h4>
                <ul className="text-slate-300 space-y-1">
                  <li>• Begin with "Learn AI" fundamentals</li>
                  <li>• Practice in the "Coding Area"</li>
                  <li>• Experiment with datasets</li>
                  <li>• Build your first ML model</li>
                </ul>
              </div>
            </div>
          </div>
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
            <h2 className="text-2xl font-bold text-white mb-4">📚 Structured Learning Path</h2>
            
            <div className="space-y-4">
              {[
                { 
                  step: 1, 
                  title: "AI Fundamentals", 
                  desc: "Understand what AI is, its history, and core concepts", 
                  status: "start",
                  link: "/learn",
                  content: "Learn about machine learning types, neural networks, and AI applications in real world"
                },
                { 
                  step: 2, 
                  title: "Data Preparation", 
                  desc: "Master data cleaning, preprocessing, and visualization", 
                  status: "next",
                  link: "/datasets",
                  content: "Explore datasets, handle missing values, and prepare data for machine learning"
                },
                { 
                  step: 3, 
                  title: "Choose ML Models", 
                  desc: "Select and configure the right algorithms", 
                  status: "locked",
                  link: "/models",
                  content: "Compare different algorithms and understand when to use each one"
                },
                { 
                  step: 4, 
                  title: "Practice & Code", 
                  desc: "Implement algorithms and build projects", 
                  status: "locked",
                  link: "/code",
                  content: "Write code, experiment with examples, and build your portfolio"
                },
              ].map((item) => (
                <Link key={item.step} to={item.link} className="block">
                  <div className={`p-6 rounded-xl border transition-all hover:scale-[1.02] ${
                    item.status === 'start' 
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/30' 
                      : item.status === 'next'
                      ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/30'
                      : 'bg-slate-800/50 border-slate-700'
                  }`}>
                    <div className="flex items-start">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 font-bold ${
                        item.status === 'start' ? 'bg-cyan-500 text-white' 
                        : item.status === 'next' ? 'bg-green-500 text-white'
                        : 'bg-slate-600 text-slate-400'
                      }`}>
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-lg mb-2">{item.title}</h3>
                        <p className="text-slate-300 mb-2">{item.desc}</p>
                        <p className="text-sm text-slate-400">{item.content}</p>
                        {item.status === 'start' && (
                          <div className="mt-3 inline-block bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                            👉 Start Here
                          </div>
                        )}
                      </div>
                    </div>
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
                  title: "Start Learning AI", 
                  desc: "Begin with interactive lessons and concepts", 
                  color: "from-blue-500 to-cyan-500",
                  link: "/learn"
                },
                { 
                  icon: Database, 
                  title: "Explore Datasets", 
                  desc: "Browse and analyze real-world data", 
                  color: "from-purple-500 to-pink-500",
                  link: "/datasets"
                },
                { 
                  icon: Settings, 
                  title: "Configure ML Models", 
                  desc: "Set up and tune machine learning algorithms", 
                  color: "from-green-500 to-emerald-500",
                  link: "/models"
                },
                { 
                  icon: TrendingUp, 
                  title: "Practice Coding", 
                  desc: "Write code and experiment with examples", 
                  color: "from-orange-500 to-red-500",
                  link: "/code"
                },
              ].map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link key={index} to={action.link}>
                    <div className={`bg-gradient-to-br ${action.color} p-6 rounded-xl hover:scale-105 transition-transform cursor-pointer`}>
                      <Icon className="w-8 h-8 text-white mb-3" />
                      <h3 className="font-semibold text-white mb-2">{action.title}</h3>
                      <p className="text-sm text-white/90">{action.desc}</p>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl p-6 border border-indigo-400/30">
              <h3 className="text-lg font-semibold text-white mb-3">💡 Learning Tips</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">1.</span>
                  <span><strong>Start Simple:</strong> Begin with basic concepts before diving into complex algorithms</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">2.</span>
                  <span><strong>Practice Regularly:</strong> Use the coding area to experiment with what you learn</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">3.</span>
                  <span><strong>Work with Data:</strong> Explore different datasets to understand real-world applications</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">4.</span>
                  <span><strong>Build Projects:</strong> Apply your knowledge by creating your own AI projects</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
