
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
import { Play, Download, Upload, Save, Menu, X } from 'lucide-react';
import { DataInputNode } from '@/components/playground/DataInputNode';
import { PreprocessingNode } from '@/components/playground/PreprocessingNode';
import { ModelNode } from '@/components/playground/ModelNode';
import { TrainingNode } from '@/components/playground/TrainingNode';
import { EvaluationNode } from '@/components/playground/EvaluationNode';
import { OutputNode } from '@/components/playground/OutputNode';
import { NodePalette } from '@/components/playground/NodePalette';
import { ConfigDialog } from '@/components/playground/ConfigDialog';
import { ExecutionPanel } from '@/components/playground/ExecutionPanel';
import { usePlaygroundStore } from '@/stores/playgroundStore';
import { AnimatedDemo } from '@/components/playground/AnimatedDemo';

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
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showExecution, setShowExecution] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  
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

  const onNodeDoubleClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setIsConfigOpen(true);
  }, []);

  const handleExecute = () => {
    executePlayground(nodes, edges);
    setShowExecution(true);
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
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">ML Playground</h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowDemo(true)}
            className="flex items-center gap-2"
          >
            <Play className="h-4 w-4" />
            Demo
          </Button>
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
          <Button 
            variant="outline"
            onClick={() => setShowExecution(!showExecution)}
          >
            Logs
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Node Palette */}
        {isSidebarOpen && (
          <div className="w-64 bg-white border-r p-4 overflow-y-auto">
            <NodePalette />
          </div>
        )}

        {/* Main Canvas */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeDoubleClick={onNodeDoubleClick}
            nodeTypes={nodeTypes}
            fitView
            style={{ backgroundColor: '#f8fafc' }}
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>

        {/* Execution Panel */}
        {showExecution && (
          <div className="w-80 bg-white border-l flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold">Execution Logs</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowExecution(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <ExecutionPanel 
                logs={executionLogs} 
                isExecuting={isExecuting} 
              />
            </div>
          </div>
        )}
      </div>

      {/* Configuration Dialog */}
      <ConfigDialog
        selectedNode={selectedNode}
        isOpen={isConfigOpen}
        onClose={() => {
          setIsConfigOpen(false);
          setSelectedNode(null);
        }}
        onUpdateNode={(nodeId, updates) => {
          setNodes((nodes) =>
            nodes.map((node) =>
              node.id === nodeId ? { ...node, data: { ...node.data, ...updates } } : node
            )
          );
        }}
      />

      {/* Animated Demo */}
      <AnimatedDemo
        isOpen={showDemo}
        onClose={() => setShowDemo(false)}
      />
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
