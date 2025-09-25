// utils/badges.tsx
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Loader, AlertCircle, XCircle } from 'lucide-react';

export function getStatusBadge(status: string | null) {
  switch (status?.toLowerCase()) {
    case 'completed':
      return (
        <Badge className="bg-[#15941f] text-white">
          <CheckCircle className="h-3 w-3 mr-1" />
          Completed
        </Badge>
      );
    case 'in progress':
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
