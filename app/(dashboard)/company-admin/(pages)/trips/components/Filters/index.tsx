import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MapPin, Plus, Search, Calendar, Filter, Download } from 'lucide-react';
import { useTrips } from '@/hooks/useTrips';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

type FiltersProps = ReturnType<typeof useTrips>;

export function Filters({
  filteredTrips,
  isCreateModalOpen,
  setIsCreateModalOpen,
  formData,
  setFormData,
  clients,
  drivers,
  handleCreateTrip,
  searchTerm,
  setSearchTerm,
  dateFilter,
  statusFilter,
  setStatusFilter,
  setDateFilter,
}: FiltersProps) {
  const handleExport = (type: 'csv' | 'pdf') => {
    toast.success(
      `${type.toUpperCase()} export started for ${filteredTrips.length} trips`
    );
  };

  return (
    <Card className="dashboard-card mb-6 w-full items-start">
      <CardHeader className="w-full">
        <div className="flex flex-col lg:flex-row justify-between">
          <CardTitle className="text-white flex  gap-2">
            <MapPin className="h-5 w-5" />
            Trips Management ({filteredTrips.length})
          </CardTitle>
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <div className="flex flex-col md:flex-row mt-4 lg:mt-0 gap-2">
              <Button
                onClick={() => handleExport('csv')}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button
                onClick={() => handleExport('pdf')}
                className="primary-button"
              >
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <DialogTrigger asChild>
                <Button className="primary-button">
                  <Plus className="h-4 w-4 mr-2" />
                  New Trip
                </Button>
              </DialogTrigger>
            </div>

            <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Trip</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Schedule a new waste collection or delivery trip.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="client" className="text-gray-300">
                      Client / Organization
                    </Label>
                    <Select
                      value={formData.clientOrganization}
                      onValueChange={(value) =>
                        setFormData({ ...formData, clientOrganization: value })
                      }
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {clients.map((client) => (
                          <SelectItem key={client} value={client}>
                            {client}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="driver" className="text-gray-300">
                      Driver Assigned
                    </Label>
                    <Select
                      value={formData.driverAssigned}
                      onValueChange={(value) =>
                        setFormData({ ...formData, driverAssigned: value })
                      }
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select driver" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {drivers.map((driver) => (
                          <SelectItem key={driver} value={driver}>
                            {driver}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="pickup" className="text-gray-300">
                    Pickup Address
                  </Label>
                  <Input
                    id="pickup"
                    value={formData.pickupLocation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pickupLocation: e.target.value,
                      })
                    }
                    placeholder="Enter pickup location"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="dropoff" className="text-gray-300">
                    Dropoff Address
                  </Label>
                  <Input
                    id="dropoff"
                    value={formData.dropoffLocation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dropoffLocation: e.target.value,
                      })
                    }
                    placeholder="Enter dropoff location"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="datetime" className="text-gray-300">
                      Trip Date & Time
                    </Label>
                    <Input
                      id="datetime"
                      type="datetime-local"
                      value={formData.dateTime}
                      onChange={(e) =>
                        setFormData({ ...formData, dateTime: e.target.value })
                      }
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="status" className="text-gray-300">
                      Status
                    </Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) =>
                        setFormData({ ...formData, status: value })
                      }
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes" className="text-gray-300">
                    Notes / Special Instructions
                  </Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    placeholder="Enter any special instructions or notes"
                    className="bg-gray-700 border-gray-600 text-white"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateTrip} className="primary-button">
                  Create Trip
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by trip ID, driver, client, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px] bg-gray-700 border-gray-600 text-white">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-[150px] bg-gray-700 border-gray-600 text-white">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="2025-08-24">Today</SelectItem>
              <SelectItem value="2025-08-23">Yesterday</SelectItem>
              <SelectItem value="2025-08-22">2 days ago</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
