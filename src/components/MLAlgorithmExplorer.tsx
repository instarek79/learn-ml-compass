
import React, { useState } from 'react';
import { Brain, TrendingUp, GitBranch, Network, Target, ChevronRight, Lightbulb, HelpCircle, Settings, Sliders } from 'lucide-react';

interface AlgorithmParameter {
  name: string;
  description: string;
  type: 'number' | 'select' | 'boolean';
  defaultValue: any;
  options?: string[];
  min?: number;
  max?: number;
}

interface Algorithm {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  category: string;
  story: string;
  problem: string;
  solution: string;
  realWorld: string[];
  pros: string[];
  cons: string[];
  hint: string;
  interactiveQuestion: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  parameters: AlgorithmParameter[];
}

const algorithms: Algorithm[] = [
  {
    id: 'linear_regression',
    name: 'Linear Regression',
    icon: TrendingUp,
    category: 'Regression',
    story: "Imagine you're a detective trying to solve the mystery of house prices. You notice that bigger houses tend to cost more. Linear regression is like drawing the best possible straight line through all the house data points to predict prices.",
    problem: "You want to predict a continuous number (like price, temperature, or sales) based on other factors.",
    solution: "Find the best straight line that fits through your data points. This line becomes your crystal ball for making predictions!",
    realWorld: ["Predicting house prices based on size", "Forecasting sales based on advertising spend", "Estimating temperature based on altitude"],
    pros: ["Simple and fast", "Easy to understand", "Works well with linear relationships"],
    cons: ["Only captures straight-line relationships", "Sensitive to outliers", "May oversimplify complex patterns"],
    hint: "Think of it as finding the best-fit line in a scatter plot - like the trend line in Excel!",
    interactiveQuestion: "If you're predicting house prices and you know that each additional square foot adds $100 to the price, and a 1000 sq ft house costs $200,000, what would a 1500 sq ft house cost?",
    options: ["$250,000", "$300,000", "$350,000", "$400,000"],
    correctAnswer: 0,
    explanation: "1500 sq ft house = $200,000 + (500 extra sq ft × $100) = $250,000",
    parameters: [
      {
        name: "Learning Rate",
        description: "How fast the algorithm learns from mistakes",
        type: "number",
        defaultValue: 0.01,
        min: 0.001,
        max: 1
      },
      {
        name: "Regularization",
        description: "Prevents overfitting by penalizing complex models",
        type: "select",
        defaultValue: "none",
        options: ["none", "ridge", "lasso", "elastic_net"]
      },
      {
        name: "Fit Intercept",
        description: "Whether to calculate the intercept term",
        type: "boolean",
        defaultValue: true
      }
    ]
  },
  {
    id: 'decision_tree',
    name: 'Decision Tree',
    icon: GitBranch,
    category: 'Classification',
    story: "Picture yourself as a doctor making a diagnosis. You ask questions like 'Does the patient have a fever?' If yes, you ask 'Is it above 102°F?' Each question branches into more questions until you reach a diagnosis. That's exactly how decision trees work!",
    problem: "You need to make decisions or classifications by asking a series of yes/no questions.",
    solution: "Build a tree of questions where each branch represents a decision path, leading to a final answer or classification.",
    realWorld: ["Medical diagnosis systems", "Loan approval decisions", "Email spam detection"],
    pros: ["Easy to understand and visualize", "No assumptions about data distribution", "Handles both numbers and categories"],
    cons: ["Can become overly complex", "Sensitive to small data changes", "May memorize training data too well"],
    hint: "It's like playing '20 Questions' - each question narrows down the possibilities!",
    interactiveQuestion: "In a decision tree for loan approval, what would be the BEST first question to ask?",
    options: ["What's your favorite color?", "What's your annual income?", "What's your shoe size?", "What's your pet's name?"],
    correctAnswer: 1,
    explanation: "Annual income is most relevant for loan decisions - it directly impacts ability to repay!",
    parameters: [
      {
        name: "Max Depth",
        description: "Maximum depth of the tree to prevent overfitting",
        type: "number",
        defaultValue: 5,
        min: 1,
        max: 20
      },
      {
        name: "Min Samples Split",
        description: "Minimum number of samples required to split a node",
        type: "number",
        defaultValue: 2,
        min: 2,
        max: 100
      },
      {
        name: "Criterion",
        description: "Function to measure quality of a split",
        type: "select",
        defaultValue: "gini",
        options: ["gini", "entropy", "log_loss"]
      }
    ]
  },
  {
    id: 'neural_network',
    name: 'Neural Network',
    category: 'Deep Learning',
    icon: Network,
    story: "Imagine your brain as a network of neurons, each receiving signals, processing them, and passing messages to other neurons. Neural networks mimic this process - artificial neurons receive data, transform it, and pass it forward until the network makes a decision or prediction.",
    problem: "You have complex patterns that simple algorithms can't capture, like recognizing faces in photos or understanding speech.",
    solution: "Create layers of artificial neurons that work together to learn complex patterns by adjusting their connections based on examples.",
    realWorld: ["Image recognition (face detection)", "Voice assistants (Siri, Alexa)", "Language translation"],
    pros: ["Can learn any pattern", "Excellent for complex problems", "Continuously improves with more data"],
    cons: ["Requires lots of data", "Slow to train", "Hard to understand why it makes decisions"],
    hint: "Think of it as a team of specialists, each layer becoming an expert at recognizing different features!",
    interactiveQuestion: "Why do neural networks need multiple layers?",
    options: ["To make them look complex", "To learn simple patterns only", "To learn increasingly complex patterns", "To slow down processing"],
    correctAnswer: 2,
    explanation: "Each layer learns more complex features - first layer might detect edges, second layer shapes, third layer objects!",
    parameters: [
      {
        name: "Hidden Layers",
        description: "Number of hidden layers in the network",
        type: "number",
        defaultValue: 2,
        min: 1,
        max: 10
      },
      {
        name: "Neurons per Layer",
        description: "Number of neurons in each hidden layer",
        type: "number",
        defaultValue: 64,
        min: 8,
        max: 512
      },
      {
        name: "Activation Function",
        description: "Function that determines neuron output",
        type: "select",
        defaultValue: "relu",
        options: ["relu", "sigmoid", "tanh", "softmax"]
      },
      {
        name: "Dropout Rate",
        description: "Percentage of neurons to randomly ignore during training",
        type: "number",
        defaultValue: 0.2,
        min: 0,
        max: 0.8
      }
    ]
  }
];

export const MLAlgorithmExplorer = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>(algorithms[0]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showParameters, setShowParameters] = useState(false);
  const [parameterValues, setParameterValues] = useState<{[key: string]: any}>({});

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const handleParameterChange = (paramName: string, value: any) => {
    setParameterValues(prev => ({
      ...prev,
      [paramName]: value
    }));
  };

  const renderParameterInput = (param: AlgorithmParameter) => {
    const currentValue = parameterValues[param.name] ?? param.defaultValue;

    switch (param.type) {
      case 'number':
        return (
          <input
            type="number"
            value={currentValue}
            min={param.min}
            max={param.max}
            step={param.min && param.min < 1 ? 0.001 : 1}
            onChange={(e) => handleParameterChange(param.name, parseFloat(e.target.value))}
            className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-purple-400 focus:outline-none"
          />
        );
      case 'select':
        return (
          <select
            value={currentValue}
            onChange={(e) => handleParameterChange(param.name, e.target.value)}
            className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-purple-400 focus:outline-none"
          >
            {param.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'boolean':
        return (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={currentValue}
              onChange={(e) => handleParameterChange(param.name, e.target.checked)}
              className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
            />
            <span className="text-slate-300">{currentValue ? 'Enabled' : 'Disabled'}</span>
          </label>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
          <Brain className="w-8 h-8 mr-3 text-purple-400" />
          Interactive ML Algorithm Explorer
        </h2>
        <p className="text-slate-300">Learn algorithms through stories, examples, and interactive challenges!</p>
      </div>

      {/* Algorithm Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {algorithms.map((algorithm) => {
          const Icon = algorithm.icon;
          return (
            <button
              key={algorithm.id}
              onClick={() => {
                setSelectedAlgorithm(algorithm);
                resetQuiz();
                setShowParameters(false);
              }}
              className={`p-4 rounded-xl border transition-all ${
                selectedAlgorithm.id === algorithm.id
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/50'
                  : 'bg-slate-700/50 border-slate-600 hover:bg-slate-700/70'
              }`}
            >
              <Icon className={`w-6 h-6 mb-2 ${
                selectedAlgorithm.id === algorithm.id ? 'text-purple-400' : 'text-slate-400'
              }`} />
              <h3 className="font-semibold text-white text-sm">{algorithm.name}</h3>
              <p className="text-xs text-slate-400">{algorithm.category}</p>
            </button>
          );
        })}
      </div>

      {/* Algorithm Parameters Toggle */}
      <div className="mb-6">
        <button
          onClick={() => setShowParameters(!showParameters)}
          className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span>{showParameters ? 'Hide Parameters' : 'Show Parameters'}</span>
        </button>
      </div>

      {/* Parameters Section */}
      {showParameters && (
        <div className="mb-8 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-xl p-6 border border-purple-400/20">
          <h3 className="text-lg font-semibold text-purple-400 mb-4 flex items-center">
            <Sliders className="w-5 h-5 mr-2" />
            Algorithm Parameters
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedAlgorithm.parameters.map((param, index) => (
              <div key={index} className="bg-slate-700/30 rounded-lg p-4">
                <label className="block text-white font-medium mb-1">{param.name}</label>
                <p className="text-slate-400 text-xs mb-3">{param.description}</p>
                {renderParameterInput(param)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Algorithm Details */}
      <div className="space-y-6">
        {/* Story Section */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-400/20">
          <h3 className="text-lg font-semibold text-blue-400 mb-3 flex items-center">
            📚 The Story
          </h3>
          <p className="text-slate-200 leading-relaxed">{selectedAlgorithm.story}</p>
        </div>

        {/* Problem & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl p-6 border border-red-400/20">
            <h3 className="text-lg font-semibold text-red-400 mb-3 flex items-center">
              🎯 The Problem
            </h3>
            <p className="text-slate-200">{selectedAlgorithm.problem}</p>
          </div>
          
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-6 border border-green-400/20">
            <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center">
              💡 The Solution
            </h3>
            <p className="text-slate-200">{selectedAlgorithm.solution}</p>
          </div>
        </div>

        {/* Real World Examples */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl p-6 border border-cyan-400/20">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3 flex items-center">
            🌍 Real-World Applications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {selectedAlgorithm.realWorld.map((example, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-3">
                <p className="text-slate-200 text-sm">{example}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pros and Cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-6 border border-green-400/20">
            <h3 className="text-lg font-semibold text-green-400 mb-3">✅ Strengths</h3>
            <ul className="space-y-2">
              {selectedAlgorithm.pros.map((pro, index) => (
                <li key={index} className="text-slate-200 text-sm flex items-start">
                  <ChevronRight className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  {pro}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-6 border border-yellow-400/20">
            <h3 className="text-lg font-semibold text-yellow-400 mb-3">⚠️ Limitations</h3>
            <ul className="space-y-2">
              {selectedAlgorithm.cons.map((con, index) => (
                <li key={index} className="text-slate-200 text-sm flex items-start">
                  <ChevronRight className="w-4 h-4 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Hint */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-400/20">
          <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center">
            <Lightbulb className="w-5 h-5 mr-2" />
            Quick Hint
          </h3>
          <p className="text-slate-200">{selectedAlgorithm.hint}</p>
        </div>

        {/* Interactive Quiz */}
        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl p-6 border border-indigo-400/20">
          <h3 className="text-lg font-semibold text-indigo-400 mb-4 flex items-center">
            <HelpCircle className="w-5 h-5 mr-2" />
            Test Your Understanding
          </h3>
          
          {!showQuiz ? (
            <button
              onClick={() => setShowQuiz(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Take the Challenge! 🚀
            </button>
          ) : (
            <div className="space-y-4">
              <p className="text-slate-200 font-medium">{selectedAlgorithm.interactiveQuestion}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedAlgorithm.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      selectedAnswer === null
                        ? 'bg-slate-700/50 border-slate-600 hover:bg-slate-700/70 text-slate-200'
                        : selectedAnswer === index
                        ? index === selectedAlgorithm.correctAnswer
                          ? 'bg-green-500/20 border-green-400/50 text-green-300'
                          : 'bg-red-500/20 border-red-400/50 text-red-300'
                        : index === selectedAlgorithm.correctAnswer
                        ? 'bg-green-500/20 border-green-400/50 text-green-300'
                        : 'bg-slate-700/30 border-slate-600 text-slate-400'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {showExplanation && (
                <div className={`p-4 rounded-lg border ${
                  selectedAnswer === selectedAlgorithm.correctAnswer
                    ? 'bg-green-500/20 border-green-400/30'
                    : 'bg-blue-500/20 border-blue-400/30'
                }`}>
                  <p className="text-white font-medium mb-2">
                    {selectedAnswer === selectedAlgorithm.correctAnswer ? '🎉 Correct!' : '💡 Good try!'}
                  </p>
                  <p className="text-slate-200">{selectedAlgorithm.explanation}</p>
                  
                  <button
                    onClick={resetQuiz}
                    className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Try Another Question
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
