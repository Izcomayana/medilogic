/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Badge } from '@/components/ui/badge';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Eye, MapPin, Clock, User, Calendar } from 'lucide-react';

interface AssignmentsTableProps {
  filteredAssignments: any;
  selectedAssignment: any;
  setSelectedAssignment: any;
}

const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return <Badge className="bg-[#15941f] text-white">Completed</Badge>;
    case 'in progress':
      return (
        <Badge variant="secondary" className="bg-blue-600 text-white">
          In Progress
        </Badge>
      );
    case 'pending':
      return (
        <Badge variant="secondary" className="bg-yellow-600 text-white">
          Pending
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export function AssignmentsTable({
  filteredAssignments,
  selectedAssignment,
  setSelectedAssignment,
}: AssignmentsTableProps) {
  return (
    <div className="rounded-md border border-gray-700">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-700 hover:bg-gray-800">
            <TableHead className="text-gray-300">Driver Name</TableHead>
            <TableHead className="text-gray-300">Assigned Trip</TableHead>
            <TableHead className="text-gray-300">Location</TableHead>
            <TableHead className="text-gray-300">Date & Time</TableHead>
            <TableHead className="text-gray-300">Status</TableHead>
            <TableHead className="text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAssignments.map((assignment: any) => (
            <TableRow
              key={assignment.id}
              className="border-gray-700 hover:bg-gray-800"
            >
              <TableCell className="font-medium text-white flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                {assignment.driverName}
              </TableCell>
              <TableCell className="text-gray-300">
                {assignment.assignedTrip}
              </TableCell>
              <TableCell className="text-gray-300 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {assignment.location}
              </TableCell>
              <TableCell className="text-gray-300">
                <div className="flex flex-col">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {assignment.date}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    {assignment.time}
                  </span>
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(assignment.status)}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedAssignment(assignment)}
                      className="cursor-pointer text-gray-600 border-gray-600 hover:bg-gray-700"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
                    <DialogHeader>
                      <DialogTitle>Assignment Details</DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Full details for assignment {selectedAssignment?.id}
                      </DialogDescription>
                    </DialogHeader>
                    {selectedAssignment && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-gray-400">
                              Driver
                            </label>
                            <p className="text-white font-medium">
                              {selectedAssignment.driverName}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm text-gray-400">
                              Status
                            </label>
                            <div className="mt-1">
                              {getStatusBadge(selectedAssignment.status)}
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">
                            Assigned Trip
                          </label>
                          <p className="text-white">
                            {selectedAssignment.assignedTrip}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">
                            Location
                          </label>
                          <p className="text-white flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {selectedAssignment.location}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-gray-400">
                              Date
                            </label>
                            <p className="text-white">
                              {selectedAssignment.date}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm text-gray-400">
                              Time
                            </label>
                            <p className="text-white">
                              {selectedAssignment.time}
                            </p>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">
                            Duration
                          </label>
                          <p className="text-white">
                            {selectedAssignment.duration}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">Notes</label>
                          <p className="text-white text-sm">
                            {selectedAssignment.notes}
                          </p>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
