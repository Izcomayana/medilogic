// utils/badges.tsx
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Loader, AlertCircle, XCircle } from 'lucide-react';

export function getTripStatusBadge(status: string | null) {
  switch (status?.toLowerCase()) {
    case 'completed':
      return (
        <Badge className="bg-[#15941f] text-white">
          <CheckCircle className="h-3 w-3 mr-1" />
          Completed
        </Badge>
      );
    case 'in_progress':
      return (
        <Badge variant="secondary" className="bg-blue-600 text-white">
          <Loader className="h-3 w-3 mr-1" />
          In Progress
        </Badge>
      );
    case 'pending':
      return (
        <Badge variant="secondary" className="bg-yellow-600 text-white">
          <AlertCircle className="h-3 w-3 mr-1" />
          Pending
        </Badge>
      );
    case 'cancelled':
      return (
        <Badge variant="destructive">
          <XCircle className="h-3 w-3 mr-1" />
          Cancelled
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export const getSeverityBadge = (severity: string) => {
  switch (severity?.toLowerCase()) {
    case 'low':
      return <Badge className="bg-green-600 text-white">Low</Badge>;

    case 'moderate':
      return <Badge className="bg-yellow-600 text-white">Moderate</Badge>;

    case 'critical':
      return <Badge className="bg-red-600 text-white">Critical</Badge>;

    default:
      return <Badge variant="outline">{severity || 'Unknown'}</Badge>;
  }
};

export const getIncidentStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return <Badge className="bg-blue-600 text-white">Pending</Badge>;
    case 'under_review':
      return <Badge className="bg-yellow-600 text-white">Under Review</Badge>;
    case 'escalated':
      return <Badge className="bg-orange-600 text-white">Escalated</Badge>;
    case 'on_site':
      return <Badge className="bg-gray-200 text-white">On Site</Badge>;
    case 'resolved':
      return <Badge className="bg-green-600 text-white">Resolved</Badge>;
    case 'closed':
      return <Badge className="bg-red-600 text-white">Closed</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};
