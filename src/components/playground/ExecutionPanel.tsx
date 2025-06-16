
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ExecutionLog {
  id: string;
  timestamp: Date;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  nodeId?: string;
}

interface ExecutionPanelProps {
  logs: ExecutionLog[];
  isExecuting: boolean;
}

export const ExecutionPanel: React.FC<ExecutionPanelProps> = ({ logs, isExecuting }) => {
  const getLogBadgeVariant = (type: ExecutionLog['type']) => {
    switch (type) {
      case 'success':
        return 'default';
      case 'error':
        return 'destructive';
      case 'warning':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            Execution Status
            {isExecuting && (
              <Badge variant="secondary">Running...</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {logs.length === 0 ? (
            <p className="text-sm text-gray-500">No execution logs yet. Run the pipeline to see logs.</p>
          ) : (
            <ScrollArea className="h-64">
              <div className="space-y-2">
                {logs.map((log) => (
                  <div key={log.id} className="text-xs border-l-2 border-gray-200 pl-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={getLogBadgeVariant(log.type)} className="text-xs">
                        {log.type}
                      </Badge>
                      <span className="text-gray-500">
                        {log.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{log.message}</p>
                    {log.nodeId && (
                      <p className="text-gray-500">Node: {log.nodeId}</p>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Live Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 bg-gray-50 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
            <p className="text-sm text-gray-500">
              {isExecuting ? 'Training in progress...' : 'Results will appear here'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
