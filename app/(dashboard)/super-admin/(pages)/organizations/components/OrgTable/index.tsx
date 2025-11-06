'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Users, Eye, Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import { Organization } from '../../../../../../../hooks/orgs/org';
import { StatusBadge } from '../StatusBadge';
import { motion } from 'framer-motion';

interface Props {
  organizations: Organization[];
  onView: (org: Organization) => void;
  onEdit: (org: Organization) => void;
  onDelete: (orgId: string) => void;
  loading: boolean;
}

const SkeletonRow = () => (
  <motion.tr
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="border-gray-700"
  >
    {Array.from({ length: 5 }).map((_, idx) => (
      <TableCell key={idx}>
        <div className="h-4 w-24 bg-gray-700 rounded animate-pulse" />
      </TableCell>
    ))}
  </motion.tr>
);

export default function OrganizationTable({
  organizations,
  onView,
  onEdit,
  onDelete,
  loading,
}: Props) {
  return (
    <div className="rounded-md border border-gray-700">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-700 hover:bg-gray-800">
            <TableHead className="text-gray-300">Name</TableHead>
            <TableHead className="text-gray-300">Type</TableHead>
            <TableHead className="text-gray-300">Status</TableHead>
            <TableHead className="text-gray-300">Invite Code</TableHead>
            <TableHead className="text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
            : organizations.map((org) => (
                <TableRow
                  key={org.id}
                  className="border-gray-700 hover:bg-gray-800"
                >
                  <TableCell className="font-medium text-white">
                    {org.name}
                  </TableCell>
                  <TableCell className="text-gray-300">{org.type}</TableCell>
                  <TableCell>
                    <StatusBadge status={org.status} />
                  </TableCell>
                  <TableCell className="text-gray-300">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {org.invite_code}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 text-gray-400 hover:bg-gray-700"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-gray-700 border-gray-600"
                        >
                          <DropdownMenuItem
                            className="text-gray-300 hover:bg-gray-600 cursor-pointer"
                            onClick={() => onView(org)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-gray-300 hover:bg-gray-600 cursor-pointer"
                            onClick={() => onEdit(org)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer text-red-600 hover:bg-gray-600"
                            onClick={() => onDelete(org.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
