export type IncidentFile = {
  id: string;
  s3_key: string;
  file_type: string;
};

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
  files?: IncidentFile[];
  submitted_name?: string;
};
