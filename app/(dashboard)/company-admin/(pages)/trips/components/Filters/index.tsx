import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Search, Filter } from 'lucide-react';
import { useTrips } from '@/hooks/useTrips';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { CreateTrips } from '../CreateTrip/indes';
import DateRangeFilter from './dateRange';

type FiltersProps = ReturnType<typeof useTrips>;

export function Filters({
  filteredTrips,
  searchTerm,
  setSearchTerm,
  dateRange,
  statusFilter,
  setStatusFilter,
  setDateRange,
}: FiltersProps) {
  const tripState = useTrips();

  return (
    <Card className="dashboard-card mb-6 w-full items-start">
      <CardHeader className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <CardTitle className="text-white flex  gap-2">
            <MapPin className="h-5 w-5" />
            Trips Management ({filteredTrips.length})
          </CardTitle>
          <CreateTrips {...tripState} />
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col md:flex-row  gap-4 mb-4">
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
          <DateRangeFilter value={dateRange} onChange={setDateRange} />
        </div>
      </CardContent>
    </Card>
  );
}
