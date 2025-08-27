import { Card, CardContent } from '@/components/ui/card';
import { usePendingApplications } from '@/hooks/usePendingApplications';
import { ClipboardList, Eye, Mail, MapPin } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate, getRoleBadge } from '../Filters';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

type ApplicationsTableProps = ReturnType<typeof usePendingApplications>;

export function ApplicationsTable({
  sortedApplications,
  handleViewDetails,
  loading,
}: ApplicationsTableProps) {
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
    <Card className="dashboard-card">
      <CardContent className="p-0">
        {loading ? (
          // 🔹 Show skeletons
          <div className="rounded-md border border-gray-700">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-gray-800">
                  <TableHead className="text-gray-300">Applicant</TableHead>
                  <TableHead className="text-gray-300">Role</TableHead>
                  <TableHead className="text-gray-300">
                    Organization / Region
                  </TableHead>
                  <TableHead className="text-gray-300">Submitted On</TableHead>
                  <TableHead className="text-gray-300">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))}
              </TableBody>
            </Table>
          </div>
        ) : sortedApplications.length === 0 ? (
          <div className="text-center py-12">
            <ClipboardList className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              📭 No pending applications at the moment
            </h3>
            <p className="text-gray-400">
              Youll see new regulator and organization admin requests here.
            </p>
          </div>
        ) : (
          <div className="rounded-md border border-gray-700">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-gray-800">
                  <TableHead className="text-gray-300">Applicant</TableHead>
                  <TableHead className="text-gray-300">Role</TableHead>
                  <TableHead className="text-gray-300">
                    Organization / Region
                  </TableHead>
                  <TableHead className="text-gray-300">Submitted On</TableHead>
                  <TableHead className="text-gray-300">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedApplications.map((application) => (
                  <TableRow
                    key={application.id}
                    className="border-gray-700 hover:bg-gray-800"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <span className="font-medium text-white">
                            {application.applicantName}
                          </span>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {application.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(application.role)}</TableCell>
                    <TableCell className="text-gray-300">
                      {application.role === 'Admin' ? (
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {application.organizationName}
                          </span>
                          <span className="text-xs text-gray-400">
                            {application.organizationType}
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col">
                          <span className="font-medium">
                            <MapPin className="h-3 w-3" />
                            {application.country}
                          </span>
                          <span className="text-xs text-gray-400">
                            {application.state} → {application.region}
                          </span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {formatDate(application.submittedDate)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(application)}
                        className="border-gray-600 text-gray-700 hover:text-gray-300 hover:bg-gray-700"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
