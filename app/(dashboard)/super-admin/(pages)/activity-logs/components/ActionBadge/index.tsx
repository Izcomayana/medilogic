import { Badge } from '@/components/ui/badge';

export const getActionBadge = (action: string) => {
  if (
    action.toLowerCase().includes('created') ||
    action.toLowerCase().includes('assigned')
  ) {
    return <Badge className="bg-[#15941f] text-white">Create</Badge>;
  }
  if (action.toLowerCase().includes('updated')) {
    return (
      <Badge variant="secondary" className="bg-blue-600 text-white">
        Update
      </Badge>
    );
  }
  if (
    action.toLowerCase().includes('deleted') ||
    action.toLowerCase().includes('rejected')
  ) {
    return <Badge variant="destructive">Delete</Badge>;
  }
  if (action.toLowerCase().includes('approved')) {
    return (
      <Badge variant="secondary" className="bg-green-600 text-white">
        Approve
      </Badge>
    );
  }
  if (action.toLowerCase().includes('login')) {
    return (
      <Badge variant="secondary" className="bg-gray-600 text-white">
        Login
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="border-gray-600 text-gray-300">
      Other
    </Badge>
  );
};
