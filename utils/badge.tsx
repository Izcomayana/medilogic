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

export const getRoleBadge = (role: string) => {
  switch (role.toLowerCase()) {
    case 'super admin':
      return (
        <Badge variant="secondary" className="bg-red-600 text-white">
          Super Admin
        </Badge>
      );
    case 'org admin':
      return (
        <Badge variant="secondary" className="bg-blue-600 text-white">
          Org Admin
        </Badge>
      );
    case 'regulator':
      return (
        <Badge variant="secondary" className="bg-purple-600 text-white">
          Regulator
        </Badge>
      );
    case 'client':
      return (
        <Badge variant="secondary" className="bg-[#15941f] text-white">
          Client
        </Badge>
      );
    case 'driver':
      return (
        <Badge variant="outline" className="border-gray-600 text-gray-300">
          Driver
        </Badge>
      );
    default:
      return <Badge variant="outline">{role}</Badge>;
  }
};

export const getActionBadge = (action: string) => {
  const normalized = action.toLowerCase();

  if (normalized.includes('create')) {
    return <Badge className="bg-[#15941f] text-white">Create</Badge>;
  }
  if (normalized.includes('update')) {
    return <Badge className="bg-blue-600 text-white">Update</Badge>;
  }
  if (normalized.includes('delete')) {
    return <Badge variant="destructive">Delete</Badge>;
  }
  if (normalized.includes('regenerate') || normalized.includes('invite')) {
    return <Badge className="bg-green-600 text-white">Invite Code</Badge>;
  }
  if (normalized.includes('login')) {
    return <Badge className="bg-gray-600 text-white">Login</Badge>;
  }
  if (normalized === 'activate_user') {
    return <Badge className="bg-emerald-600 text-white">Activate User</Badge>;
  }
  if (normalized === 'deactivate_user') {
    return <Badge className="bg-red-600 text-white">Deactivate User</Badge>;
  }
  if (normalized === 'activate_organization') {
    return <Badge className="bg-teal-600 text-white">Activate Org</Badge>;
  }
  if (normalized === 'deactivate_organization') {
    return <Badge className="bg-rose-600 text-white">Deactivate Org</Badge>;
  }
  if (normalized.includes('approve')) {
    return <Badge className="bg-indigo-600 text-white">Approve</Badge>;
  }
  if (normalized.includes('reject')) {
    return <Badge className="bg-yellow-600 text-black">Reject</Badge>;
  }
  if (normalized.includes('export')) {
    return <Badge className="bg-purple-600 text-white">Export</Badge>;
  }
  if (normalized.includes('download')) {
    return <Badge className="bg-orange-600 text-white">Download</Badge>;
  }
  if (normalized.includes('view')) {
    return <Badge variant="secondary">View</Badge>;
  }

  return (
    <Badge variant="outline" className="border-gray-600 text-gray-300">
      Other
    </Badge>
  );
};

export const formatDeliveryType = (trip: any) => {
  if (trip.delivery_type === 'other') {
    return trip.custom_delivery_description || 'Other';
  }

  return (
    trip.delivery_type
      ?.replaceAll('_', ' ')
      .replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'Unknown Type'
  );
};
