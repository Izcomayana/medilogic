import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, MapPin, Clock } from 'lucide-react';
import { useActivityLogs } from '@/hooks/useActivity';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
// import { getRoleBadge } from '../RoleBadge';
import { getActionBadge } from '../ActionBadge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

type LogsTableProps = ReturnType<typeof useActivityLogs>;

export function LogsTable({
  filteredLogs,
  startIndex,
  logsPerPage,
  paginatedLogs,
  totalPages,
  currentPage,
  setCurrentPage,
  loading,
}: LogsTableProps) {
  const SkeletonRow = () => (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="border-gray-700"
    >
      {Array.from({ length: 6 }).map((_, idx) => (
        <TableCell key={idx}>
          <div className="h-4 w-32 bg-gray-700 rounded animate-pulse" />
        </TableCell>
      ))}
    </motion.tr>
  );

  return (
    <Card className="dashboard-card py-3">
      <CardHeader className="px-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Activity Logs ({filteredLogs.length} total)
          </CardTitle>
          {!loading && (
            <div className="text-sm text-gray-400">
              Showing {startIndex + 1}-
              {Math.min(startIndex + logsPerPage, filteredLogs.length)} of{' '}
              {filteredLogs.length}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="px-3">
        {loading ? (
          // 🔹 Show skeletons
          <div className="rounded-md border border-gray-700">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-gray-800">
                  <TableHead className="text-gray-300">Timestamp</TableHead>
                  <TableHead className="text-gray-300">User</TableHead>
                  <TableHead className="text-gray-300">Role</TableHead>
                  <TableHead className="text-gray-300">Action</TableHead>
                  <TableHead className="text-gray-300">Details</TableHead>
                  <TableHead className="text-gray-300">
                    IP Address / Location
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 10 }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))}
              </TableBody>
            </Table>
          </div>
        ) : filteredLogs.length === 0 ? (
          // 🔹 Empty state AFTER loading
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              No activity logs found
            </h3>
            <p className="text-gray-400">
              No activity logs found for the selected filters. Try adjusting
              your search or date range.
            </p>
          </div>
        ) : (
          // 🔹 Actual logs
          <>
            <div className="rounded-md border border-gray-700">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700 hover:bg-gray-800">
                    <TableHead className="text-gray-300">Timestamp</TableHead>
                    <TableHead className="text-gray-300">User</TableHead>
                    {/* <TableHead className="text-gray-300">Role</TableHead> */}
                    <TableHead className="text-gray-300">Action</TableHead>
                    <TableHead className="text-gray-300">Details</TableHead>
                    <TableHead className="text-gray-300">
                      IP Address / Location
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedLogs.map((log) => (
                    <TableRow
                      key={log.id}
                      className="border-gray-700 hover:bg-gray-800"
                    >
                      <TableCell className="text-gray-300">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {log.timestamp}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-white">
                        {log.user}
                      </TableCell>
                      {/* <TableCell>{getRoleBadge(log.role)}</TableCell> */}
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <span className="text-white text-sm">
                            {log.action}
                          </span>
                          {getActionBadge(log.action)}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300 max-w-xs truncate">
                        {log.details}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-mono">
                            {log.ipAddress}
                          </span>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {log.location}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-400">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="border-gray-600 text-gray-700 hover:text-gray-200 hover:bg-gray-700 disabled:opacity-50"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="border-gray-600 text-gray-700 hover:text-gray-200 hover:bg-gray-700 disabled:opacity-50"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
