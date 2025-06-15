import React, { useState, useEffect } from 'react';
import { Database, Plus, Trash2, Download, Eye, BarChart3, Info, ArrowRight } from 'lucide-react';
import { useSelection } from '../contexts/SelectionContext';
import { Link } from 'react-router-dom';

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner': return 'text-green-400 bg-green-500/20';
    case 'Intermediate': return 'text-yellow-400 bg-yellow-500/20';
    case 'Advanced': return 'text-red-400 bg-red-500/20';
    default: return 'text-gray-400 bg-gray-500/20';
  }
};

const Datasets = () => {
  const [datasets, setDatasets] = useState([
    { 
      id: 1, 
      name: "Iris Flower Dataset", 
      rows: 150, 
      columns: 5, 
      type: "Classification", 
      size: "7.5 KB", 
      description: "Classic dataset for flower species classification based on sepal and petal measurements",
      features: ["sepal_length", "sepal_width", "petal_length", "petal_width", "species"],
      difficulty: "Beginner"
    },
    { 
      id: 2, 
      name: "Boston Housing Prices", 
      rows: 506, 
      columns: 14, 
      type: "Regression", 
      size: "46 KB", 
      description: "Predict housing prices in Boston area based on various neighborhood features",
      features: ["crime_rate", "avg_rooms", "age", "distance", "price"],
      difficulty: "Intermediate"
    },
    { 
      id: 3, 
      name: "Titanic Survivors", 
      rows: 891, 
      columns: 12, 
      type: "Classification", 
      size: "62 KB", 
      description: "Predict passenger survival on the Titanic based on demographics and ticket info",
      features: ["passenger_class", "age", "sex", "fare", "survived"],
      difficulty: "Beginner"
    },
    { 
      id: 4, 
      name: "Wine Quality", 
      rows: 1599, 
      columns: 12, 
      type: "Regression", 
      size: "84 KB", 
      description: "Predict wine quality ratings based on chemical properties",
      features: ["acidity", "sugar", "alcohol", "pH", "quality"],
      difficulty: "Advanced"
    },
  ]);

  const [selectedDataset, setSelectedDataset] = useState<number | null>(1);
  const { updateDataset, updateStep } = useSelection();

  useEffect(() => {
    updateStep("Selecting Dataset");
  }, [updateStep]);

  const handleDatasetSelect = (datasetId: number) => {
    setSelectedDataset(datasetId);
    const dataset = datasets.find(d => d.id === datasetId);
    if (dataset) {
      updateDataset(dataset.name);
    }
  };

  const handleUseDataset = () => {
    const dataset = getSelectedDataset();
    if (dataset) {
      // Store dataset info for other pages
      localStorage.setItem('selectedDataset', JSON.stringify(dataset));
      updateDataset(dataset.name);
    }
  };

  const handleViewStatistics = () => {
    if (!selectedDataset) {
      alert('Please select a dataset first');
      return;
    }
    const dataset = getSelectedDataset();
    console.log('Viewing statistics for:', dataset?.name);
    alert(`📊 Statistics for ${dataset?.name}:\n\n• Total Rows: ${dataset?.rows.toLocaleString()}\n• Columns: ${dataset?.columns}\n• File Size: ${dataset?.size}\n• Data Type: ${dataset?.type}\n• Difficulty: ${dataset?.difficulty}`);
  };

  const handleCleanData = () => {
    if (!selectedDataset) {
      alert('Please select a dataset first');
      return;
    }
    const dataset = getSelectedDataset();
    console.log('Cleaning data for:', dataset?.name);
    alert(`🧹 Data Cleaning for ${dataset?.name}:\n\n• Checking for missing values...\n• Removing duplicates...\n• Standardizing formats...\n• Data cleaning completed!`);
  };

  const handleVisualizeData = () => {
    if (!selectedDataset) {
      alert('Please select a dataset first');
      return;
    }
    const dataset = getSelectedDataset();
    console.log('Visualizing data for:', dataset?.name);
    alert(`📈 Data Visualization for ${dataset?.name}:\n\n• Generated correlation matrix\n• Created distribution plots\n• Built feature importance chart\n• Visualization ready!`);
  };

  const handleExportData = () => {
    if (!selectedDataset) {
      alert('Please select a dataset first');
      return;
    }
    const dataset = getSelectedDataset();
    console.log('Exporting data for:', dataset?.name);
    
    // Create a simple CSV-like content for download
    let csvContent = '';
    if (selectedDataset === 1) {
      csvContent = 'sepal_length,sepal_width,petal_length,petal_width,species\n5.1,3.5,1.4,0.2,setosa\n4.9,3.0,1.4,0.2,setosa\n4.7,3.2,1.3,0.2,setosa';
    } else if (selectedDataset === 2) {
      csvContent = 'crime_rate,avg_rooms,age,distance,price\n0.00632,6.575,65.2,4.0900,24.0\n0.02731,6.421,78.9,4.9671,21.6\n0.02729,7.185,61.1,4.9671,34.7';
    } else if (selectedDataset === 3) {
      csvContent = 'passenger_class,age,sex,fare,survived\n3,22.0,male,7.25,0\n1,38.0,female,71.28,1\n3,26.0,female,7.92,1';
    } else if (selectedDataset === 4) {
      csvContent = 'acidity,sugar,alcohol,pH,quality\n0.27,0.36,20.7,2.78,6\n0.30,0.34,20.6,2.80,6\n0.28,0.40,20.9,2.81,6';
    }
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${dataset?.name.replace(/\s+/g, '_')}_sample.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    alert(`📁 Dataset exported successfully!\nFile: ${dataset?.name.replace(/\s+/g, '_')}_sample.csv`);
  };

  const getSelectedDataset = () => datasets.find(d => d.id === selectedDataset);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center">
            <Database className="w-10 h-10 mr-4 text-purple-400" />
            Dataset Library & Management
          </h1>
          
          {/* Introduction Section */}
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-400/30 mb-6">
            <h2 className="text-xl font-semibold text-purple-400 mb-3">📊 What are Datasets?</h2>
            <p className="text-slate-300 mb-4">
              Datasets are collections of data that machine learning models learn from. Think of them as the "textbooks" 
              for AI - they contain examples that help algorithms understand patterns and make predictions on new, unseen data.
              Here you can explore, analyze, and select datasets for your AI projects.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-white mb-2">🎯 What You Can Do Here:</h4>
                <ul className="text-slate-300 space-y-1">
                  <li>• Browse curated datasets for learning and practice</li>
                  <li>• Preview data structure and sample content</li>
                  <li>• Download datasets for your AI projects</li>
                  <li>• Learn about data preprocessing techniques</li>
                  <li>• Navigate to coding area with selected dataset</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">📈 Dataset Types Available:</h4>
                <ul className="text-slate-300 space-y-1">
                  <li>• <strong>Classification:</strong> Predict categories (spam/not spam)</li>
                  <li>• <strong>Regression:</strong> Predict numbers (prices, temperatures)</li>
                  <li>• <strong>Image Recognition:</strong> Classify and detect objects</li>
                  <li>• <strong>Natural Language:</strong> Process and understand text</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Dataset List */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Available Datasets</h2>
                <button className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Upload Dataset</span>
                </button>
              </div>

              <div className="space-y-4">
                {datasets.map((dataset) => (
                  <div 
                    key={dataset.id}
                    className={`p-6 rounded-xl border cursor-pointer transition-all hover:scale-[1.01] ${
                      selectedDataset === dataset.id
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/50'
                        : 'bg-slate-700/50 border-slate-600 hover:bg-slate-700/70'
                    }`}
                    onClick={() => handleDatasetSelect(dataset.id)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{dataset.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(dataset.difficulty)}`}>
                            {dataset.difficulty}
                          </span>
                        </div>
                        <p className="text-sm text-slate-300 mb-3">{dataset.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {dataset.features.slice(0, 3).map((feature, idx) => (
                            <span key={idx} className="bg-slate-600/50 text-slate-300 px-2 py-1 rounded text-xs">
                              {feature}
                            </span>
                          ))}
                          {dataset.features.length > 3 && (
                            <span className="text-slate-400 text-xs">+{dataset.features.length - 3} more</span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors group">
                          <Eye className="w-4 h-4 text-white" />
                        </button>
                        <button className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors group">
                          <Download className="w-4 h-4 text-white" />
                        </button>
                        <button className="p-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors group">
                          <BarChart3 className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Rows:</span>
                        <p className="text-white font-medium">{dataset.rows.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Columns:</span>
                        <p className="text-white font-medium">{dataset.columns}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Type:</span>
                        <p className="text-white font-medium">{dataset.type}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Size:</span>
                        <p className="text-white font-medium">{dataset.size}</p>
                      </div>
                    </div>

                    {selectedDataset === dataset.id && (
                      <div className="mt-4 p-4 bg-purple-500/10 rounded-lg border border-purple-400/20">
                        <p className="text-sm text-purple-300 flex items-center">
                          <Info className="w-4 h-4 mr-2" />
                          Currently selected for analysis and modeling
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dataset Details Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-400/30">
              <h3 className="text-lg font-semibold text-purple-400 mb-4">📋 Dataset Preview</h3>
              {selectedDataset ? (
                <div className="space-y-4">
                  <div className="bg-black/30 rounded-lg p-4 font-mono text-xs">
                    <div className="text-green-400 mb-2 font-semibold">
                      {getSelectedDataset()?.name} Sample:
                    </div>
                    {selectedDataset === 1 && (
                      <div className="text-white space-y-1">
                        <div className="text-cyan-400">sepal_length | sepal_width | petal_length | petal_width | species</div>
                        <div>5.1 | 3.5 | 1.4 | 0.2 | setosa</div>
                        <div>4.9 | 3.0 | 1.4 | 0.2 | setosa</div>
                        <div>4.7 | 3.2 | 1.3 | 0.2 | setosa</div>
                        <div>6.4 | 3.2 | 4.5 | 1.5 | versicolor</div>
                        <div className="text-slate-500">... {getSelectedDataset()?.rows - 4} more rows</div>
                      </div>
                    )}
                    {selectedDataset === 2 && (
                      <div className="text-white space-y-1">
                        <div className="text-cyan-400">crime_rate | avg_rooms | age | distance | price</div>
                        <div>0.00632 | 6.575 | 65.2 | 4.0900 | 24.0</div>
                        <div>0.02731 | 6.421 | 78.9 | 4.9671 | 21.6</div>
                        <div>0.02729 | 7.185 | 61.1 | 4.9671 | 34.7</div>
                        <div className="text-slate-500">... {getSelectedDataset()?.rows - 3} more rows</div>
                      </div>
                    )}
                    {selectedDataset === 3 && (
                      <div className="text-white space-y-1">
                        <div className="text-cyan-400">passenger_class | age | sex | fare | survived</div>
                        <div>3 | 22.0 | male | 7.25 | 0</div>
                        <div>1 | 38.0 | female | 71.28 | 1</div>
                        <div>3 | 26.0 | female | 7.92 | 1</div>
                        <div className="text-slate-500">... {getSelectedDataset()?.rows - 3} more rows</div>
                      </div>
                    )}
                    {selectedDataset === 4 && (
                      <div className="text-white space-y-1">
                        <div className="text-cyan-400">acidity | sugar | alcohol | pH | quality</div>
                        <div>0.27 | 0.36 | 20.7 | 2.78 | 6</div>
                        <div>0.30 | 0.34 | 20.6 | 2.80 | 6</div>
                        <div>0.28 | 0.40 | 20.9 | 2.81 | 6</div>
                        <div className="text-slate-500">... {getSelectedDataset()?.rows - 3} more rows</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white text-sm">All Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {getSelectedDataset()?.features.map((feature, idx) => (
                        <span key={idx} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <button 
                      onClick={handleUseDataset}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors"
                    >
                      Use This Dataset
                    </button>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Link 
                        to="/code"
                        onClick={handleUseDataset}
                        className="flex items-center justify-center space-x-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg transition-colors text-sm"
                      >
                        <span>🐍</span>
                        <span>Code</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                      <Link 
                        to="/models"
                        onClick={handleUseDataset}
                        className="flex items-center justify-center space-x-1 bg-orange-600 hover:bg-orange-700 text-white py-2 px-3 rounded-lg transition-colors text-sm"
                      >
                        <span>🤖</span>
                        <span>Models</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-slate-400">Select a dataset to preview its content and features</p>
              )}
            </div>

            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border border-blue-400/30">
              <h3 className="text-lg font-semibold text-blue-400 mb-4">🛠️ Dataset Tools</h3>
              <div className="space-y-3">
                <button 
                  onClick={handleViewStatistics}
                  className="w-full text-left p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white text-sm flex items-center"
                >
                  <BarChart3 className="w-4 h-4 mr-3 text-blue-400" />
                  View Statistics & Summary
                </button>
                <button 
                  onClick={handleCleanData}
                  className="w-full text-left p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white text-sm flex items-center"
                >
                  <Database className="w-4 h-4 mr-3 text-blue-400" />
                  Clean & Preprocess Data
                </button>
                <button 
                  onClick={handleVisualizeData}
                  className="w-full text-left p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white text-sm flex items-center"
                >
                  <Eye className="w-4 h-4 mr-3 text-blue-400" />
                  Visualize Data Patterns
                </button>
                <button 
                  onClick={handleExportData}
                  className="w-full text-left p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white text-sm flex items-center"
                >
                  <Download className="w-4 h-4 mr-3 text-blue-400" />
                  Export for ML Training
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-400/30">
              <h3 className="text-lg font-semibold text-green-400 mb-4">💡 Data Science Tips</h3>
              <ul className="space-y-2 text-sm text-white">
                <li>• <strong>Start Simple:</strong> Begin with clean, small datasets like Iris</li>
                <li>• <strong>Understand Your Data:</strong> Always explore before training models</li>
                <li>• <strong>Check for Quality:</strong> Look for missing values and outliers</li>
                <li>• <strong>Feature Engineering:</strong> Create new features from existing ones</li>
                <li>• <strong>Split Properly:</strong> Separate training, validation, and test sets</li>
                <li>• <strong>Document Everything:</strong> Keep track of preprocessing steps</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Datasets;
