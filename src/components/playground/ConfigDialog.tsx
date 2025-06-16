
import React from 'react';
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

interface ConfigDialogProps {
  selectedNode: Node | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateNode: (nodeId: string, updates: any) => void;
}

export const ConfigDialog: React.FC<ConfigDialogProps> = ({ 
  selectedNode, 
  isOpen, 
  onClose,
  onUpdateNode 
}) => {
  if (!selectedNode) return null;

  const renderNodeConfig = () => {
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
              <Select>
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
            
            <div>
              <Label>Model Architecture</Label>
              <Textarea 
                placeholder="Custom architecture (optional)"
                rows={3}
              />
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
  };

  const nodeLabel = typeof selectedNode.data?.label === 'string' ? selectedNode.data.label : selectedNode.type;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Configure: {nodeLabel}</DialogTitle>
        </DialogHeader>
        <div className="max-h-96 overflow-y-auto">
          {renderNodeConfig()}
        </div>
      </DialogContent>
    </Dialog>
  );
};
