'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  ClipboardList,
  Search,
  Eye,
  MapPin,
  Clock,
  User,
  Calendar,
} from 'lucide-react';
import { useState } from 'react';
import { PageHeader } from '../../../PageHeader';

const assignments = [
  {
    id: 'A001',
    driverName: 'John Smith',
    assignedTrip: 'Downtown Waste Collection',
    location: 'Downtown District A',
    date: '2024-01-20',
    time: '08:00 AM',
    status: 'Completed',
    duration: '3.5 hours',
    notes: 'All pickups completed successfully',
  },
  {
    id: 'A002',
    driverName: 'Sarah Johnson',
    assignedTrip: 'Industrial Zone Delivery',
    location: 'Industrial Park B',
    date: '2024-01-20',
    time: '09:30 AM',
    status: 'In Progress',
    duration: '2.0 hours (ongoing)',
    notes: 'Currently at location 3 of 5',
  },
  {
    id: 'A003',
    driverName: 'Mike Davis',
    assignedTrip: 'Residential Pickup Route',
    location: 'Residential Area C',
    date: '2024-01-20',
    time: '07:00 AM',
    status: 'Pending',
    duration: '4.0 hours (estimated)',
    notes: 'Scheduled for morning shift',
  },
  {
    id: 'A004',
    driverName: 'Lisa Wilson',
    assignedTrip: 'Commercial District Sweep',
    location: 'Commercial Zone D',
    date: '2024-01-19',
    time: '10:00 AM',
    status: 'Completed',
    duration: '2.8 hours',
    notes: 'Route completed ahead of schedule',
  },
  {
    id: 'A005',
    driverName: 'Tom Brown',
    assignedTrip: 'Hospital Waste Collection',
    location: 'Medical District',
    date: '2024-01-20',
    time: '06:00 AM',
    status: 'In Progress',
    duration: '1.5 hours (ongoing)',
    notes: 'Special handling required',
  },
];

export default function AssignmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedAssignment, setSelectedAssignment] = useState<
    (typeof assignments)[0] | null
  >(null);

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      assignment.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.assignedTrip
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      assignment.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      assignment.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesDate = dateFilter === 'all' || assignment.date === dateFilter;
    return matchesSearch && matchesStatus && matchesDate;
  });

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

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader
        title="Assignment Management"
        subtitle="View and manage driver assignments and shifts"
      />

      <div className="flex-1 p-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Driver Assignments ({filteredAssignments.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col lg:flex-row items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by driver, trip, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px] bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in progress">In Progress</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[150px] bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="2024-01-20">Today</SelectItem>
                  <SelectItem value="2024-01-19">Yesterday</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Assignments Table */}
            <div className="rounded-md border border-gray-700">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700 hover:bg-gray-800">
                    <TableHead className="text-gray-300">Driver Name</TableHead>
                    <TableHead className="text-gray-300">
                      Assigned Trip
                    </TableHead>
                    <TableHead className="text-gray-300">Location</TableHead>
                    <TableHead className="text-gray-300">Date & Time</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssignments.map((assignment) => (
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
                                Full details for assignment{' '}
                                {selectedAssignment?.id}
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
                                      {getStatusBadge(
                                        selectedAssignment.status
                                      )}
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
                                  <label className="text-sm text-gray-400">
                                    Notes
                                  </label>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
