'use client';

import { useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuesry';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';

interface ListRendererProps {
  data: { items: any[] };
}

export function ListRenderer({ data }: ListRendererProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (isMobile) {
    // Mobile: Stacked cards
    return (
      <div className="space-y-3">
        {data.items.map((item: any, idx: number) => (
          <Card
            key={idx}
            onClick={() => setSelectedId(item.id)}
            className="bg-gray-700 border-gray-600 p-4 cursor-pointer hover:bg-gray-600 transition"
          >
            {Object.entries(item).map(([key, value]: [string, any]) => (
              <div key={key} className="flex justify-between text-sm mb-2">
                <span className="text-gray-400 capitalize">{key}:</span>
                <span className="text-gray-100 font-medium">
                  {String(value)}
                </span>
              </div>
            ))}
          </Card>
        ))}
      </div>
    );
  }

  // Desktop: Table
  return (
    <div className="bg-gray-700 rounded-lg overflow-hidden border border-gray-600">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-800 border-b border-gray-600">
            {data.items.length > 0 &&
              Object.keys(data.items[0]).map((key) => (
                <TableHead key={key} className="text-gray-300 capitalize">
                  {key}
                </TableHead>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.items.map((item: any, idx: number) => (
            <TableRow
              key={idx}
              onClick={() => setSelectedId(item.id)}
              className="border-b border-gray-600 hover:bg-gray-600 cursor-pointer transition"
            >
              {Object.values(item).map((value: any, cellIdx: number) => (
                <TableCell key={cellIdx} className="text-gray-300 text-sm">
                  {String(value)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
