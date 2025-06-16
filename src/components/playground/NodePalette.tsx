
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Upload, 
  Settings, 
  Circle, 
  Play, 
  BarChart, 
  Download 
} from 'lucide-react';
import { useReactFlow } from '@xyflow/react';

const nodeCategories = [
  {
    title: 'Data',
    nodes: [
      {
        id: 'dataInput',
        label: 'Data Input',
        icon: Upload,
        description: 'Upload images, audio, or create custom datasets'
      }
    ]
  },
  {
    title: 'Preprocessing',
    nodes: [
      {
        id: 'preprocessing',
        label: 'Preprocessing',
        icon: Settings,
        description: 'Normalize, augment, or transform data'
      }
    ]
  },
  {
    title: 'Model',
    nodes: [
      {
        id: 'model',
        label: 'Model Selection',
        icon: Circle,
        description: 'Choose ML algorithm (CNN, SVM, etc.)'
      }
    ]
  },
  {
    title: 'Training',
    nodes: [
      {
        id: 'training',
        label: 'Training',
        icon: Play,
        description: 'Configure training parameters'
      }
    ]
  },
  {
    title: 'Evaluation',
    nodes: [
      {
        id: 'evaluation',
        label: 'Evaluation',
        icon: BarChart,
        description: 'Assess model performance'
      }
    ]
  },
  {
    title: 'Output',
    nodes: [
      {
        id: 'output',
        label: 'Output',
        icon: Download,
        description: 'Export results or deploy model'
      }
    ]
  }
];

export const NodePalette = () => {
  const reactFlowInstance = useReactFlow();

  const addNode = (nodeType: string, label: string) => {
    const newNode = {
      id: `${nodeType}-${Date.now()}`,
      type: nodeType,
      position: { x: 100, y: 100 },
      data: { 
        label,
        config: {}
      },
    };

    reactFlowInstance.addNodes([newNode]);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Node Palette</h2>
      
      {nodeCategories.map((category) => (
        <Card key={category.title}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-700">{category.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {category.nodes.map((node) => {
              const IconComponent = node.icon;
              return (
                <Button
                  key={node.id}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start h-auto py-2 px-3"
                  onClick={() => addNode(node.id, node.label)}
                >
                  <div className="flex items-start gap-2">
                    <IconComponent className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <div className="text-left">
                      <div className="font-medium text-xs">{node.label}</div>
                      <div className="text-xs text-gray-500 leading-tight">
                        {node.description}
                      </div>
                    </div>
                  </div>
                </Button>
              );
            })}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
