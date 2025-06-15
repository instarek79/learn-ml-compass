
import React, { useState } from 'react';
import { Brain, Lightbulb, Target, Zap, Play, CheckCircle } from 'lucide-react';
import { MLAlgorithmExplorer } from '../components/MLAlgorithmExplorer';

const LearnAI = () => {
  const [moduleProgress, setModuleProgress] = useState({
    intro: 0,
    data: 0,
    ml_basics: 0,
    neural_networks: 0
  });

  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const modules = [
    { 
      id: 'intro', 
      module: "Introduction to AI", 
      progress: moduleProgress.intro, 
      lessons: 6, 
      desc: "Basic concepts and history",
      content: "Learn the fundamentals of AI, its history, and key concepts that form the foundation of artificial intelligence."
    },
    { 
      id: 'data', 
      module: "Data and Datasets", 
      progress: moduleProgress.data, 
      lessons: 4, 
      desc: "Understanding data types and structures",
      content: "Explore different types of data, how to structure datasets, and prepare data for machine learning algorithms."
    },
    { 
      id: 'ml_basics', 
      module: "Machine Learning Basics", 
      progress: moduleProgress.ml_basics, 
      lessons: 8, 
      desc: "Supervised, unsupervised, and reinforcement learning",
      content: "Deep dive into the three main types of machine learning and understand when to use each approach."
    },
    { 
      id: 'neural_networks', 
      module: "Neural Networks", 
      progress: moduleProgress.neural_networks, 
      lessons: 5, 
      desc: "Building blocks of deep learning",
      content: "Understand how neural networks work, from basic perceptrons to deep learning architectures."
    },
  ];

  const handleModuleClick = (moduleId: string) => {
    setSelectedModule(moduleId);
    // Simulate progress update
    setModuleProgress(prev => ({
      ...prev,
      [moduleId]: Math.min(prev[moduleId as keyof typeof prev] + 20, 100)
    }));
  };

  const handleStartLesson = (moduleId: string) => {
    setModuleProgress(prev => ({
      ...prev,
      [moduleId]: Math.min(prev[moduleId as keyof typeof prev] + 10, 100)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <Brain className="w-10 h-10 mr-4 text-cyan-400" />
            Learn AI from Scratch
          </h1>
          <p className="text-xl text-slate-300">
            Master the fundamentals of Artificial Intelligence with interactive lessons
          </p>
        </div>

        {/* ML Algorithm Explorer */}
        <div className="mb-8">
          <MLAlgorithmExplorer />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">What is Artificial Intelligence?</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-6 border border-cyan-400/30">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-3 flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2" />
                    Key Concept
                  </h3>
                  <p className="text-slate-200 leading-relaxed">
                    AI is the simulation of human intelligence in machines that are programmed to think like humans 
                    and mimic their actions. The term may also be applied to any machine that exhibits traits 
                    associated with a human mind such as learning and problem-solving.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Machine Learning", desc: "Algorithms that improve through experience", color: "from-purple-500/20 to-pink-500/20 border-purple-400/30" },
                    { title: "Deep Learning", desc: "Neural networks with multiple layers", color: "from-green-500/20 to-emerald-500/20 border-green-400/30" },
                    { title: "Natural Language Processing", desc: "Understanding human language", color: "from-orange-500/20 to-red-500/20 border-orange-400/30" },
                    { title: "Computer Vision", desc: "Interpreting visual information", color: "from-blue-500/20 to-indigo-500/20 border-blue-400/30" },
                  ].map((item, index) => (
                    <div key={index} className={`bg-gradient-to-br ${item.color} rounded-xl p-4 border`}>
                      <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                      <p className="text-sm text-slate-300">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">Interactive Learning Modules</h2>
              
              <div className="space-y-4">
                {modules.map((module, index) => (
                  <div key={index} className="bg-slate-700/50 rounded-xl p-6 hover:bg-slate-700/70 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">{module.module}</h3>
                        <p className="text-sm text-slate-300 mb-3">{module.desc}</p>
                        
                        {selectedModule === module.id && (
                          <div className="bg-slate-600/50 rounded-lg p-4 mb-4">
                            <p className="text-slate-200 text-sm mb-3">{module.content}</p>
                            <button
                              onClick={() => handleStartLesson(module.id)}
                              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                              <Play className="w-4 h-4" />
                              <span>Start Lesson</span>
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-medium">
                          {module.lessons} lessons
                        </span>
                        <button
                          onClick={() => handleModuleClick(module.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-xs transition-colors"
                        >
                          {selectedModule === module.id ? 'Hide Details' : 'View Details'}
                        </button>
                      </div>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${module.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-slate-400">{module.progress}% complete</p>
                      {module.progress > 0 && (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl p-6 border border-cyan-400/30">
              <h3 className="text-lg font-semibold text-cyan-400 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Learning Goals
              </h3>
              <ul className="space-y-3 text-sm text-white">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Understand AI fundamentals and terminology
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Learn different types of machine learning
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Master data preparation techniques
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Build your first AI model
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-400/30">
              <h3 className="text-lg font-semibold text-purple-400 mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Quick Tips
              </h3>
              <div className="space-y-3 text-sm text-white">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-medium mb-1">💡 Start Simple</p>
                  <p className="text-slate-300">Begin with basic concepts before diving into complex algorithms</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-medium mb-1">🔬 Practice Regularly</p>
                  <p className="text-slate-300">Use the coding area to experiment with what you learn</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-medium mb-1">📊 Work with Data</p>
                  <p className="text-slate-300">Explore different datasets to understand real-world applications</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnAI;
