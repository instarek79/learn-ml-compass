
import React, { useState, useEffect, useMemo } from 'react';
import { Settings, Sliders, Play, Save } from 'lucide-react';
import { useSelection } from '../contexts/SelectionContext';

const MLModels = () => {
  const [selectedModel, setSelectedModel] = useState<string>('linear_regression');
  const { updateModel, updateStep } = useSelection();

  // Algorithm-specific parameters
  const getModelParameters = (modelId: string) => {
    switch (modelId) {
      case 'linear_regression':
        return {
          learning_rate: 0.01,
          max_iterations: 1000,
          regularization_strength: 0.01,
          fit_intercept: true,
          normalize: false
        };
      case 'logistic_regression':
        return {
          learning_rate: 0.01,
          max_iterations: 1000,
          regularization: 'l2',
          regularization_strength: 1.0,
          tolerance: 0.0001,
          fit_intercept: true
        };
      case 'decision_tree':
        return {
          max_depth: 5,
          min_samples_split: 2,
          min_samples_leaf: 1,
          criterion: 'gini',
          max_features: 'sqrt',
          random_state: 42
        };
      case 'random_forest':
        return {
          n_estimators: 100,
          max_depth: 10,
          min_samples_split: 2,
          min_samples_leaf: 1,
          max_features: 'sqrt',
          bootstrap: true,
          random_state: 42
        };
      case 'svm':
        return {
          C: 1.0,
          kernel: 'rbf',
          gamma: 'scale',
          degree: 3,
          tolerance: 0.001,
          max_iterations: -1
        };
      case 'neural_network':
        return {
          hidden_layer_sizes: [100, 50],
          activation: 'relu',
          solver: 'adam',
          learning_rate: 0.001,
          max_iterations: 200,
          batch_size: 32,
          dropout_rate: 0.2
        };
      default:
        return {};
    }
  };

  const [parameters, setParameters] = useState(getModelParameters(selectedModel));

  const models = useMemo(() => [
    { id: 'linear_regression', name: 'Linear Regression', type: 'Regression', complexity: 'Beginner', description: 'Simple linear relationship modeling' },
    { id: 'logistic_regression', name: 'Logistic Regression', type: 'Classification', complexity: 'Beginner', description: 'Binary classification using logistic function' },
    { id: 'decision_tree', name: 'Decision Tree', type: 'Both', complexity: 'Intermediate', description: 'Tree-based decision making model' },
    { id: 'random_forest', name: 'Random Forest', type: 'Both', complexity: 'Intermediate', description: 'Ensemble of multiple decision trees' },
    { id: 'svm', name: 'Support Vector Machine', type: 'Both', complexity: 'Advanced', description: 'Find optimal separating hyperplane' },
    { id: 'neural_network', name: 'Neural Network', type: 'Both', complexity: 'Advanced', description: 'Deep learning with multiple layers' },
  ], []);

  useEffect(() => {
    updateStep("Configuring ML Model");
    const model = models.find(m => m.id === selectedModel);
    if (model) {
      updateModel(model.name);
    }
  }, [selectedModel, updateModel, updateStep, models]);

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
    setParameters(getModelParameters(modelId));
    const model = models.find(m => m.id === modelId);
    if (model) {
      updateModel(model.name);
    }
  };

  const handleParameterChange = (paramName: string, value: any) => {
    setParameters(prev => ({
      ...prev,
      [paramName]: value
    }));
  };

  const handleSaveConfiguration = () => {
    console.log('Saving configuration:', { selectedModel, parameters });
    alert('Configuration saved successfully!');
  };

  const handleTrainModel = () => {
    console.log('Training model:', { selectedModel, parameters });
    alert(`Training ${models.find(m => m.id === selectedModel)?.name} with current parameters...`);
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Beginner': return 'text-green-400 bg-green-500/20';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-500/20';
      case 'Advanced': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const renderParameterInput = (paramName: string, value: any) => {
    // Handle different parameter types based on the parameter name and value
    if (typeof value === 'boolean') {
      return (
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => handleParameterChange(paramName, e.target.checked)}
            className="w-4 h-4 text-indigo-600 bg-slate-700 border-slate-600 rounded focus:ring-indigo-500"
          />
          <span className="text-white">{value ? 'True' : 'False'}</span>
        </div>
      );
    }

    if (paramName.includes('regularization') && typeof value === 'string') {
      return (
        <select
          value={value}
          onChange={(e) => handleParameterChange(paramName, e.target.value)}
          className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600"
        >
          <option value="l1">L1 (Lasso)</option>
          <option value="l2">L2 (Ridge)</option>
          <option value="elasticnet">Elastic Net</option>
        </select>
      );
    }

    if (paramName === 'criterion') {
      return (
        <select
          value={value}
          onChange={(e) => handleParameterChange(paramName, e.target.value)}
          className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600"
        >
          <option value="gini">Gini</option>
          <option value="entropy">Entropy</option>
        </select>
      );
    }

    if (paramName === 'kernel') {
      return (
        <select
          value={value}
          onChange={(e) => handleParameterChange(paramName, e.target.value)}
          className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600"
        >
          <option value="linear">Linear</option>
          <option value="poly">Polynomial</option>
          <option value="rbf">RBF</option>
          <option value="sigmoid">Sigmoid</option>
        </select>
      );
    }

    if (paramName === 'activation') {
      return (
        <select
          value={value}
          onChange={(e) => handleParameterChange(paramName, e.target.value)}
          className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600"
        >
          <option value="relu">ReLU</option>
          <option value="tanh">Tanh</option>
          <option value="sigmoid">Sigmoid</option>
          <option value="identity">Identity</option>
        </select>
      );
    }

    if (paramName === 'solver') {
      return (
        <select
          value={value}
          onChange={(e) => handleParameterChange(paramName, e.target.value)}
          className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600"
        >
          <option value="adam">Adam</option>
          <option value="sgd">SGD</option>
          <option value="lbfgs">L-BFGS</option>
        </select>
      );
    }

    if (paramName === 'max_features') {
      return (
        <select
          value={value}
          onChange={(e) => handleParameterChange(paramName, e.target.value)}
          className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600"
        >
          <option value="sqrt">sqrt</option>
          <option value="log2">log2</option>
          <option value="none">None</option>
        </select>
      );
    }

    // For numeric values, use appropriate input ranges
    if (typeof value === 'number') {
      let min = 0, max = 100, step = 1;
      
      if (paramName.includes('learning_rate')) {
        min = 0.0001; max = 1; step = 0.0001;
      } else if (paramName.includes('regularization_strength') || paramName === 'C') {
        min = 0.001; max = 10; step = 0.001;
      } else if (paramName.includes('tolerance')) {
        min = 0.00001; max = 0.01; step = 0.00001;
      } else if (paramName === 'dropout_rate') {
        min = 0; max = 0.9; step = 0.1;
      } else if (paramName.includes('max_depth')) {
        min = 1; max = 50; step = 1;
      } else if (paramName === 'n_estimators') {
        min = 10; max = 1000; step = 10;
      } else if (paramName.includes('max_iterations')) {
        min = 100; max = 5000; step = 100;
      }

      return (
        <div>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => handleParameterChange(paramName, parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>{min}</span>
            <span>{value}</span>
            <span>{max}</span>
          </div>
        </div>
      );
    }

    // Default text input for other types
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => handleParameterChange(paramName, e.target.value)}
        className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600"
      />
    );
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
                {selectedModel && selectedModel !== 'linear_regression' && selectedModel !== 'neural_network' && (
                  <div className="space-y-3 text-sm text-slate-300">
                    <p><strong className="text-white">{models.find(m => m.id === selectedModel)?.name}</strong> - {models.find(m => m.id === selectedModel)?.description}</p>
                    <p><strong className="text-indigo-400">Type:</strong> {models.find(m => m.id === selectedModel)?.type}</p>
                    <p><strong className="text-indigo-400">Complexity:</strong> {models.find(m => m.id === selectedModel)?.complexity}</p>
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
                {models.find(m => m.id === selectedModel)?.name} Parameters
              </h3>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {Object.entries(parameters).map(([paramName, value]) => (
                  <div key={paramName}>
                    <label className="block text-sm font-medium text-white mb-2 capitalize">
                      {paramName.replace(/_/g, ' ')}
                    </label>
                    {renderParameterInput(paramName, value)}
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                <button 
                  onClick={handleSaveConfiguration}
                  className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Configuration</span>
                </button>
                <button 
                  onClick={handleTrainModel}
                  className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors"
                >
                  <Play className="w-4 h-4" />
                  <span>Train Model</span>
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-400/30">
              <h3 className="text-lg font-semibold text-green-400 mb-4">Parameter Guide</h3>
              <div className="space-y-3 text-sm text-white max-h-64 overflow-y-auto">
                {selectedModel === 'linear_regression' && (
                  <>
                    <div className="bg-white/10 rounded-lg p-3">
                      <p className="font-medium mb-1">📈 Learning Rate</p>
                      <p className="text-slate-300">Controls convergence speed in iterative algorithms</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <p className="font-medium mb-1">🎯 Regularization Strength</p>
                      <p className="text-slate-300">Prevents overfitting by penalizing large coefficients</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <p className="font-medium mb-1">📐 Fit Intercept</p>
                      <p className="text-slate-300">Whether to calculate the y-intercept</p>
                    </div>
                  </>
                )}
                {selectedModel === 'decision_tree' && (
                  <>
                    <div className="bg-white/10 rounded-lg p-3">
                      <p className="font-medium mb-1">🌳 Max Depth</p>
                      <p className="text-slate-300">Maximum depth of the tree to prevent overfitting</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <p className="font-medium mb-1">🍃 Min Samples Split</p>
                      <p className="text-slate-300">Minimum samples required to split a node</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <p className="font-medium mb-1">📊 Criterion</p>
                      <p className="text-slate-300">Function to measure quality of splits</p>
                    </div>
                  </>
                )}
                {selectedModel === 'neural_network' && (
                  <>
                    <div className="bg-white/10 rounded-lg p-3">
                      <p className="font-medium mb-1">🧠 Hidden Layers</p>
                      <p className="text-slate-300">Number and size of hidden layers</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <p className="font-medium mb-1">⚡ Activation</p>
                      <p className="text-slate-300">Function applied to neuron outputs</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <p className="font-medium mb-1">🎲 Dropout Rate</p>
                      <p className="text-slate-300">Percentage of neurons to ignore during training</p>
                    </div>
                  </>
                )}
                {/* Add more parameter guides for other models as needed */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLModels;
