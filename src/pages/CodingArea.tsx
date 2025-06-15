
import React, { useState } from 'react';
import { Play, Code, FileText, Lightbulb, BookOpen, Zap } from 'lucide-react';
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

  const [selectedExample, setSelectedExample] = useState('linear_regression');

  const codeExamples = {
    linear_regression: `# Linear Regression Example
import numpy as np
import matplotlib.pyplot as plt

# Generate sample data
x = np.array([1, 2, 3, 4, 5])
y = np.array([2, 4, 6, 8, 10])

# Calculate slope and intercept
slope = np.sum((x - np.mean(x)) * (y - np.mean(y))) / np.sum((x - np.mean(x))**2)
intercept = np.mean(y) - slope * np.mean(x)

print(f"Linear equation: y = {slope}x + {intercept}")
`,
    classification: `# Classification Example with Logistic Regression
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import make_classification

# Generate sample classification data
X, y = make_classification(n_samples=100, n_features=2, n_redundant=0, n_informative=2, n_clusters_per_class=1)

# Create and train the model
model = LogisticRegression()
model.fit(X, y)

# Make predictions
predictions = model.predict(X[:5])
probabilities = model.predict_proba(X[:5])

print("Predictions:", predictions)
print("Probabilities:", probabilities)
`,
    clustering: `# K-Means Clustering Example
import numpy as np
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

# Generate sample data
np.random.seed(42)
X = np.random.rand(100, 2) * 10

# Apply K-Means clustering
kmeans = KMeans(n_clusters=3, random_state=42)
clusters = kmeans.fit_predict(X)

# Print cluster centers
print("Cluster centers:")
print(kmeans.cluster_centers_)
print("Number of points in each cluster:", np.bincount(clusters))
`,
    neural_network: `# Simple Neural Network Example
import numpy as np

class SimpleNeuralNetwork:
    def __init__(self):
        # Initialize weights randomly
        self.weights = np.random.rand(2, 1) - 0.5
        self.bias = np.random.rand(1) - 0.5
    
    def sigmoid(self, x):
        return 1 / (1 + np.exp(-x))
    
    def forward(self, inputs):
        # Forward propagation
        weighted_sum = np.dot(inputs, self.weights) + self.bias
        return self.sigmoid(weighted_sum)

# Create and test the network
nn = SimpleNeuralNetwork()
test_input = np.array([[0.5, 0.3]])
output = nn.forward(test_input)
print(f"Neural network output: {output}")
`,
    decision_tree: `# Decision Tree Example
from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import make_classification
import numpy as np

# Generate sample data
X, y = make_classification(n_samples=100, n_features=4, n_redundant=0, n_informative=4, n_clusters_per_class=1)

# Create and train decision tree
dt = DecisionTreeClassifier(max_depth=3, random_state=42)
dt.fit(X, y)

# Make predictions
predictions = dt.predict(X[:5])
feature_importance = dt.feature_importances_

print("Predictions:", predictions)
print("Feature importance:", feature_importance)
print("Tree depth:", dt.get_depth())
`
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center">
            <Code className="w-10 h-10 mr-4 text-green-400" />
            Interactive Coding & Practice Area
          </h1>
          
          {/* Introduction Section */}
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-400/30 mb-6">
            <h2 className="text-xl font-semibold text-green-400 mb-3">🚀 What is the Coding Area?</h2>
            <p className="text-slate-300 mb-4">
              Your hands-on coding environment for practicing AI and machine learning concepts. Here you can write, 
              execute, and experiment with Python code, try different algorithms, and see results in real-time.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-white mb-2">💻 Features Available:</h4>
                <ul className="text-slate-300 space-y-1">
                  <li>• Interactive Python code editor</li>
                  <li>• Pre-built AI/ML examples</li>
                  <li>• Jupyter notebook integration</li>
                  <li>• Real-time code execution</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">🎯 What You Can Do:</h4>
                <ul className="text-slate-300 space-y-1">
                  <li>• Practice machine learning algorithms</li>
                  <li>• Experiment with data analysis</li>
                  <li>• Build and test AI models</li>
                  <li>• Learn through hands-on coding</li>
                </ul>
              </div>
            </div>
          </div>
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
                  <span className="text-slate-400 text-sm">ai_practice.py</span>
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
                <h3 className="text-sm font-semibold text-white mb-2 flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-green-400" />
                  Output:
                </h3>
                <div className="bg-black rounded-lg p-4 text-green-400 font-mono text-sm">
                  <div>Slope: 2.0</div>
                  <div>Intercept: 0.0</div>
                  <div>Prediction for x=6: 12.0</div>
                  <div className="text-gray-500 mt-2">Linear equation: y = 2.0x + 0.0</div>
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
                  <p className="text-slate-300">A method to model the relationship between variables using a straight line equation y = mx + b</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-medium mb-1">📊 Slope & Intercept</p>
                  <p className="text-slate-300">Slope (m) determines line steepness, intercept (b) is where line crosses y-axis</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-medium mb-1">🎯 Predictions</p>
                  <p className="text-slate-300">Use the learned equation to predict new values by substituting x</p>
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
                  { id: 'linear_regression', name: 'Linear Regression', desc: 'Basic prediction model' },
                  { id: 'classification', name: 'Classification', desc: 'Categorize data points' },
                  { id: 'clustering', name: 'K-Means Clustering', desc: 'Group similar data' },
                  { id: 'neural_network', name: 'Neural Networks', desc: 'Brain-inspired learning' },
                  { id: 'decision_tree', name: 'Decision Trees', desc: 'Rule-based decisions' }
                ].map((example) => (
                  <button 
                    key={example.id}
                    onClick={() => {
                      setSelectedExample(example.id);
                      setCode(codeExamples[example.id as keyof typeof codeExamples]);
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-colors text-sm ${
                      selectedExample === example.id 
                        ? 'bg-purple-500/30 border border-purple-400/50' 
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    <div className="font-medium text-white">{example.name}</div>
                    <div className="text-xs text-slate-300">{example.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-400/30">
              <h3 className="text-lg font-semibold text-green-400 mb-4">💡 Coding Tips</h3>
              <ul className="space-y-2 text-sm text-white">
                <li>• Try modifying the data values to see different results</li>
                <li>• Experiment with different algorithms from the examples</li>
                <li>• Use print() statements to debug and understand your code</li>
                <li>• Test edge cases and unusual inputs</li>
                <li>• Launch Jupyter for more advanced interactive analysis</li>
                <li>• Comment your code to remember what each part does</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingArea;
