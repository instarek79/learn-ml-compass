
import React, { useState, useEffect } from 'react';
import { Code, Lightbulb, FileText, ArrowLeft } from 'lucide-react';
import { CodeExecutor } from '../components/CodeExecutor';
import { Link } from 'react-router-dom';

const CodingArea = () => {
  const [code, setCode] = useState(`# Welcome to the AI Coding Area!
# This interactive Python environment connects to a Flask backend for execution

# Example: Simple Machine Learning with Python
import numpy as np
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt

# Generate sample data
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2, 4, 6, 8, 10])

# Create and train model
model = LinearRegression()
model.fit(X, y)

# Make prediction
prediction = model.predict([[6]])
print(f"Predicted value for input 6: {prediction[0]:.2f}")

# Model info
print(f"Model coefficient: {model.coef_[0]:.2f}")
print(f"Model intercept: {model.intercept_:.2f}")
`);

  const [selectedExample, setSelectedExample] = useState('ml_basics');

  // Load shared code from learning modules
  useEffect(() => {
    const sharedCode = localStorage.getItem('sharedCode');
    if (sharedCode) {
      setCode(sharedCode);
      localStorage.removeItem('sharedCode'); // Clear after use
    }
  }, []);

  const codeExamples = {
    ml_basics: `# Machine Learning Basics
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

# Generate sample data
np.random.seed(42)
X = np.random.rand(100, 1) * 10  # Features
y = 2 * X.flatten() + 1 + np.random.rand(100) * 2  # Target with noise

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"Mean Squared Error: {mse:.4f}")
print(f"R² Score: {r2:.4f}")
print(f"Model equation: y = {model.coef_[0]:.2f}x + {model.intercept_:.2f}")
`,
    data_analysis: `# Data Analysis with Pandas
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Create sample dataset
np.random.seed(42)
data = {
    'age': np.random.randint(18, 80, 100),
    'income': np.random.normal(50000, 15000, 100),
    'education': np.random.choice(['High School', 'Bachelor', 'Master', 'PhD'], 100),
    'satisfaction': np.random.randint(1, 11, 100)
}

df = pd.DataFrame(data)
df['income'] = np.abs(df['income'])  # Ensure positive income

# Basic statistics
print("Dataset Info:")
print(df.info())
print("\\nDescriptive Statistics:")
print(df.describe())

# Group analysis
print("\\nAverage income by education level:")
education_income = df.groupby('education')['income'].mean().sort_values(ascending=False)
print(education_income)

# Correlation analysis
print("\\nCorrelation between age and income:")
correlation = df['age'].corr(df['income'])
print(f"Correlation coefficient: {correlation:.3f}")
`,
    neural_network: `# Simple Neural Network from Scratch
import numpy as np

class NeuralNetwork:
    def __init__(self, input_size, hidden_size, output_size, learning_rate=0.1):
        # Initialize weights and biases
        self.W1 = np.random.randn(input_size, hidden_size) * 0.1
        self.b1 = np.zeros((1, hidden_size))
        self.W2 = np.random.randn(hidden_size, output_size) * 0.1
        self.b2 = np.zeros((1, output_size))
        self.learning_rate = learning_rate
    
    def sigmoid(self, x):
        return 1 / (1 + np.exp(-np.clip(x, -250, 250)))
    
    def sigmoid_derivative(self, x):
        return x * (1 - x)
    
    def forward(self, X):
        self.z1 = np.dot(X, self.W1) + self.b1
        self.a1 = self.sigmoid(self.z1)
        self.z2 = np.dot(self.a1, self.W2) + self.b2
        self.a2 = self.sigmoid(self.z2)
        return self.a2
    
    def backward(self, X, y, output):
        m = X.shape[0]
        
        # Calculate gradients
        dZ2 = output - y
        dW2 = (1/m) * np.dot(self.a1.T, dZ2)
        db2 = (1/m) * np.sum(dZ2, axis=0, keepdims=True)
        
        dA1 = np.dot(dZ2, self.W2.T)
        dZ1 = dA1 * self.sigmoid_derivative(self.a1)
        dW1 = (1/m) * np.dot(X.T, dZ1)
        db1 = (1/m) * np.sum(dZ1, axis=0, keepdims=True)
        
        # Update weights
        self.W2 -= self.learning_rate * dW2
        self.b2 -= self.learning_rate * db2
        self.W1 -= self.learning_rate * dW1
        self.b1 -= self.learning_rate * db1

# Create XOR dataset
X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
y = np.array([[0], [1], [1], [0]])

# Create and train network
nn = NeuralNetwork(2, 4, 1, learning_rate=1)

print("Training Neural Network on XOR problem...")
for epoch in range(1000):
    output = nn.forward(X)
    nn.backward(X, y, output)
    
    if epoch % 250 == 0:
        loss = np.mean(np.square(y - output))
        print(f"Epoch {epoch}, Loss: {loss:.6f}")

# Final predictions
final_output = nn.forward(X)
print("\\nFinal Predictions:")
for i in range(len(X)):
    print(f"Input: {X[i]} -> Predicted: {final_output[i][0]:.4f}, Expected: {y[i][0]}")
`,
    classification: `# Classification with Scikit-Learn
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.preprocessing import StandardScaler
import numpy as np

# Generate classification dataset
X, y = make_classification(
    n_samples=1000,
    n_features=10,
    n_informative=5,
    n_redundant=2,
    n_classes=3,
    random_state=42
)

# Split the data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Scale the features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train Random Forest classifier
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train_scaled, y_train)

# Make predictions
y_pred = clf.predict(X_test_scaled)

# Evaluate the model
accuracy = clf.score(X_test_scaled, y_test)
print(f"Accuracy: {accuracy:.3f}")

print("\\nClassification Report:")
print(classification_report(y_test, y_pred))

print("\\nFeature Importance:")
feature_importance = clf.feature_importances_
for i, importance in enumerate(feature_importance):
    print(f"Feature {i+1}: {importance:.4f}")

# Confusion Matrix
print("\\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))
`,
    deep_learning: `# Deep Learning with TensorFlow/Keras Simulation
# Note: This is a conceptual example - actual implementation would require TensorFlow
import numpy as np

class SimpleDeepNetwork:
    def __init__(self, layers):
        self.layers = layers
        self.weights = []
        self.biases = []
        
        # Initialize weights and biases for each layer
        for i in range(len(layers) - 1):
            w = np.random.randn(layers[i], layers[i+1]) * 0.1
            b = np.zeros((1, layers[i+1]))
            self.weights.append(w)
            self.biases.append(b)
    
    def relu(self, x):
        return np.maximum(0, x)
    
    def softmax(self, x):
        exp_x = np.exp(x - np.max(x, axis=1, keepdims=True))
        return exp_x / np.sum(exp_x, axis=1, keepdims=True)
    
    def forward(self, X):
        activation = X
        
        for i, (w, b) in enumerate(zip(self.weights, self.biases)):
            z = np.dot(activation, w) + b
            
            if i == len(self.weights) - 1:  # Output layer
                activation = self.softmax(z)
            else:  # Hidden layers
                activation = self.relu(z)
        
        return activation

# Create a deep network architecture
# Input: 784 features (like MNIST images: 28x28)
# Hidden: 128, 64, 32 neurons
# Output: 10 classes (digits 0-9)
network_architecture = [784, 128, 64, 32, 10]
deep_net = SimpleDeepNetwork(network_architecture)

# Simulate input data (flattened 28x28 images)
batch_size = 32
sample_input = np.random.randn(batch_size, 784)

# Forward pass
predictions = deep_net.forward(sample_input)

print("Deep Learning Network Architecture:")
for i, layer_size in enumerate(network_architecture):
    layer_type = "Input" if i == 0 else "Output" if i == len(network_architecture)-1 else f"Hidden {i}"
    print(f"{layer_type} Layer: {layer_size} neurons")

print(f"\\nBatch size: {batch_size}")
print(f"Predictions shape: {predictions.shape}")
print(f"Sample prediction (first image): {predictions[0]}")
print(f"Predicted class: {np.argmax(predictions[0])}")

# Calculate total parameters
total_params = sum(w.size + b.size for w, b in zip(deep_net.weights, deep_net.biases))
print(f"\\nTotal trainable parameters: {total_params:,}")
`
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center">
            <Code className="w-10 h-10 mr-4 text-green-400" />
            Interactive Python Coding & Practice Area
          </h1>
          
          {/* Introduction Section */}
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-400/30 mb-6">
            <h2 className="text-xl font-semibold text-green-400 mb-3">🐍 What is the Python Coding Area?</h2>
            <p className="text-slate-300 mb-4">
              Your hands-on Python programming environment designed specifically for AI and machine learning practice. 
              Write, execute, and experiment with Python code, try different algorithms, and see results in real-time 
              through integration with a Flask backend server.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-white mb-2">⚡ Features Available:</h4>
                <ul className="text-slate-300 space-y-1">
                  <li>• Interactive Python code editor with syntax highlighting</li>
                  <li>• Real-time code execution via Flask backend</li>
                  <li>• Pre-built AI/ML examples and templates</li>
                  <li>• Integration with learning modules</li>
                  <li>• Support for popular ML libraries (NumPy, Pandas, Scikit-learn)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">🎯 What You Can Practice:</h4>
                <ul className="text-slate-300 space-y-1">
                  <li>• Machine learning algorithms implementation</li>
                  <li>• Data analysis and visualization</li>
                  <li>• Neural networks from scratch</li>
                  <li>• Classification and regression problems</li>
                  <li>• Deep learning concepts</li>
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
                <Link 
                  to="/learn"
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Learning</span>
                </Link>
              </div>
              
              <CodeExecutor code={code} onCodeChange={setCode} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border border-blue-400/30">
              <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                Learning Notes
              </h3>
              <div className="space-y-3 text-sm text-white">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-medium mb-1">🔗 Flask Backend</p>
                  <p className="text-slate-300">Set up a Flask server at /api/execute-python to run Python code securely</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-medium mb-1">📊 ML Libraries</p>
                  <p className="text-slate-300">NumPy, Pandas, Scikit-learn, and Matplotlib are supported</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-medium mb-1">🧠 Practice Tip</p>
                  <p className="text-slate-300">Start with simple examples and gradually increase complexity</p>
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
                  { id: 'ml_basics', name: 'ML Basics', desc: 'Linear regression and evaluation' },
                  { id: 'data_analysis', name: 'Data Analysis', desc: 'Pandas and statistics' },
                  { id: 'neural_network', name: 'Neural Networks', desc: 'Build networks from scratch' },
                  { id: 'classification', name: 'Classification', desc: 'Random Forest classifier' },
                  { id: 'deep_learning', name: 'Deep Learning', desc: 'Multi-layer networks' }
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
              <h3 className="text-lg font-semibold text-green-400 mb-4">🚀 Setup Flask Backend</h3>
              <div className="text-sm text-white space-y-3">
                <p>To enable Python execution, create a Flask server:</p>
                <div className="bg-black/30 rounded p-3 font-mono text-xs text-green-400">
                  <div># Flask server example</div>
                  <div>from flask import Flask, request</div>
                  <div>import subprocess</div>
                  <div></div>
                  <div>app = Flask(__name__)</div>
                  <div></div>
                  <div>@app.route('/api/execute-python',</div>
                  <div>&nbsp;&nbsp;methods=['POST'])</div>
                  <div>def execute_code():</div>
                  <div>&nbsp;&nbsp;# Secure execution logic</div>
                  <div>&nbsp;&nbsp;# Return JSON response</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-6 border border-orange-400/30">
              <h3 className="text-lg font-semibold text-orange-400 mb-4">💡 Coding Tips</h3>
              <ul className="space-y-2 text-sm text-white">
                <li>• Use print() statements to debug and understand your code</li>
                <li>• Start with simple examples before building complex models</li>
                <li>• Experiment with different parameters and algorithms</li>
                <li>• Comment your code to remember what each part does</li>
                <li>• Test edge cases and validate your results</li>
                <li>• Click example buttons to load pre-built templates</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingArea;
