
import React, { useState } from 'react';
import { Play, Code, FileText, Lightbulb } from 'lucide-react';
import { JupyterLauncher } from '../components/JupyterLauncher';

const CodingArea = () => {
  const [code, setCode] = useState(`# Welcome to the AI Coding Area!
# This is where you can practice and experiment with AI concepts

# Example: Simple Linear Regression
import numpy as np
import matplotlib.pyplot as plt

# Generate some sample data
x = np.array([1, 2, 3, 4, 5])
y = np.array([2, 4, 6, 8, 10])

# Calculate the slope and intercept
slope = np.sum((x - np.mean(x)) * (y - np.mean(y))) / np.sum((x - np.mean(x))**2)
intercept = np.mean(y) - slope * np.mean(x)

print(f"Slope: {slope}")
print(f"Intercept: {intercept}")

# Make a prediction
new_x = 6
prediction = slope * new_x + intercept
print(f"Prediction for x={new_x}: {prediction}")
`);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <Code className="w-10 h-10 mr-4 text-green-400" />
            Interactive Coding & Practice Area
          </h1>
          <p className="text-xl text-slate-300">
            Practice AI concepts with hands-on coding examples and Jupyter notebooks
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Code Editor */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-slate-700">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-slate-400 text-sm">main.py</span>
                </div>
                <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                  <Play className="w-4 h-4" />
                  <span>Run Code</span>
                </button>
              </div>
              
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-96 bg-slate-900 text-green-400 p-6 font-mono text-sm resize-none focus:outline-none"
                style={{ fontFamily: 'Monaco, Consolas, monospace' }}
              />
              
              <div className="p-4 border-t border-slate-700 bg-slate-800">
                <h3 className="text-sm font-semibold text-white mb-2">Output:</h3>
                <div className="bg-black rounded-lg p-4 text-green-400 font-mono text-sm">
                  <div>Slope: 2.0</div>
                  <div>Intercept: 0.0</div>
                  <div>Prediction for x=6: 12.0</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar with Learning Notes */}
          <div className="space-y-6">
            {/* Jupyter Launcher */}
            <JupyterLauncher />

            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border border-blue-400/30">
              <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                Learning Notes
              </h3>
              <div className="space-y-3 text-sm text-white">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-medium mb-1">📈 Linear Regression</p>
                  <p className="text-slate-300">A method to model the relationship between variables using a straight line</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-medium mb-1">📊 Slope & Intercept</p>
                  <p className="text-slate-300">Slope determines the line's steepness, intercept is where it crosses the y-axis</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-400/30">
              <h3 className="text-lg font-semibold text-purple-400 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Code Examples
              </h3>
              <div className="space-y-2">
                {[
                  "Linear Regression",
                  "Classification",
                  "K-Means Clustering",
                  "Neural Networks",
                  "Decision Trees"
                ].map((example, index) => (
                  <button 
                    key={index}
                    className="w-full text-left p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white text-sm"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-400/30">
              <h3 className="text-lg font-semibold text-green-400 mb-4">💡 Tips</h3>
              <ul className="space-y-2 text-sm text-white">
                <li>• Try modifying the data values</li>
                <li>• Experiment with different algorithms</li>
                <li>• Use print() to debug your code</li>
                <li>• Test edge cases and unusual inputs</li>
                <li>• Launch Jupyter for interactive analysis</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingArea;
