import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Package, Filter, Users } from 'lucide-react';
import DateRangeFilter from '../../../trips/components/Filters/dateRange';
import { useTripAnalytics } from '@/hooks/tripsAnalytics/useTripAnalytics';

type FiltersProps = ReturnType<typeof useTripAnalytics>;

export default function Filters({
  dateRange,
  setDateRange,
  selectedDriver,
  setSelectedDriver,
  selectedDeliveryType,
  setSelectedDeliveryType,
  status,
  setStatus,
}: FiltersProps) {
  return (
    <Card className="dashboard-card mb-6">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 items-end flex-wrap">
          {/* Date Range */}
          <DateRangeFilter value={dateRange} onChange={setDateRange} />

          {/* Driver */}
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-400" />
            <Select value={selectedDriver} onValueChange={setSelectedDriver}>
              <SelectTrigger className="w-[150px] bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all">All Drivers</SelectItem>
                {/* TODO: populate with real drivers list */}
              </SelectContent>
            </Select>
          </div>

          {/* Delivery Type */}
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-gray-400" />
            <Select
              value={selectedDeliveryType}
              onValueChange={setSelectedDeliveryType}
            >
              <SelectTrigger className="w-[150px] bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="clinical_waste">Clinical Waste</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
                {/* <SelectItem value="documents">Documents</SelectItem>
                <SelectItem value="samples">Samples</SelectItem>
                <SelectItem value="other">Other</SelectItem> */}
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          {/* <Select value={status} onValueChange={setStatus}>
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
                    </Select> */}
        </div>
      </CardContent>
    </Card>
  );
}
