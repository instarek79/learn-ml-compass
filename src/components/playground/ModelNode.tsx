
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card } from '@/components/ui/card';
import { Circle } from 'lucide-react';

export const ModelNode = ({ data }: { data: any }) => {
  return (
    <Card className="min-w-[150px] border-purple-200 bg-purple-50">
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <Circle className="h-4 w-4 text-purple-600" />
          <span className="text-sm font-medium text-purple-900">
            {data?.label || 'Model'}
          </span>
        </div>
        <div className="text-xs text-purple-700">
          Choose ML algorithm
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-purple-500"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-purple-500"
      />
    </Card>
  );
};
