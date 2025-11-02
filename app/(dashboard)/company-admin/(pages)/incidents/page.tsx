'use client';

import { PageHeader } from '@/app/(dashboard)/components/PageHeader';
import {
  Eye,
  AlertCircle,
  Calendar,
  Filter,
  MessageSquare,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useIncidents } from '@/hooks/useIncidents';

export default function AdminIncidentsPage() {
  const {
    showDetailsModal,
    selectedIncident,
    setShowDetailsModal,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    driverFilter,
    setDriverFilter,
    handleViewIncident,
    handleStatusChange,
    handleAddNote,
    filteredIncidents,
    drivers,
    modalState,
    setModalState,
  } = useIncidents();

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
        return <Badge className="bg-blue-600 text-white">New</Badge>;
      case 'under review':
        return <Badge className="bg-yellow-600 text-white">Under Review</Badge>;
      case 'needs follow-up':
        return (
          <Badge className="bg-orange-600 text-white">Needs Follow-up</Badge>
        );
      case 'resolved':
        return <Badge className="bg-green-600 text-white">Resolved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <PageHeader
        title="Incident Reports"
        subtitle="Review and manage driver-reported incidents"
      />

      <main className="flex-1 p-6">
        {/* Filters and Search */}
        <Card className="dashboard-card mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Filters ({filteredIncidents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by incident ID, driver, or trip..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                <div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="under review">Under Review</SelectItem>
                      <SelectItem value="needs follow-up">
                        Needs Follow-up
                      </SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Select value={driverFilter} onValueChange={setDriverFilter}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="all">All Drivers</SelectItem>
                      {drivers.map((driver) => (
                        <SelectItem key={driver.id} value={driver.id}>
                          {driver.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Select defaultValue="all">
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="damage">Damage</SelectItem>
                      <SelectItem value="delay">Delay</SelectItem>
                      <SelectItem value="safety">Safety Concern</SelectItem>
                      <SelectItem value="customer">Customer Refusal</SelectItem>
                      <SelectItem value="access">
                        Location Access Issue
                      </SelectItem>
                      <SelectItem value="vehicle">Vehicle Breakdown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Incidents Table */}
        <Card className="dashboard-card">
          <CardContent className="p-0">
            {filteredIncidents.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">
                  No incidents found
                </h3>
                <p className="text-gray-400">
                  No incidents match your search and filter criteria
                </p>
              </div>
            ) : (
              <div className="rounded-md border border-gray-700 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700 hover:bg-gray-800">
                      <TableHead className="text-gray-300">ID</TableHead>
                      <TableHead className="text-gray-300">Driver</TableHead>
                      <TableHead className="text-gray-300">Trip</TableHead>
                      <TableHead className="text-gray-300">Type</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">
                        Reported Date
                      </TableHead>
                      <TableHead className="text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredIncidents.map((incident) => (
                      <TableRow
                        key={incident.id}
                        className="border-gray-700 hover:bg-gray-800"
                      >
                        <TableCell className="font-medium text-white">
                          {incident.id}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {incident.driver}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {incident.tripId}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {incident.type}
                        </TableCell>
                        <TableCell>{getStatusBadge(incident.status)}</TableCell>
                        <TableCell className="text-gray-300 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {incident.reportedDate}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewIncident(incident)}
                            className="border-gray-600 text-gray-300 hover:bg-gray-700"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
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
      </main>

      {/* Incident Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white lg:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              {selectedIncident?.id}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Review and manage incident details
            </DialogDescription>
          </DialogHeader>

          {selectedIncident && (
            <div className="space-y-6 py-4">
              {/* Incident Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-400 text-sm">Driver</Label>
                  <p className="text-white font-medium mt-1">
                    {selectedIncident.driver}
                  </p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Trip</Label>
                  <p className="text-white font-medium mt-1">
                    {selectedIncident.tripId}
                  </p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Type</Label>
                  <p className="text-white font-medium mt-1">
                    {selectedIncident.type}
                  </p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">
                    Current Status
                  </Label>
                  <div className="mt-1">
                    {getStatusBadge(selectedIncident.status)}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <Label className="text-gray-400 text-sm">Description</Label>
                <div className="bg-gray-700 rounded p-3 border border-gray-600 mt-1">
                  <p className="text-gray-300 text-sm">
                    {selectedIncident.description}
                  </p>
                </div>
              </div>

              {/* Timestamp */}
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <Calendar className="h-4 w-4" />
                <span>
                  {selectedIncident.reportedDate} at{' '}
                  {selectedIncident.reportedTime}
                </span>
              </div>

              {/* Status Change Section */}
              <div className="border-t border-gray-700 pt-4 mt-4">
                <Label className="text-gray-300 text-sm mb-3 block">
                  Change Status
                </Label>
                <div className="flex gap-2">
                  <Select
                    value={modalState.newStatus}
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Under Review">Under Review</SelectItem>
                      <SelectItem value="Needs Follow-up">
                        Needs Follow-up
                      </SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Internal Notes Section */}
              <div className="border-t border-gray-700 pt-4 mt-4">
                <Label className="text-gray-300 text-sm mb-2 block flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Internal Notes
                </Label>
                <Textarea
                  value={modalState.internalNote}
                  onChange={(e) =>
                    setModalState({
                      ...modalState,
                      internalNote: e.target.value,
                    })
                  }
                  placeholder="Add internal notes about this incident..."
                  className="bg-gray-700 border-gray-600 text-white mb-2"
                  rows={3}
                />
                <Button
                  onClick={handleAddNote}
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                >
                  Save Note
                </Button>
              </div>

              {/* Audit History */}
              <div className="border-t border-gray-700 pt-4 mt-4">
                <Label className="text-gray-300 text-sm mb-3 block">
                  Audit History
                </Label>
                <div className="space-y-2">
                  {selectedIncident.auditHistory.map((entry, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-700 rounded p-3 border border-gray-600 text-sm"
                    >
                      <p className="text-white font-medium">{entry.action}</p>
                      <p className="text-gray-400 text-xs mt-1">
                        {entry.timestamp} by {entry.by}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDetailsModal(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
