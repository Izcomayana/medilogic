// types/chat-data.ts
export interface ListData {
  items: any[];
}

export interface DetailData {
  id: string;
  [key: string]: any;
}

export interface FileData {
  pdf_url?: string;
  files?: any[];
}

export type ChatData = ListData | DetailData | FileData | Record<string, any>;
