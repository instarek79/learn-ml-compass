
import React from 'react';
import { Database, Settings, Target, AlertCircle } from 'lucide-react';

interface MinimapProps {
  currentDataset?: string;
  currentModel?: string;
  currentStep?: string;
}

export const Minimap: React.FC<MinimapProps> = ({ 
  currentDataset = "None Selected", 
  currentModel = "None Selected",
  currentStep = "Getting Started"
}) => {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700 shadow-xl">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Target className="w-5 h-5 mr-2 text-cyan-400" />
        Current Selection
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-blue-400/30">
          <div className="flex items-center mb-2">
            <Database className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-sm font-medium text-blue-400">Dataset</span>
          </div>
          <p className="text-white font-semibold truncate">{currentDataset}</p>
          {currentDataset === "None Selected" && (
            <div className="flex items-center mt-1">
              <AlertCircle className="w-3 h-3 text-yellow-400 mr-1" />
              <span className="text-xs text-yellow-400">Select a dataset</span>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-400/30">
          <div className="flex items-center mb-2">
            <Settings className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-sm font-medium text-purple-400">ML Model</span>
          </div>
          <p className="text-white font-semibold truncate">{currentModel}</p>
          {currentModel === "None Selected" && (
            <div className="flex items-center mt-1">
              <AlertCircle className="w-3 h-3 text-yellow-400 mr-1" />
              <span className="text-xs text-yellow-400">Choose a model</span>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-400/30">
          <div className="flex items-center mb-2">
            <Target className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-sm font-medium text-green-400">Current Step</span>
          </div>
          <p className="text-white font-semibold truncate">{currentStep}</p>
        </div>
      </div>

      <div className="mt-4 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 rounded-lg p-3 border border-cyan-400/20">
        <p className="text-xs text-cyan-300 mb-1">💡 Next Steps:</p>
        <p className="text-xs text-slate-300">
          {currentDataset === "None Selected" ? "1. Select a dataset from the Datasets page" :
           currentModel === "None Selected" ? "2. Choose and configure an ML model" :
           "3. Start training your model!"}
        </p>
      </div>
    </div>
  );
};
