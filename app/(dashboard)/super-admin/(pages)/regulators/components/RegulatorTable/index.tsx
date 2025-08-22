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
import { Edit, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { Regulators } from '../../types/regulator';
import { StatusBadge } from '../StatusBadge';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface Props {
  regulators: Regulators[];
  onEdit: (reg: Regulators) => void;
  onView: (reg: Regulators) => void;
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

export const RegulatorTable = ({
  regulators,
  onEdit,
  onView,
  loading,
}: Props) => {
  const handleDisable = (name: string) =>
    toast.success(`${name} has been disabled`);

  return (
    <div className="rounded-md border border-gray-700">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-700 hover:bg-gray-800">
            <TableHead className="text-gray-300">Name</TableHead>
            <TableHead className="text-gray-300">Email</TableHead>
            <TableHead className="text-gray-300">Region</TableHead>
            <TableHead className="text-gray-300">Status</TableHead>
            <TableHead className="text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
            : regulators.map((r) => (
                <TableRow
                  key={r.id}
                  className="border-gray-700 hover:bg-gray-800"
                >
                  <TableCell className="font-medium text-white">
                    {r.name}
                  </TableCell>
                  <TableCell className="text-gray-300">{r.email}</TableCell>
                  <TableCell className="text-gray-300">{r.regRegion}</TableCell>
                  <TableCell>
                    <StatusBadge status={r.status} />
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
                          onClick={() => onView(r)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-gray-300 hover:bg-gray-600 cursor-pointer"
                          onClick={() => onEdit(r)}
                        >
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-400 hover:bg-gray-600 cursor-pointer"
                          onClick={() => handleDisable(r.name)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Disable
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
