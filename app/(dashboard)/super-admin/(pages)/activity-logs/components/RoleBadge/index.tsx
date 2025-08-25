import { Badge } from '@/components/ui/badge';

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
