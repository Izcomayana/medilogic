export type Incident = {
  id: string;
  title: string;
  incident_type: string;
  severity: string;
  description: string;
  status: string;
  created_at?: string;
  timestamp?: string;
  photoUrl: string | null;
  adminResponse?: string | null;
  internalNotes?: string | null;
  auditHistory?: {
    action: string;
    timestamp: string;
    by: string;
  }[];
};
