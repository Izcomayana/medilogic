'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';

interface DetailCardRendererProps {
  data: Record<string, any>;
}

export function DetailCardRenderer({ data }: DetailCardRendererProps) {
  return (
    <Card className="bg-gray-700 border-gray-600 p-4">
      <div className="space-y-3">
        {Object.entries(data).map(([key, value]: [string, any]) => (
          <div key={key} className="flex justify-between items-center">
            <span
              className={`text-sm capitalize text-gray-400 ${key === 'short_id' ? 'font-bold text-blue-300' : ''}`}
            >
              {key}:
            </span>
            <span
              className={`text-sm ${key === 'short_id' ? 'font-bold text-blue-300' : 'text-gray-200'}`}
            >
              {String(value)}
            </span>
          </div>
        ))}
        <div className="flex gap-2 mt-4">
          <Button
            size="sm"
            variant="outline"
            className="text-xs gap-1 bg-transparent"
          >
            <Download className="h-3 w-3" />
            Download
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-xs gap-1 bg-transparent"
          >
            <Eye className="h-3 w-3" />
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
}
