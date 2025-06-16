
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

      // Find start node (data input)
      const startNode = nodes.find(node => node.type === 'dataInput');
      if (!startNode) {
        addLog({ type: 'error', message: 'No data input node found' });
        return;
      }

      addLog({ type: 'info', message: 'Pipeline validation successful' });

      // Execute nodes in order
      const executedNodes = new Set<string>();
      const executeNode = async (nodeId: string) => {
        if (executedNodes.has(nodeId)) return;
        
        const node = nodes.find(n => n.id === nodeId);
        if (!node) return;

        addLog({ 
          type: 'info', 
          message: `Executing ${node.type} node: ${node.data?.label || node.id}`,
          nodeId: node.id
        });

        // Simulate node execution
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        executedNodes.add(nodeId);
        addLog({ 
          type: 'success', 
          message: `Completed ${node.type} node`,
          nodeId: node.id
        });

        // Execute connected nodes
        const connectedEdges = edges.filter(edge => edge.source === nodeId);
        for (const edge of connectedEdges) {
          await executeNode(edge.target);
        }
      };

      await executeNode(startNode.id);
      addLog({ type: 'success', message: 'Pipeline execution completed successfully!' });

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
