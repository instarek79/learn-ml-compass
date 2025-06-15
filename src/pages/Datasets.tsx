
import React, { useState } from 'react';
import { Database, Plus, Trash2, Download, Eye } from 'lucide-react';

const Datasets = () => {
  const [datasets, setDatasets] = useState([
    { id: 1, name: "Iris Flower Dataset", rows: 150, columns: 5, type: "Classification", size: "7.5 KB", description: "Classic dataset for flower classification" },
    { id: 2, name: "Boston Housing Prices", rows: 506, columns: 14, type: "Regression", size: "46 KB", description: "Housing prices in Boston area" },
    { id: 3, name: "Titanic Survivors", rows: 891, columns: 12, type: "Classification", size: "62 KB", description: "Passenger survival data from Titanic" },
    { id: 4, name: "Wine Quality", rows: 1599, columns: 12, type: "Regression", size: "84 KB", description: "Red wine quality ratings" },
  ]);

  const [selectedDataset, setSelectedDataset] = useState<number | null>(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <Database className="w-10 h-10 mr-4 text-purple-400" />
            Dataset Library
          </h1>
          <p className="text-xl text-slate-300">
            Explore, modify, and manage datasets for your machine learning projects
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Dataset List */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Available Datasets</h2>
                <button className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Add Dataset</span>
                </button>
              </div>

              <div className="space-y-4">
                {datasets.map((dataset) => (
                  <div 
                    key={dataset.id}
                    className={`p-6 rounded-xl border cursor-pointer transition-all ${
                      selectedDataset === dataset.id
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/50'
                        : 'bg-slate-700/50 border-slate-600 hover:bg-slate-700/70'
                    }`}
                    onClick={() => setSelectedDataset(dataset.id)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{dataset.name}</h3>
                        <p className="text-sm text-slate-300">{dataset.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-white" />
                        </button>
                        <button className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                          <Download className="w-4 h-4 text-white" />
                        </button>
                        <button className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-white" />
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
                        <p className="text-sm text-purple-300">✓ Currently selected dataset for ML training</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dataset Details */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-400/30">
              <h3 className="text-lg font-semibold text-purple-400 mb-4">Dataset Preview</h3>
              {selectedDataset ? (
                <div className="space-y-4">
                  <div className="bg-black/30 rounded-lg p-4 font-mono text-xs">
                    <div className="text-green-400 mb-2">sepal_length | sepal_width | petal_length | petal_width | species</div>
                    <div className="text-white space-y-1">
                      <div>5.1 | 3.5 | 1.4 | 0.2 | setosa</div>
                      <div>4.9 | 3.0 | 1.4 | 0.2 | setosa</div>
                      <div>4.7 | 3.2 | 1.3 | 0.2 | setosa</div>
                      <div>6.4 | 3.2 | 4.5 | 1.5 | versicolor</div>
                      <div>...</div>
                    </div>
                  </div>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors">
                    Set as Current Dataset
                  </button>
                </div>
              ) : (
                <p className="text-slate-400">Select a dataset to preview</p>
              )}
            </div>

            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border border-blue-400/30">
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Dataset Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white text-sm">
                  📊 View Statistics
                </button>
                <button className="w-full text-left p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white text-sm">
                  🧹 Clean Data
                </button>
                <button className="w-full text-left p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white text-sm">
                  📈 Visualize Data
                </button>
                <button className="w-full text-left p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white text-sm">
                  ✂️ Split Dataset
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-400/30">
              <h3 className="text-lg font-semibold text-green-400 mb-4">💡 Dataset Tips</h3>
              <ul className="space-y-2 text-sm text-white">
                <li>• Always explore your data before training</li>
                <li>• Check for missing values and outliers</li>
                <li>• Consider data preprocessing needs</li>
                <li>• Split data into train/validation/test sets</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Datasets;
