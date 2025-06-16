
import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Download, Upload, Save } from 'lucide-react';
import { DataInputNode } from '@/components/playground/DataInputNode';
import { PreprocessingNode } from '@/components/playground/PreprocessingNode';
import { ModelNode } from '@/components/playground/ModelNode';
import { TrainingNode } from '@/components/playground/TrainingNode';
import { EvaluationNode } from '@/components/playground/EvaluationNode';
import { OutputNode } from '@/components/playground/OutputNode';
import { NodePalette } from '@/components/playground/NodePalette';
import { ConfigPanel } from '@/components/playground/ConfigPanel';
import { ExecutionPanel } from '@/components/playground/ExecutionPanel';
import { usePlaygroundStore } from '@/stores/playgroundStore';

const nodeTypes = {
  dataInput: DataInputNode,
  preprocessing: PreprocessingNode,
  model: ModelNode,
  training: TrainingNode,
  evaluation: EvaluationNode,
  output: OutputNode,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const MLPlaygroundContent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const { 
    isExecuting, 
    executionLogs, 
    executePlayground, 
    savePipeline, 
    loadPipeline 
  } = usePlaygroundStore();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const handleExecute = () => {
    executePlayground(nodes, edges);
  };

  const handleSave = () => {
    const pipeline = { nodes, edges };
    savePipeline(pipeline);
  };

  const handleLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const pipeline = JSON.parse(e.target?.result as string);
          setNodes(pipeline.nodes || []);
          setEdges(pipeline.edges || []);
        } catch (error) {
          console.error('Failed to load pipeline:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <h1 className="text-2xl font-bold text-gray-900">ML Playground</h1>
        <div className="flex gap-2">
          <Button
            onClick={handleExecute}
            disabled={isExecuting}
            className="flex items-center gap-2"
          >
            <Play className="h-4 w-4" />
            {isExecuting ? 'Running...' : 'Run Pipeline'}
          </Button>
          <Button variant="outline" onClick={handleSave}>
            <Save className="h-4 w-4" />
            Save
          </Button>
          <label className="cursor-pointer">
            <Button variant="outline" asChild>
              <span>
                <Upload className="h-4 w-4" />
                Load
              </span>
            </Button>
            <input
              type="file"
              accept=".json"
              onChange={handleLoad}
              className="hidden"
            />
          </label>
          <Button variant="outline">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Node Palette */}
        <div className="w-64 bg-white border-r p-4 overflow-y-auto">
          <NodePalette />
        </div>

        {/* Main Canvas */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            style={{ backgroundColor: '#f8fafc' }}
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>

        {/* Right Sidebar - Configuration & Execution */}
        <div className="w-80 bg-white border-l flex flex-col">
          <Tabs defaultValue="config" className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-2 m-4">
              <TabsTrigger value="config">Configuration</TabsTrigger>
              <TabsTrigger value="execution">Execution</TabsTrigger>
            </TabsList>
            
            <TabsContent value="config" className="flex-1 p-4 overflow-y-auto">
              <ConfigPanel selectedNode={selectedNode} />
            </TabsContent>
            
            <TabsContent value="execution" className="flex-1 p-4 overflow-y-auto">
              <ExecutionPanel 
                logs={executionLogs} 
                isExecuting={isExecuting} 
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const MLPlayground = () => {
  return (
    <ReactFlowProvider>
      <MLPlaygroundContent />
    </ReactFlowProvider>
  );
};

export default MLPlayground;
