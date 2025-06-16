
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card } from '@/components/ui/card';
import { BarChart } from 'lucide-react';

export const EvaluationNode = ({ data }: { data: any }) => {
  return (
    <Card className="min-w-[150px] border-red-200 bg-red-50">
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <BarChart className="h-4 w-4 text-red-600" />
          <span className="text-sm font-medium text-red-900">
            {data?.label || 'Evaluation'}
          </span>
        </div>
        <div className="text-xs text-red-700">
          Assess performance
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-red-500"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-red-500"
      />
    </Card>
  );
};
