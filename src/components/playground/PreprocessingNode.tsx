
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card } from '@/components/ui/card';
import { Settings } from 'lucide-react';

export const PreprocessingNode = ({ data }: { data: any }) => {
  return (
    <Card className="min-w-[150px] border-green-200 bg-green-50">
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <Settings className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium text-green-900">
            {data?.label || 'Preprocessing'}
          </span>
        </div>
        <div className="text-xs text-green-700">
          Clean and transform data
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-green-500"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-green-500"
      />
    </Card>
  );
};
