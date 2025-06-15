
import React, { useState } from 'react';
import { Brain, TrendingUp, GitBranch, Network, Target, ChevronRight, Lightbulb, HelpCircle } from 'lucide-react';

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
    explanation: "1500 sq ft house = $200,000 + (500 extra sq ft × $100) = $250,000"
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
    explanation: "Annual income is most relevant for loan decisions - it directly impacts ability to repay!"
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
    explanation: "Each layer learns more complex features - first layer might detect edges, second layer shapes, third layer objects!"
  }
];

export const MLAlgorithmExplorer = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>(algorithms[0]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
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
