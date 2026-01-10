'use client';

import { ListRenderer } from './list-renderer';
import { DetailCardRenderer } from './detail-card-renderer';
import { FileRenderer } from './file-renderere';
import type { ChatData, ListData, FileData, DetailData } from '../chat-data';

interface DataRendererProps {
  data: ChatData;
}

export function DataRenderer({ data }: DataRendererProps) {
  if ('items' in data && Array.isArray(data.items)) {
    return <ListRenderer data={data as ListData} />;
  }

  if ('id' in data && !('items' in data)) {
    return <DetailCardRenderer data={data as DetailData} />;
  }

  if ('pdf_url' in data || 'files' in data) {
    return <FileRenderer data={data as FileData} />;
  }

  if (Object.keys(data).length > 1) {
    return (
      <div className="space-y-4">
        {'pdf_url' in data || 'files' in data ? (
          <FileRenderer data={data as FileData} />
        ) : null}
        {'items' in data ? <ListRenderer data={data as ListData} /> : null}
        {'id' in data && !('items' in data) ? (
          <DetailCardRenderer data={data} />
        ) : null}
      </div>
    );
  }

  return null;
}

// "use client"

// import { ListRenderer } from "./list-renderer"
// import { DetailCardRenderer } from "./detail-card-renderer"
// import { FileRenderer } from "./file-renderere"

// interface DataRendererProps {
//   data: Record<string, any>
// }

// export function DataRenderer({ data }: DataRendererProps) {
//   // Decision logic: render based on data shape
//   if (data.items && Array.isArray(data.items)) {
//     return <ListRenderer data={data} />
//   }

//   if (data.id && !data.items) {
//     return <DetailCardRenderer data={data} />
//   }

//   if (data.pdf_url || data.files) {
//     return <FileRenderer data={data} />
//   }

//   // Mixed renderer: stack multiple renderers
//   if (Object.keys(data).length > 1) {
//     return (
//       <div className="space-y-4">
//         {data.pdf_url || data.files ? <FileRenderer data={data} /> : null}
//         {data.items ? <ListRenderer data={data} /> : null}
//         {data.id && !data.items ? <DetailCardRenderer data={data} /> : null}
//       </div>
//     )
//   }

//   return null
// }
