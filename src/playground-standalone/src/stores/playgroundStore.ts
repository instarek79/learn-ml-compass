import { create } from 'zustand';
import { Node, Edge } from '@xyflow/react';

interface ExecutionLog {
  id: string;
  timestamp: Date;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  nodeId?: string;
}

interface PlaygroundState {
  isExecuting: boolean;
  executionLogs: ExecutionLog[];
  currentPipeline: { nodes: Node[], edges: Edge[] } | null;
  
  // Actions
  executePlayground: (nodes: Node[], edges: Edge[]) => Promise<void>;
  addLog: (log: Omit<ExecutionLog, 'id' | 'timestamp'>) => void;
  clearLogs: () => void;
  savePipeline: (pipeline: { nodes: Node[], edges: Edge[] }) => void;
  loadPipeline: (pipeline: { nodes: Node[], edges: Edge[] }) => void;
}

export const usePlaygroundStore = create<PlaygroundState>((set, get) => ({
  isExecuting: false,
  executionLogs: [],
  currentPipeline: null,

  executePlayground: async (nodes: Node[], edges: Edge[]) => {
    set({ isExecuting: true });
    const { addLog, clearLogs } = get();
    
    clearLogs();
    addLog({ type: 'info', message: 'Starting pipeline execution...' });

    try {
      // Validate pipeline
      if (nodes.length === 0) {
        addLog({ type: 'error', message: 'No nodes in pipeline' });
        return;
      }

      // Find start nodes (data input nodes)
      const startNodes = nodes.filter(node => node.type === 'dataInput');
      if (startNodes.length === 0) {
        addLog({ type: 'error', message: 'No data input node found. Please add a Data Input node to start your pipeline.' });
        return;
      }

      addLog({ type: 'info', message: `Found ${startNodes.length} data input node(s)` });
      addLog({ type: 'info', message: 'Pipeline validation successful' });

      // Build execution order using topological sort
      const getExecutionOrder = (nodes: Node[], edges: Edge[]) => {
        const inDegree = new Map<string, number>();
        const adjList = new Map<string, string[]>();
        
        // Initialize
        nodes.forEach(node => {
          inDegree.set(node.id, 0);
          adjList.set(node.id, []);
        });
        
        // Build graph
        edges.forEach(edge => {
          adjList.get(edge.source)?.push(edge.target);
          inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
        });
        
        // Topological sort
        const queue = nodes.filter(node => inDegree.get(node.id) === 0);
        const result: Node[] = [];
        
        while (queue.length > 0) {
          const current = queue.shift()!;
          result.push(current);
          
          adjList.get(current.id)?.forEach(neighborId => {
            const newInDegree = (inDegree.get(neighborId) || 0) - 1;
            inDegree.set(neighborId, newInDegree);
            
            if (newInDegree === 0) {
              const neighborNode = nodes.find(n => n.id === neighborId);
              if (neighborNode) queue.push(neighborNode);
            }
          });
        }
        
        return result;
      };

      const executionOrder = getExecutionOrder(nodes, edges);
      addLog({ type: 'info', message: `Execution order determined: ${executionOrder.length} nodes` });

      // Execute nodes in order
      for (const node of executionOrder) {
        addLog({ 
          type: 'info', 
          message: `Executing ${node.type} node: ${node.data?.label || node.id}`,
          nodeId: node.id
        });

        // Simulate node execution with different delays for different node types
        const executionTime = getExecutionTime(node.type);
        await new Promise(resolve => setTimeout(resolve, executionTime));
        
        addLog({ 
          type: 'success', 
          message: `✓ Completed ${node.type} node${getNodeResultMessage(node.type)}`,
          nodeId: node.id
        });
      }

      addLog({ type: 'success', message: '🎉 Pipeline execution completed successfully!' });

    } catch (error) {
      addLog({ 
        type: 'error', 
        message: `Execution failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
      });
    } finally {
      set({ isExecuting: false });
    }
  },

  addLog: (log) => {
    const newLog: ExecutionLog = {
      ...log,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };
    set(state => ({ 
      executionLogs: [...state.executionLogs, newLog] 
    }));
  },

  clearLogs: () => set({ executionLogs: [] }),

  savePipeline: (pipeline) => {
    set({ currentPipeline: pipeline });
    const blob = new Blob([JSON.stringify(pipeline, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ml-pipeline-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  loadPipeline: (pipeline) => {
    set({ currentPipeline: pipeline });
  },
}));

// Helper functions
const getExecutionTime = (nodeType: string): number => {
  switch (nodeType) {
    case 'dataInput': return 800;
    case 'preprocessing': return 1200;
    case 'model': return 1500;
    case 'training': return 2000;
    case 'evaluation': return 1000;
    case 'output': return 600;
    default: return 1000;
  }
};

const getNodeResultMessage = (nodeType: string): string => {
  switch (nodeType) {
    case 'dataInput': return ' - Data loaded successfully';
    case 'preprocessing': return ' - Data preprocessed and ready';
    case 'model': return ' - Model architecture defined';
    case 'training': return ' - Model training completed';
    case 'evaluation': return ' - Model evaluation finished';
    case 'output': return ' - Results exported';
    default: return '';
  }
};
