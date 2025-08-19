import { Badge } from '@/components/ui/badge';

export const StatusBadge = ({ status }: { status: string }) => {
  switch (status.toLowerCase()) {
    case 'active':
      return <Badge className="bg-[#15941f] text-white">Active</Badge>;
    case 'inactive':
      return <Badge variant="destructive">Inactive</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};
