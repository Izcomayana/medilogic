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
export function TripsTableSkeleton() {
  return (
    <div className="rounded-md border border-gray-700">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-700">
            <TableHead className="text-gray-300">Driver</TableHead>
            <TableHead className="text-gray-300">Status</TableHead>
            <TableHead className="text-gray-300">Route</TableHead>
            <TableHead className="text-gray-300">Date & Time</TableHead>
            <TableHead className="text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i} className="border-gray-700">
              <TableCell>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-20 bg-gray-700" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-24 bg-gray-700 rounded-full" />
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-32 bg-gray-700" />
                  <Skeleton className="h-4 w-32 bg-gray-700" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-28 bg-gray-700" />
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-16 bg-gray-700 rounded-md" />
                  <Skeleton className="h-8 w-8 bg-gray-700 rounded-md" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
