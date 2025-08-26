import { Badge } from '@/components/ui/badge';

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
