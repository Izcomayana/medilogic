import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Package, Calendar, Filter, Users } from 'lucide-react';
import { useState } from 'react';

export default function Filters() {
  const [dateRange, setDateRange] = useState('7days');
  const [selectedDriver, setSelectedDriver] = useState('All Drivers');
  const [selectedDeliveryType, setSelectedDeliveryType] = useState('All Types');

  return (
    <>
      {/* Filters Section */}
      <Card className="dashboard-card mb-6">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            {/* Date Range */}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[150px] bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">This Month</SelectItem>
                  <SelectItem value="90days">Last 3 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Driver */}
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-400" />
              <Select value={selectedDriver} onValueChange={setSelectedDriver}>
                <SelectTrigger className="w-[150px] bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="All Drivers">All Drivers</SelectItem>
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
                  <SelectItem value="All Types">All Types</SelectItem>
                  <SelectItem value="Clinical Waste">Clinical Waste</SelectItem>
                  <SelectItem value="Documents">Documents</SelectItem>
                  <SelectItem value="Equipment">Equipment</SelectItem>
                  <SelectItem value="Samples">Samples</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="primary-button">Apply Filters</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
