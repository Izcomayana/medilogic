// components/TripsFilters.tsx

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Search, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import DateRangeFilter, { DateRangeLocal } from '../../../DateRange';

type TripsFiltersProps = {
  totalCount: number;

  searchTerm: string;
  setSearchTerm: (val: string) => void;

  statusFilter: string;
  setStatusFilter: (val: string) => void;

  dateRange?: DateRangeLocal;
  setDateRange: (val: DateRangeLocal | undefined) => void;

  children?: React.ReactNode; // 👈 for CreateTrips button (admin only)
};

export function TripsFilters({
  totalCount,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  dateRange,
  setDateRange,

  children,
}: TripsFiltersProps) {
  return (
    <Card className="dashboard-card mb-6 w-full items-start">
      <CardHeader className="w-full">
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <CardTitle className="text-white flex gap-2">
            <MapPin className="h-5 w-5" />
            Trips ({totalCount})
          </CardTitle>
          {children}
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search trips..."
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
              <SelectItem value="in_progress">In Progress</SelectItem>
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
