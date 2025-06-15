
import React from 'react';
import { Brain, Database, Settings, BookOpen, Play, BarChart3, Target, Home } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: BookOpen, label: 'Learn AI', path: '/learn' },
  { icon: Play, label: 'Coding Area', path: '/code' },
  { icon: Database, label: 'Datasets', path: '/datasets' },
  { icon: Settings, label: 'ML Models', path: '/models' },
  { icon: BarChart3, label: 'Training', path: '/training' },
  { icon: Target, label: 'Progress', path: '/progress' },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 min-h-screen p-6 text-white shadow-2xl">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Brain className="w-8 h-8 text-cyan-400" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
            AI Academy
          </h1>
        </div>
        <p className="text-sm text-purple-200">Learn AI from Scratch</p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                isActive 
                  ? 'bg-gradient-to-r from-cyan-500/20 to-pink-500/20 border border-cyan-400/30 shadow-lg' 
                  : 'hover:bg-white/10'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-purple-200'}`} />
              <span className={`font-medium ${isActive ? 'text-white' : 'text-purple-200'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-12 p-4 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 rounded-xl border border-cyan-400/20">
        <h3 className="text-sm font-semibold text-cyan-400 mb-2">Quick Tip</h3>
        <p className="text-xs text-purple-200">
          Start with the Learn AI section to understand the fundamentals before diving into coding!
        </p>
      </div>
    </div>
  );
};
