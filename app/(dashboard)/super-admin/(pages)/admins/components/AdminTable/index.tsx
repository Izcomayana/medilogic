'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import { Admin } from '../../type/admin';
// import { StatusBadge } from '../StatusBadge';
import { motion } from 'framer-motion';
import { StatusBadge } from '../../../organizations/components/StatusBadge';

interface Props {
  admins: Admin[];
  onEdit: (reg: Admin) => void;
  loading: boolean;
  onDelete: (regId: string) => void;
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

export const AdminTable = ({ admins, onEdit, loading, onDelete }: Props) => {
  return (
    <div className="rounded-md border border-gray-700">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-700 hover:bg-gray-800">
            <TableHead className="text-gray-300">Name</TableHead>
            <TableHead className="text-gray-300">Email</TableHead>
            <TableHead className="text-gray-300">Organization</TableHead>
            <TableHead className="text-gray-300">Status</TableHead>
            <TableHead className="text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
            : admins.map((a) => (
                <TableRow
                  key={a.id}
                  className="border-gray-700 hover:bg-gray-800"
                >
                  <TableCell className="font-medium text-white">
                    {a.name}
                  </TableCell>
                  <TableCell className="text-gray-300">{a.email}</TableCell>
                  <TableCell className="text-gray-300">{a.orgName}</TableCell>
                  <TableCell>
                    <StatusBadge status={a.status} />
                  </TableCell>
                  <TableCell>
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
                          onClick={() => onEdit(a)}
                        >
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-400 hover:bg-gray-600 cursor-pointer"
                          onClick={() => onDelete(a.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
};
