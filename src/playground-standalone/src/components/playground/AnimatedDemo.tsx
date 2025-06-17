import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Pause, RotateCcw, X } from 'lucide-react';

interface AnimatedDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

const demoSteps = [
  {
    id: 1,
    title: "Add Data Input Node",
    description: "Start by dragging a Data Input node from the palette to the canvas",
    animation: "pulse-blue",
    highlight: "palette-data"
  },
  {
    id: 2,
    title: "Configure Your Data",
    description: "Double-click the node to configure data type and upload your dataset",
    animation: "bounce",
    highlight: "node-config"
  },
  {
    id: 3,
    title: "Add Preprocessing",
    description: "Drag a Preprocessing node and connect it to your data input",
    animation: "slide-right",
    highlight: "palette-preprocessing"
  },
  {
    id: 4,
    title: "Connect Nodes",
    description: "Click and drag from output handles to input handles to create connections",
    animation: "draw-line",
    highlight: "connection"
  },
  {
    id: 5,
    title: "Choose Model",
    description: "Add a Model node and select your ML algorithm with fine-tuning parameters",
    animation: "fade-in",
    highlight: "palette-model"
  },
  {
    id: 6,
    title: "Configure Training",
    description: "Set up training parameters like learning rate, epochs, and batch size",
    animation: "pulse-green",
    highlight: "palette-training"
  },
  {
    id: 7,
    title: "Add Evaluation",
    description: "Include an Evaluation node to assess your model's performance",
    animation: "scale-up",
    highlight: "palette-evaluation"
  },
  {
    id: 8,
    title: "Run Pipeline",
    description: "Click the Run Pipeline button to execute your complete ML workflow",
    animation: "pulse-purple",
    highlight: "run-button"
  }
];

export const AnimatedDemo: React.FC<AnimatedDemoProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentStep < demoSteps.length) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setCurrentStep(current => {
              if (current < demoSteps.length - 1) {
                return current + 1;
              } else {
                setIsPlaying(false);
                return current;
              }
            });
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentStep]);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsPlaying(false);
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    setProgress(0);
    setIsPlaying(false);
  };

  const currentStepData = demoSteps[currentStep];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>ML Playground Interactive Demo</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex gap-6">
          {/* Demo Visualization */}
          <div className="flex-1">
            <Card className="h-96 relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
              <CardContent className="p-6 h-full">
                <div className="relative w-full h-full">
                  {/* Simulated Canvas Area */}
                  <div className="absolute inset-0 border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="absolute top-4 left-4 text-sm text-gray-500">Canvas Area</div>
                    
                    {/* Animated Elements based on current step */}
                    {currentStep >= 0 && (
                      <div className={`absolute top-16 left-8 w-16 h-12 bg-blue-100 border-2 border-blue-300 rounded flex items-center justify-center text-xs ${currentStep === 0 ? 'animate-pulse ring-4 ring-blue-200' : ''}`}>
                        Data
                      </div>
                    )}
                    
                    {currentStep >= 2 && (
                      <div className={`absolute top-16 left-32 w-16 h-12 bg-green-100 border-2 border-green-300 rounded flex items-center justify-center text-xs ${currentStep === 2 ? 'animate-bounce' : ''}`}>
                        Prep
                      </div>
                    )}
                    
                    {currentStep >= 3 && (
                      <div className="absolute top-22 left-16 w-8 h-0.5 bg-gray-400">
                        <div className="absolute -right-1 -top-1 w-0 h-0 border-l-2 border-l-gray-400 border-t border-b border-transparent"></div>
                      </div>
                    )}
                    
                    {currentStep >= 4 && (
                      <div className={`absolute top-32 left-32 w-16 h-12 bg-purple-100 border-2 border-purple-300 rounded flex items-center justify-center text-xs ${currentStep === 4 ? 'animate-pulse ring-4 ring-purple-200' : ''}`}>
                        Model
                      </div>
                    )}
                    
                    {currentStep >= 5 && (
                      <div className={`absolute top-48 left-32 w-16 h-12 bg-orange-100 border-2 border-orange-300 rounded flex items-center justify-center text-xs ${currentStep === 5 ? 'animate-pulse ring-4 ring-green-200' : ''}`}>
                        Train
                      </div>
                    )}
                    
                    {currentStep >= 6 && (
                      <div className={`absolute top-48 left-56 w-16 h-12 bg-red-100 border-2 border-red-300 rounded flex items-center justify-center text-xs ${currentStep === 6 ? 'animate-bounce' : ''}`}>
                        Eval
                      </div>
                    )}
                  </div>
                  
                  {/* Simulated Sidebar */}
                  <div className="absolute right-0 top-0 w-20 h-full bg-white border-l border-gray-200 p-2">
                    <div className="text-xs text-gray-500 mb-2">Palette</div>
                    <div className={`w-full h-8 bg-blue-100 border border-blue-300 rounded mb-1 flex items-center justify-center text-xs ${currentStep === 0 ? 'ring-2 ring-blue-400' : ''}`}>
                      Data
                    </div>
                    <div className={`w-full h-8 bg-green-100 border border-green-300 rounded mb-1 flex items-center justify-center text-xs ${currentStep === 2 ? 'ring-2 ring-green-400' : ''}`}>
                      Prep
                    </div>
                    <div className={`w-full h-8 bg-purple-100 border border-purple-300 rounded mb-1 flex items-center justify-center text-xs ${currentStep === 4 ? 'ring-2 ring-purple-400' : ''}`}>
                      Model
                    </div>
                    <div className={`w-full h-8 bg-orange-100 border border-orange-300 rounded mb-1 flex items-center justify-center text-xs ${currentStep === 5 ? 'ring-2 ring-orange-400' : ''}`}>
                      Train
                    </div>
                    <div className={`w-full h-8 bg-red-100 border border-red-300 rounded mb-1 flex items-center justify-center text-xs ${currentStep === 6 ? 'ring-2 ring-red-400' : ''}`}>
                      Eval
                    </div>
                  </div>
                  
                  {/* Run Button */}
                  {currentStep === 7 && (
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                      <Button className="animate-pulse ring-4 ring-purple-200" size="sm">
                        <Play className="h-4 w-4 mr-2" />
                        Run Pipeline
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Controls and Steps */}
          <div className="w-80">
            {/* Current Step Info */}
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">Step {currentStep + 1}</h3>
                  <div className="text-sm text-gray-500">
                    {currentStep + 1} / {demoSteps.length}
                  </div>
                </div>
                <h4 className="font-medium text-blue-600 mb-2">{currentStepData.title}
                </h4>
                <p className="text-sm text-gray-600 mb-3">{currentStepData.description}</p>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-100" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                
                {/* Controls */}
                <div className="flex gap-2">
                  <Button onClick={handlePlay} size="sm" variant="outline">
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button onClick={handleReset} size="sm" variant="outline">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Step Navigation */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Steps</h4>
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {demoSteps.map((step, index) => (
                    <button
                      key={step.id}
                      onClick={() => handleStepClick(index)}
                      className={`w-full text-left p-2 rounded text-sm transition-colors ${
                        index === currentStep 
                          ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                          : 'hover:bg-gray-50'
                      } ${index < currentStep ? 'text-green-600' : ''}`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          index < currentStep ? 'bg-green-500 text-white' :
                          index === currentStep ? 'bg-blue-500 text-white' :
                          'bg-gray-200 text-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                        <span className="font-medium">{step.title}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
