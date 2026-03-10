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
export function MedilogicTableSkeleton() {
  return (
    <div className="rounded-md border border-gray-700">
      <Table>
        <TableHeader className="bg-gray-800 text-gray-400">
          <TableRow>
            <TableHead className="px-4 py-3">Name</TableHead>
            <TableHead className="px-4 py-3">Email</TableHead>
            <TableHead className="px-4 py-3">Country</TableHead>
            <TableHead className="px-4 py-3">Plan</TableHead>
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
                <Skeleton className="h-4 w-20 bg-gray-700" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
