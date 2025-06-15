
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  gradient: string;
  description?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, gradient, description }) => {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-6 border border-white/10 shadow-xl hover:scale-105 transition-transform duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-sm text-white/80">{title}</p>
        </div>
      </div>
      {description && (
        <p className="text-xs text-white/70">{description}</p>
      )}
    </div>
  );
};
