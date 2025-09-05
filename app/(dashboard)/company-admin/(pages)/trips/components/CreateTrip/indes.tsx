import * as React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { useTrips } from '@/hooks/useTrips';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
// import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

type CreateTripProps = ReturnType<typeof useTrips>;

export function CreateTrips({
  isCreateModalOpen,
  setIsCreateModalOpen,
  // filteredTrips,
  formData,
  setFormData,
  drivers,
  handleCreateTrip,
  loading,
}: CreateTripProps) {
  // const handleExport = (type: 'csv' | 'pdf') => {
  //   toast.success(
  //     `${type.toUpperCase()} export started for ${filteredTrips.length} trips`
  //   );
  // };

  return (
    <AlertDialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
      <div className="flex flex-col md:flex-row mt-4 lg:mt-0 gap-2">
        {/* <Button
          onClick={() => handleExport('csv')}
          variant="outline"
          className="border-gray-600 text-gray-700 hover:text-gray-300 hover:bg-gray-700"
        >
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
        <Button onClick={() => handleExport('pdf')} className="primary-button">
          <Download className="h-4 w-4 mr-2" />
          Export PDF
        </Button> */}
        <AlertDialogTrigger asChild>
          <Button className="primary-button">
            <Plus className="h-4 w-4 mr-2" />
            New Trip{' '}
          </Button>
        </AlertDialogTrigger>
      </div>
      <AlertDialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
        <AlertDialogHeader>
          <div className="flex justify-between">
            <AlertDialogTitle>Create New Trip</AlertDialogTitle>
            <AlertDialogCancel
              className="text-gray-700"
              onClick={() => setIsCreateModalOpen(false)}
            >
              <X />
            </AlertDialogCancel>
          </div>
          <AlertDialogDescription className="text-gray-400">
            {' '}
            Schedule a new waste collection or delivery trip.{' '}
          </AlertDialogDescription>{' '}
        </AlertDialogHeader>{' '}
        <div className="grid gap-4 py-4">
          {' '}
          <div className="grid grid-cols-2 gap-4">
            {' '}
            {/* <div> 
              <Label htmlFor="client" className="text-gray-300"> 
                Client / Organization 
              </Label> 
              <Select value={formData.clientOrganization} onValueChange={(value) => setFormData({ ...formData, clientOrganization: value }) }> 
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2"> 
                  <SelectValue placeholder="Select client" /> 
                </SelectTrigger> 
                <SelectContent className="bg-gray-700 border-gray-600"> 
                  {clients.map((client) => ( <SelectItem key={client} value={client}> {client} </SelectItem> ))} 
                </SelectContent> 
              </Select> 
            </div> */}{' '}
            <div>
              {' '}
              <Label htmlFor="driver" className="text-gray-300">
                {' '}
                Driver Assigned{' '}
              </Label>{' '}
              <Select
                value={formData.driverAssigned}
                onValueChange={(value) =>
                  setFormData({ ...formData, driverAssigned: value })
                }
              >
                {' '}
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
                  {' '}
                  <SelectValue placeholder="Select driver" />{' '}
                </SelectTrigger>{' '}
                <SelectContent className="bg-gray-700 border-gray-600">
                  {' '}
                  {drivers.map((driver) => (
                    <SelectItem key={driver} value={driver}>
                      {' '}
                      {driver}{' '}
                    </SelectItem>
                  ))}{' '}
                </SelectContent>{' '}
              </Select>{' '}
            </div>{' '}
          </div>{' '}
          <div>
            {' '}
            <Label htmlFor="pickup" className="text-gray-300">
              {' '}
              Pickup Address{' '}
            </Label>{' '}
            <Input
              id="pickup"
              value={formData.pickupLocation}
              onChange={(e) =>
                setFormData({ ...formData, pickupLocation: e.target.value })
              }
              placeholder="Enter pickup location"
              className="bg-gray-700 border-gray-600 text-white mt-2"
            />{' '}
          </div>{' '}
          <div>
            {' '}
            <Label htmlFor="dropoff" className="text-gray-300">
              {' '}
              Dropoff Address{' '}
            </Label>{' '}
            <Input
              id="dropoff"
              value={formData.dropoffLocation}
              onChange={(e) =>
                setFormData({ ...formData, dropoffLocation: e.target.value })
              }
              placeholder="Enter dropoff location"
              className="bg-gray-700 border-gray-600 text-white mt-2"
            />{' '}
          </div>{' '}
          <div className="grid grid-cols-2 gap-4">
            {' '}
            <div>
              {' '}
              <Label htmlFor="datetime" className="text-gray-300">
                {' '}
                Trip Date & Time{' '}
              </Label>{' '}
              <Input
                id="datetime"
                type="datetime-local"
                value={formData.dateTime}
                onChange={(e) =>
                  setFormData({ ...formData, dateTime: e.target.value })
                }
                className="bg-gray-700 border-gray-600 text-white mt-2"
              />{' '}
            </div>{' '}
            <div>
              {' '}
              <Label htmlFor="status" className="text-gray-300">
                {' '}
                Status{' '}
              </Label>{' '}
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
              >
                {' '}
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
                  {' '}
                  <SelectValue />{' '}
                </SelectTrigger>{' '}
                <SelectContent className="bg-gray-700 border-gray-600">
                  {' '}
                  <SelectItem value="Pending">Pending</SelectItem>{' '}
                  <SelectItem value="In Progress">In Progress</SelectItem>{' '}
                  <SelectItem value="Completed">Completed</SelectItem>{' '}
                  <SelectItem value="Cancelled">Cancelled</SelectItem>{' '}
                </SelectContent>{' '}
              </Select>{' '}
            </div>{' '}
          </div>{' '}
          <div>
            {' '}
            <Label htmlFor="notes" className="text-gray-300">
              {' '}
              Notes / Special Instructions{' '}
            </Label>{' '}
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Enter any special instructions or notes"
              className="bg-gray-700 border-gray-600 text-white mt-2"
              rows={3}
            />{' '}
          </div>{' '}
        </div>{' '}
        <AlertDialogFooter>
          {' '}
          <Button
            variant="outline"
            onClick={() => setIsCreateModalOpen(false)}
            className="text-gray-700 hover:text-gray-300 hover:bg-gray-700"
          >
            {' '}
            Cancel{' '}
          </Button>{' '}
          <Button
            onClick={handleCreateTrip}
            className="primary-button"
            disabled={loading} // ✅ disable while loading
          >
            {loading ? 'Creating...' : 'Create Trip'}
          </Button>{' '}
        </AlertDialogFooter>{' '}
      </AlertDialogContent>{' '}
    </AlertDialog>
  );
}
