import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Skeleton Loader for Trips Table
export function UsersTableSkeleton() {
  return (
    <div className="rounded-md border border-gray-700">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-700 hover:bg-gray-800">
            <TableHead className="text-gray-300">Name</TableHead>
            <TableHead className="text-gray-300">Email</TableHead>
            <TableHead className="text-gray-300">Role</TableHead>
            <TableHead className="text-gray-300">Status</TableHead>
            <TableHead className="text-gray-300">Date Joined</TableHead>
            <TableHead className="text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, i) => (
            <TableRow key={i} className="border-gray-700">
              <TableCell>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-20 bg-gray-700" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-32 bg-gray-700" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24 bg-gray-700" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24 bg-gray-700" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-28 bg-gray-700 rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-8 bg-gray-700 rounded-md" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
