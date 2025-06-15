import React, { useState, useEffect } from 'react';
import { Settings, Sliders, Play, Save } from 'lucide-react';
import { useSelection } from '../contexts/SelectionContext';

const MLModels = () => {
  const [selectedModel, setSelectedModel] = useState<string>('linear_regression');
  const { updateModel, updateStep } = useSelection();

  const [parameters, setParameters] = useState({
    learning_rate: 0.01,
    max_iterations: 1000,
    regularization: 0.01,
  });

  const models = [
    { id: 'linear_regression', name: 'Linear Regression', type: 'Regression', complexity: 'Beginner', description: 'Simple linear relationship modeling' },
    { id: 'logistic_regression', name: 'Logistic Regression', type: 'Classification', complexity: 'Beginner', description: 'Binary classification using logistic function' },
    { id: 'decision_tree', name: 'Decision Tree', type: 'Both', complexity: 'Intermediate', description: 'Tree-based decision making model' },
    { id: 'random_forest', name: 'Random Forest', type: 'Both', complexity: 'Intermediate', description: 'Ensemble of multiple decision trees' },
    { id: 'svm', name: 'Support Vector Machine', type: 'Both', complexity: 'Advanced', description: 'Find optimal separating hyperplane' },
    { id: 'neural_network', name: 'Neural Network', type: 'Both', complexity: 'Advanced', description: 'Deep learning with multiple layers' },
  ];

  useEffect(() => {
    updateStep("Configuring ML Model");
    const model = models.find(m => m.id === selectedModel);
    if (model) {
      updateModel(model.name);
    }
  }, [selectedModel, updateModel, updateStep]);

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
    const model = models.find(m => m.id === modelId);
    if (model) {
      updateModel(model.name);
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Beginner': return 'text-green-400 bg-green-500/20';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-500/20';
      case 'Advanced': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <Settings className="w-10 h-10 mr-4 text-indigo-400" />
            Machine Learning Models
          </h1>
          <p className="text-xl text-slate-300">
            Select and configure ML models for your projects
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Model Selection */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">Available Models</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {models.map((model) => (
                  <div 
                    key={model.id}
                    className={`p-6 rounded-xl border cursor-pointer transition-all ${
                      selectedModel === model.id
                        ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-indigo-400/50'
                        : 'bg-slate-700/50 border-slate-600 hover:bg-slate-700/70'
                    }`}
                    onClick={() => handleModelSelect(model.id)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-white">{model.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(model.complexity)}`}>
                        {model.complexity}
                      </span>
                    </div>
                    
                    <p className="text-sm text-slate-300 mb-3">{model.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400">Type: {model.type}</span>
                      {selectedModel === model.id && (
                        <span className="text-xs text-indigo-400">✓ Selected</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Current Model Details */}
              <div className="mt-8 p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-400/20">
                <h3 className="text-lg font-semibold text-white mb-4">Model Information</h3>
                {selectedModel === 'linear_regression' && (
                  <div className="space-y-3 text-sm text-slate-300">
                    <p><strong className="text-white">Linear Regression</strong> finds the best line through your data points.</p>
                    <p><strong className="text-indigo-400">Use Case:</strong> Predicting continuous values like prices, temperatures, or sales.</p>
                    <p><strong className="text-indigo-400">Strengths:</strong> Simple, interpretable, fast training.</p>
                    <p><strong className="text-indigo-400">Limitations:</strong> Assumes linear relationships, sensitive to outliers.</p>
                  </div>
                )}
                {selectedModel === 'neural_network' && (
                  <div className="space-y-3 text-sm text-slate-300">
                    <p><strong className="text-white">Neural Network</strong> uses interconnected nodes to learn complex patterns.</p>
                    <p><strong className="text-indigo-400">Use Case:</strong> Image recognition, natural language processing, complex predictions.</p>
                    <p><strong className="text-indigo-400">Strengths:</strong> Can learn any pattern, very powerful.</p>
                    <p><strong className="text-indigo-400">Limitations:</strong> Requires lots of data, slow training, less interpretable.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Parameter Tuning */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl p-6 border border-indigo-400/30">
              <h3 className="text-lg font-semibold text-indigo-400 mb-4 flex items-center">
                <Sliders className="w-5 h-5 mr-2" />
                Model Parameters
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Learning Rate: {parameters.learning_rate}
                  </label>
                  <input
                    type="range"
                    min="0.001"
                    max="1"
                    step="0.001"
                    value={parameters.learning_rate}
                    onChange={(e) => setParameters({...parameters, learning_rate: parseFloat(e.target.value)})}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>0.001</span>
                    <span>1.0</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Max Iterations: {parameters.max_iterations}
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="100"
                    value={parameters.max_iterations}
                    onChange={(e) => setParameters({...parameters, max_iterations: parseInt(e.target.value)})}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>100</span>
                    <span>5000</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Regularization: {parameters.regularization}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={parameters.regularization}
                    onChange={(e) => setParameters({...parameters, regularization: parseFloat(e.target.value)})}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>0.0</span>
                    <span>1.0</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition-colors">
                  <Save className="w-4 h-4" />
                  <span>Save Configuration</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors">
                  <Play className="w-4 h-4" />
                  <span>Train Model</span>
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-400/30">
              <h3 className="text-lg font-semibold text-green-400 mb-4">Parameter Guide</h3>
              <div className="space-y-3 text-sm text-white">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-medium mb-1">📈 Learning Rate</p>
                  <p className="text-slate-300">Controls how fast the model learns. Too high = unstable, too low = slow</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-medium mb-1">🔄 Max Iterations</p>
                  <p className="text-slate-300">Maximum training steps. More iterations = longer training time</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-medium mb-1">🎯 Regularization</p>
                  <p className="text-slate-300">Prevents overfitting. Higher values = simpler model</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLModels;
