'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Clock3, Edit, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/app/(dashboard)/components/PageHeader';
import { useAvailability } from '../../hooks/useAvailability';
import { formatTime } from '@/utils/datetime';

export default function DriverAvailabilityPage() {
  const {
    days,
    availability,
    isEditing,
    totalSetDays,
    handleOpenModal,
    handleDelete,
    handleSaveAll,
    handleCloseModal,
    handleSave,
    isModalOpen,
    setIsModalOpen,
    selectedDay,
    setSelectedDay,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
  } = useAvailability();

  return (
    <div className="flex flex-col bg-gray-900">
      <PageHeader
        title="Driver Availability"
        subtitle={`Manage your working schedule to receive trip assignments. ${totalSetDays} days set`}
      />
      <div className="p-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gray-800 border border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300">
                Available Days
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-500">
                {totalSetDays}
              </div>
              <p className="text-xs text-gray-400 mt-1">out of 7 days</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300">
                Weekly Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#15941f]">
                {availability
                  .reduce((acc, a) => {
                    if (!a.isSet || !a.startTime || !a.endTime) return acc;
                    const [startH, startM] = a.startTime.split(':').map(Number);
                    const [endH, endM] = a.endTime.split(':').map(Number);
                    const hours = endH + endM / 60 - (startH + startM / 60);
                    return acc + hours;
                  }, 0)
                  .toFixed(1)}
              </div>
              <p className="text-xs text-gray-400 mt-1">total hours</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300">
                Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                <span className="text-white font-medium">Available</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                ready for assignments
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Schedule Table */}
        <Card className="bg-gray-800 border border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock3 className="h-5 w-5" />
              Weekly Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="rounded-md border border-gray-700">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700 hover:bg-gray-800">
                    <TableHead className="text-gray-300">Day</TableHead>
                    <TableHead className="text-gray-300">Start Time</TableHead>
                    <TableHead className="text-gray-300">End Time</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {availability.map((entry) => (
                    <TableRow
                      key={entry.day}
                      className="border-gray-700 hover:bg-gray-800"
                    >
                      <TableCell className="font-medium text-white">
                        {entry.day}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {entry.isSet ? formatTime(entry.startTime) : 'Not Set'}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {entry.isSet ? formatTime(entry.endTime) : 'Not Set'}
                      </TableCell>
                      <TableCell>
                        {entry.isSet ? (
                          <Badge className="bg-[#15941f] text-white">
                            Available
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="bg-gray-700 text-gray-300"
                          >
                            Not Set
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenModal(entry.day)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {entry.isSet && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(entry.day)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <Link href="/driver">
            <Button
              variant="outline"
              className="border-gray-600 text-gray-800 hover:bg-gray-700"
            >
              Back to Dashboard
            </Button>
          </Link>
          <Button onClick={handleSaveAll} className="primary-button">
            Save Changes
          </Button>
        </div>
      </div>

      {/* Add / Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock3 className="h-5 w-5 text-blue-500" />
              {isEditing ? 'Edit' : 'Add'} Availability
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Set your working hours for a specific day.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div>
              <Label htmlFor="day" className="text-gray-300 mb-2 block">
                Day of Week
              </Label>
              <Select value={selectedDay} onValueChange={setSelectedDay}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select a day" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {days.map((day) => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startTime" className="text-gray-300 mb-2 block">
                  Start Time
                </Label>
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="endTime" className="text-gray-300 mb-2 block">
                  End Time
                </Label>
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCloseModal}
              className="border-gray-600 text-gray-800 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button onClick={handleSave} className="primary-button">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
