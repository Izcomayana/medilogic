export type Incident = {
  id: string;
  tripId: string;
  type: string;
  driver?: string;
  driverId?: string;
  description: string;
  status: string;
  reportedDate?: string;
  reportedAt?: string;
  reportedTime?: string;
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
