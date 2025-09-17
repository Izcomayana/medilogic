import { Badge } from '@/components/ui/badge';
import { User, UserCheck, CheckCircle, AlertCircle } from 'lucide-react';

export const getRoleBadge = (role?: string) => {
  if (!role) return <Badge variant="outline">Unknown</Badge>;
  switch (role.toLowerCase()) {
    case 'client':
      return (
        <Badge variant="secondary" className="bg-blue-600 text-white">
          <User className="h-3 w-3 mr-1" />
          Client
        </Badge>
      );
    case 'driver':
      return (
        <Badge variant="secondary" className="bg-green-600 text-white">
          <UserCheck className="h-3 w-3 mr-1" />
          Driver
        </Badge>
      );
    default:
      return <Badge variant="outline">{role}</Badge>;
  }
};

export const getStatusBadge = (status?: string) => {
  // guard against undefined/null
  if (!status) return <Badge variant="outline">Unknown</Badge>;
  switch (status.toLowerCase()) {
    case 'active':
      return (
        <Badge className="bg-[#15941f] text-white">
          <CheckCircle className="h-3 w-3 mr-1" />
          Active
        </Badge>
      );
    case 'suspended':
      return (
        <Badge variant="destructive">
          <AlertCircle className="h-3 w-3 mr-1" />
          Suspended
        </Badge>
      );
    case 'inactive':
      return (
        <Badge variant="destructive">
          <AlertCircle className="h-3 w-3 mr-1" />
          Inactive
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (dateTimeString: string) => {
  return new Date(dateTimeString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
