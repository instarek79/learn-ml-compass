
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card } from '@/components/ui/card';
import { Upload } from 'lucide-react';

export const DataInputNode = ({ data }: { data: any }) => {
  return (
    <Card className="min-w-[150px] border-blue-200 bg-blue-50">
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <Upload className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-900">
            {data?.label || 'Data Input'}
          </span>
        </div>
        <div className="text-xs text-blue-700">
          Upload or create dataset
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-blue-500"
      />
    </Card>
  );
};
