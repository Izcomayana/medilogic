export type Incident = {
  id: string;
  title: string;
  incident_type: string;
  severity: string;
  description: string;
  status: string;
  escalated: boolean;
  created_at?: string;
  timestamp?: string;
  location?: string;
  adminResponse?: string | null;
  internalNotes?: string | null;
};
