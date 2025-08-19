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
import { Regulator } from '../../types/regulator';
import { StatusBadge } from '../StatusBadge';
import { toast } from 'sonner';

interface Props {
  regulators: Regulator[];
  onEdit: (reg: Regulator) => void;
}

export const RegulatorTable = ({ regulators, onEdit }: Props) => {
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
            <TableHead className="text-gray-300">Joined Date</TableHead>
            <TableHead className="text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {regulators.map((r) => (
            <TableRow key={r.id} className="border-gray-700 hover:bg-gray-800">
              <TableCell className="font-medium text-white">{r.name}</TableCell>
              <TableCell className="text-gray-300">{r.email}</TableCell>
              <TableCell className="text-gray-300">{r.region}</TableCell>
              <TableCell>
                <StatusBadge status={r.status} />
              </TableCell>
              <TableCell className="text-gray-300">{r.joinedDate}</TableCell>
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
