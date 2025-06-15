
import React, { useState } from 'react';
import { Play, Square, ExternalLink, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export const JupyterLauncher = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [jupyterUrl, setJupyterUrl] = useState('');

  const handleStart = async () => {
    setIsStarting(true);
    // Simulate starting Jupyter notebook
    setTimeout(() => {
      setIsRunning(true);
      setIsStarting(false);
      setJupyterUrl('http://localhost:8888/tree');
    }, 3000);
  };

  const handleStop = () => {
    setIsRunning(false);
    setJupyterUrl('');
  };

  const handleOpenJupyter = () => {
    if (jupyterUrl) {
      window.open(jupyterUrl, '_blank');
    }
  };

  return (
    <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-6 border border-orange-400/30">
      <h3 className="text-lg font-semibold text-orange-400 mb-4 flex items-center">
        📓 Jupyter Notebook
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isRunning ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : isStarting ? (
              <Loader2 className="w-5 h-5 text-yellow-400 animate-spin" />
            ) : (
              <AlertCircle className="w-5 h-5 text-gray-400" />
            )}
            <span className="text-white font-medium">
              {isRunning ? 'Running' : isStarting ? 'Starting...' : 'Stopped'}
            </span>
          </div>
          
          <div className="flex space-x-2">
            {!isRunning && !isStarting && (
              <button
                onClick={handleStart}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>Start</span>
              </button>
            )}
            
            {isRunning && (
              <>
                <button
                  onClick={handleStop}
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Square className="w-4 h-4" />
                  <span>Stop</span>
                </button>
                <button
                  onClick={handleOpenJupyter}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open</span>
                </button>
              </>
            )}
          </div>
        </div>

        {isStarting && (
          <div className="bg-yellow-500/20 rounded-lg p-3 border border-yellow-400/30">
            <p className="text-yellow-300 text-sm">
              🚀 Starting Jupyter Notebook server... This may take a few moments.
            </p>
          </div>
        )}

        {isRunning && (
          <div className="bg-green-500/20 rounded-lg p-3 border border-green-400/30">
            <p className="text-green-300 text-sm mb-2">
              ✅ Jupyter Notebook is running at: 
              <code className="bg-black/30 px-2 py-1 rounded ml-2 text-green-400">
                {jupyterUrl}
              </code>
            </p>
            <p className="text-green-300 text-xs">
              Click "Open" to launch Jupyter in a new tab and start coding!
            </p>
          </div>
        )}

        <div className="text-xs text-gray-400">
          <p>💡 <strong>Tip:</strong> Use Jupyter notebooks for interactive data analysis and machine learning experiments!</p>
        </div>
      </div>
    </div>
  );
};
