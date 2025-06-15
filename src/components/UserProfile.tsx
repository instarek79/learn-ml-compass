
import React from 'react';
import { User, Award, Flame, Target, Calendar, Mail } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

export const UserProfile: React.FC = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
        <div className="text-center text-slate-400">
          <User className="w-16 h-16 mx-auto mb-4" />
          <p>Please log in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{user.name}</h2>
          <div className="flex items-center text-slate-300 text-sm">
            <Mail className="w-4 h-4 mr-1" />
            {user.email}
          </div>
          <div className="flex items-center text-slate-300 text-sm mt-1">
            <Calendar className="w-4 h-4 mr-1" />
            Joined {user.joinDate.toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-400/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm font-medium">Total Points</p>
              <p className="text-white text-2xl font-bold">{user.totalPoints}</p>
            </div>
            <Target className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-4 border border-orange-400/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-400 text-sm font-medium">Streak</p>
              <p className="text-white text-2xl font-bold">{user.currentStreak}</p>
            </div>
            <Flame className="w-8 h-8 text-orange-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-400/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">Completed</p>
              <p className="text-white text-2xl font-bold">{user.completedLessons.length}</p>
            </div>
            <Award className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl p-4 border border-cyan-400/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cyan-400 text-sm font-medium">Achievements</p>
              <p className="text-white text-2xl font-bold">{user.achievements.length}</p>
            </div>
            <Award className="w-8 h-8 text-cyan-400" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2 text-yellow-400" />
          Recent Achievements
        </h3>
        <div className="space-y-3">
          {user.achievements.slice(-3).map((achievement) => (
            <div
              key={achievement.id}
              className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-lg p-3 border border-yellow-400/20"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <h4 className="font-semibold text-white">{achievement.title}</h4>
                  <p className="text-sm text-slate-300">{achievement.description}</p>
                  <p className="text-xs text-yellow-400">
                    {achievement.unlockedAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
