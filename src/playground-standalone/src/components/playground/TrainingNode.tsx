
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card } from '@/components/ui/card';
import { Play } from 'lucide-react';

export const TrainingNode = ({ data }: { data: any }) => {
  return (
    <Card className="min-w-[150px] border-orange-200 bg-orange-50">
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <Play className="h-4 w-4 text-orange-600" />
          <span className="text-sm font-medium text-orange-900">
            {data?.label || 'Training'}
          </span>
        </div>
        <div className="text-xs text-orange-700">
          Train the model
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-orange-500"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-orange-500"
      />
    </Card>
  );
};
