
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card } from '@/components/ui/card';
import { Download } from 'lucide-react';

export const OutputNode = ({ data }: { data: any }) => {
  return (
    <Card className="min-w-[150px] border-gray-200 bg-gray-50">
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <Download className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-900">
            {data?.label || 'Output'}
          </span>
        </div>
        <div className="text-xs text-gray-700">
          Export or deploy
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-gray-500"
      />
    </Card>
  );
};
