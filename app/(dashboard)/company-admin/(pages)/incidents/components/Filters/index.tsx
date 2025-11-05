import { Input } from '@/components/ui/input';
import { Filter, Search } from 'lucide-react';
import { useAdminIncidents } from '@/hooks/incidents/adminIncidents';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type IncidentFiltersProps = ReturnType<typeof useAdminIncidents>;

export function IncidentFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  driverFilter,
  setDriverFilter,
  drivers,
}: IncidentFiltersProps) {
  return (
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
              <SelectItem value="needs follow-up">Needs Follow-up</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* <div>
          <Select value={driverFilter} onValueChange={setDriverFilter}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="all">All Drivers</SelectItem>
              {drivers.map((driver) => (
                <SelectItem key={driver.id} value={driver.id ?? ''}>
                  {driver.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}

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
              <SelectItem value="access">Location Access Issue</SelectItem>
              <SelectItem value="vehicle">Vehicle Breakdown</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
