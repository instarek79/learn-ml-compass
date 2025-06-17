import React, { useState } from 'react';
import { Node } from '@xyflow/react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Info, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ConfigDialogProps {
  selectedNode: Node | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateNode: (nodeId: string, updates: any) => void;
}

interface CNNParams {
  layers: number;
  filters: number;
  kernelSize: number;
  dropout: number;
  activation: string;
}

interface SVMParams {
  kernel: string;
  C: number;
  gamma: string;
  degree: number;
}

interface RFParams {
  nEstimators: number;
  maxDepth: number;
  minSamplesSplit: number;
  minSamplesLeaf: number;
}

interface MobileNetParams {
  alpha: number;
  inputShape: number;
  includeTop: boolean;
  freezeLayers: number;
}

const nodeHints = {
  dataInput: "Upload your training data here. Support for images, audio, and text. Make sure your data is properly labeled and organized into classes.",
  preprocessing: "Clean and prepare your data for training. This step is crucial for model performance. Consider normalization, augmentation, and proper sizing.",
  model: "Choose your machine learning algorithm. Different algorithms work better for different types of data and problems. Fine-tune hyperparameters for better results.",
  training: "Configure how your model learns from the data. Adjust learning rate, epochs, and batch size based on your dataset size and complexity.",
  evaluation: "Test your model's performance using various metrics. This helps you understand how well your model generalizes to new, unseen data.",
  output: "Export your trained model for deployment or further analysis. Choose the format that best fits your target platform."
};

export const ConfigDialog: React.FC<ConfigDialogProps> = ({ 
  selectedNode, 
  isOpen, 
  onClose,
  onUpdateNode 
}) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<'cnn' | 'svm' | 'rf' | 'mobilenet'>('cnn');
  const [fineTuningParams, setFineTuningParams] = useState({
    cnn: {
      layers: 3,
      filters: 32,
      kernelSize: 3,
      dropout: 0.2,
      activation: 'relu'
    } as CNNParams,
    svm: {
      kernel: 'rbf',
      C: 1.0,
      gamma: 'scale',
      degree: 3
    } as SVMParams,
    rf: {
      nEstimators: 100,
      maxDepth: 10,
      minSamplesSplit: 2,
      minSamplesLeaf: 1
    } as RFParams,
    mobilenet: {
      alpha: 1.0,
      inputShape: 224,
      includeTop: false,
      freezeLayers: 50
    } as MobileNetParams
  });

  if (!selectedNode) return null;

  const HintCard = ({ hint }: { hint: string }) => (
    <Card className="mb-4 bg-blue-50 border-blue-200">
      <CardContent className="p-3">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-blue-800">{hint}</p>
        </div>
      </CardContent>
    </Card>
  );

  const renderAlgorithmFineTuning = () => {
    const params = fineTuningParams[selectedAlgorithm];
    
    switch (selectedAlgorithm) {
      case 'cnn':
        const cnnParams = params as CNNParams;
        return (
          <div className="space-y-4">
            <div>
              <Label>Number of Layers: {cnnParams.layers}</Label>
              <Slider
                value={[cnnParams.layers]}
                onValueChange={([value]) => setFineTuningParams(prev => ({
                  ...prev,
                  cnn: { ...prev.cnn, layers: value }
                }))}
                max={10}
                min={1}
                step={1}
                className="mt-2"
              />
            </div>
            <div>
              <Label>Filters: {cnnParams.filters}</Label>
              <Slider
                value={[cnnParams.filters]}
                onValueChange={([value]) => setFineTuningParams(prev => ({
                  ...prev,
                  cnn: { ...prev.cnn, filters: value }
                }))}
                max={512}
                min={16}
                step={16}
                className="mt-2"
              />
            </div>
            <div>
              <Label>Kernel Size: {cnnParams.kernelSize}</Label>
              <Slider
                value={[cnnParams.kernelSize]}
                onValueChange={([value]) => setFineTuningParams(prev => ({
                  ...prev,
                  cnn: { ...prev.cnn, kernelSize: value }
                }))}
                max={7}
                min={3}
                step={2}
                className="mt-2"
              />
            </div>
            <div>
              <Label>Dropout Rate: {cnnParams.dropout}</Label>
              <Slider
                value={[cnnParams.dropout]}
                onValueChange={([value]) => setFineTuningParams(prev => ({
                  ...prev,
                  cnn: { ...prev.cnn, dropout: value }
                }))}
                max={0.5}
                min={0.1}
                step={0.1}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="activation">Activation Function</Label>
              <Select value={cnnParams.activation} onValueChange={(value) => 
                setFineTuningParams(prev => ({
                  ...prev,
                  cnn: { ...prev.cnn, activation: value }
                }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relu">ReLU</SelectItem>
                  <SelectItem value="tanh">Tanh</SelectItem>
                  <SelectItem value="sigmoid">Sigmoid</SelectItem>
                  <SelectItem value="leaky_relu">Leaky ReLU</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      
      case 'svm':
        const svmParams = params as SVMParams;
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="kernel">Kernel</Label>
              <Select value={svmParams.kernel} onValueChange={(value) => 
                setFineTuningParams(prev => ({
                  ...prev,
                  svm: { ...prev.svm, kernel: value }
                }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rbf">RBF</SelectItem>
                  <SelectItem value="linear">Linear</SelectItem>
                  <SelectItem value="poly">Polynomial</SelectItem>
                  <SelectItem value="sigmoid">Sigmoid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>C (Regularization): {svmParams.C}</Label>
              <Slider
                value={[svmParams.C]}
                onValueChange={([value]) => setFineTuningParams(prev => ({
                  ...prev,
                  svm: { ...prev.svm, C: value }
                }))}
                max={10}
                min={0.1}
                step={0.1}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="gamma">Gamma</Label>
              <Select value={svmParams.gamma} onValueChange={(value) => 
                setFineTuningParams(prev => ({
                  ...prev,
                  svm: { ...prev.svm, gamma: value }
                }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scale">Scale</SelectItem>
                  <SelectItem value="auto">Auto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {svmParams.kernel === 'poly' && (
              <div>
                <Label>Degree: {svmParams.degree}</Label>
                <Slider
                  value={[svmParams.degree]}
                  onValueChange={([value]) => setFineTuningParams(prev => ({
                    ...prev,
                    svm: { ...prev.svm, degree: value }
                  }))}
                  max={10}
                  min={1}
                  step={1}
                  className="mt-2"
                />
              </div>
            )}
          </div>
        );
      
      case 'rf':
        const rfParams = params as RFParams;
        return (
          <div className="space-y-4">
            <div>
              <Label>Number of Estimators: {rfParams.nEstimators}</Label>
              <Slider
                value={[rfParams.nEstimators]}
                onValueChange={([value]) => setFineTuningParams(prev => ({
                  ...prev,
                  rf: { ...prev.rf, nEstimators: value }
                }))}
                max={500}
                min={10}
                step={10}
                className="mt-2"
              />
            </div>
            <div>
              <Label>Max Depth: {rfParams.maxDepth}</Label>
              <Slider
                value={[rfParams.maxDepth]}
                onValueChange={([value]) => setFineTuningParams(prev => ({
                  ...prev,
                  rf: { ...prev.rf, maxDepth: value }
                }))}
                max={50}
                min={1}
                step={1}
                className="mt-2"
              />
            </div>
            <div>
              <Label>Min Samples Split: {rfParams.minSamplesSplit}</Label>
              <Slider
                value={[rfParams.minSamplesSplit]}
                onValueChange={([value]) => setFineTuningParams(prev => ({
                  ...prev,
                  rf: { ...prev.rf, minSamplesSplit: value }
                }))}
                max={10}
                min={2}
                step={1}
                className="mt-2"
              />
            </div>
          </div>
        );
      
      case 'mobilenet':
        const mobileNetParams = params as MobileNetParams;
        return (
          <div className="space-y-4">
            <div>
              <Label>Alpha (Width Multiplier): {mobileNetParams.alpha}</Label>
              <Slider
                value={[mobileNetParams.alpha]}
                onValueChange={([value]) => setFineTuningParams(prev => ({
                  ...prev,
                  mobilenet: { ...prev.mobilenet, alpha: value }
                }))}
                max={2.0}
                min={0.25}
                step={0.25}
                className="mt-2"
              />
            </div>
            <div>
              <Label>Input Shape: {mobileNetParams.inputShape}x{mobileNetParams.inputShape}</Label>
              <Slider
                value={[mobileNetParams.inputShape]}
                onValueChange={([value]) => setFineTuningParams(prev => ({
                  ...prev,
                  mobilenet: { ...prev.mobilenet, inputShape: value }
                }))}
                max={320}
                min={128}
                step={32}
                className="mt-2"
              />
            </div>
            <div>
              <Label>Freeze Layers: {mobileNetParams.freezeLayers}</Label>
              <Slider
                value={[mobileNetParams.freezeLayers]}
                onValueChange={([value]) => setFineTuningParams(prev => ({
                  ...prev,
                  mobilenet: { ...prev.mobilenet, freezeLayers: value }
                }))}
                max={100}
                min={0}
                step={5}
                className="mt-2"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="includeTop">Include Top Layer</Label>
              <Switch 
                checked={mobileNetParams.includeTop}
                onCheckedChange={(checked) => setFineTuningParams(prev => ({
                  ...prev,
                  mobilenet: { ...prev.mobilenet, includeTop: checked }
                }))}
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderNodeConfig = () => {
    const hint = nodeHints[selectedNode.type as keyof typeof nodeHints];
    
    return (
      <div>
        {hint && <HintCard hint={hint} />}
        
        {(() => {
          switch (selectedNode.type) {
            case 'dataInput':
              return (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="dataType">Data Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select data type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="image">Images</SelectItem>
                        <SelectItem value="audio">Audio</SelectItem>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="custom">Custom Classes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="upload">Upload Data</Label>
                    <Input type="file" multiple accept="image/*,audio/*" />
                  </div>
                  
                  <div>
                    <Label htmlFor="classes">Classes</Label>
                    <Textarea 
                      placeholder="Enter class names (one per line)"
                      rows={4}
                    />
                  </div>
                </div>
              );

            case 'preprocessing':
              return (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="normalize">Normalize Data</Label>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="augment">Data Augmentation</Label>
                    <Switch />
                  </div>
                  
                  <div>
                    <Label>Resize Images</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="Width" type="number" defaultValue="224" />
                      <Input placeholder="Height" type="number" defaultValue="224" />
                    </div>
                  </div>
                </div>
              );

            case 'model':
              return (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="algorithm">Algorithm</Label>
                    <Select value={selectedAlgorithm} onValueChange={(value: 'cnn' | 'svm' | 'rf' | 'mobilenet') => setSelectedAlgorithm(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select algorithm" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cnn">Convolutional Neural Network</SelectItem>
                        <SelectItem value="svm">Support Vector Machine</SelectItem>
                        <SelectItem value="rf">Random Forest</SelectItem>
                        <SelectItem value="mobilenet">MobileNet (Transfer Learning)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Label className="font-medium">Fine-tuning Parameters</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-gray-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Adjust these parameters to optimize your model's performance</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    {renderAlgorithmFineTuning()}
                  </div>
                </div>
              );

            case 'training':
              return (
                <div className="space-y-4">
                  <div>
                    <Label>Learning Rate: {0.001}</Label>
                    <Slider
                      defaultValue={[0.001]}
                      max={0.1}
                      min={0.0001}
                      step={0.0001}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="epochs">Epochs</Label>
                    <Input type="number" defaultValue="10" min="1" max="100" />
                  </div>
                  
                  <div>
                    <Label htmlFor="batchSize">Batch Size</Label>
                    <Input type="number" defaultValue="32" min="1" max="128" />
                  </div>
                  
                  <div>
                    <Label htmlFor="optimizer">Optimizer</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select optimizer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="adam">Adam</SelectItem>
                        <SelectItem value="sgd">SGD</SelectItem>
                        <SelectItem value="rmsprop">RMSprop</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              );

            case 'evaluation':
              return (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="metrics">Evaluation Metrics</Label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="accuracy">Accuracy</Label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="precision">Precision</Label>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="recall">Recall</Label>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="f1">F1 Score</Label>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Test Split Ratio: {0.2}</Label>
                    <Slider
                      defaultValue={[0.2]}
                      max={0.5}
                      min={0.1}
                      step={0.1}
                      className="mt-2"
                    />
                  </div>
                </div>
              );

            case 'output':
              return (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="format">Export Format</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tensorflowjs">TensorFlow.js</SelectItem>
                        <SelectItem value="onnx">ONNX</SelectItem>
                        <SelectItem value="python">Python Script</SelectItem>
                        <SelectItem value="json">JSON Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="includeData">Include Test Data</Label>
                    <Switch />
                  </div>
                  
                  <Button className="w-full">
                    Export Model
                  </Button>
                </div>
              );

            default:
              return <div>No configuration available for this node type.</div>;
          }
        })()}
      </div>
    );
  };

  const nodeLabel = typeof selectedNode.data?.label === 'string' ? selectedNode.data.label : selectedNode.type;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configure: {nodeLabel}</DialogTitle>
        </DialogHeader>
        {renderNodeConfig()}
      </DialogContent>
    </Dialog>
  );
};
