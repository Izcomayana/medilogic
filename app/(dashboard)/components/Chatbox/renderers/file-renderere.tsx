'use client';

import { Download, FileText, File } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileRendererProps {
  data: { pdf_url?: string; files?: any[] };
}

export function FileRenderer({ data }: FileRendererProps) {
  const files =
    data.files ||
    (data.pdf_url ? [{ url: data.pdf_url, name: 'Document.pdf' }] : []);

  return (
    <div className="space-y-2 bg-gray-700 rounded-lg p-3 border border-gray-600">
      {files.map((file: any, idx: number) => (
        <div key={idx} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {file.name?.endsWith('.pdf') ? (
              <FileText className="h-4 w-4 text-red-400" />
            ) : (
              <File className="h-4 w-4 text-gray-400" />
            )}
            <span className="text-sm text-gray-300">{file.name}</span>
          </div>
          <Button size="sm" variant="ghost" className="text-xs gap-1" asChild>
            <a href={file.url} download>
              <Download className="h-3 w-3" />
            </a>
          </Button>
        </div>
      ))}
    </div>
  );
}
