import { Input } from '@/components/ui/input';
import { Filter, Search, Users } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useIncidentsBase } from '@/hooks/incidents/base';
import { useAuth } from '@/components/auth';

type IncidentFiltersProps = ReturnType<typeof useIncidentsBase>;

export function IncidentFilters({
  searchTerm,
  setSearchTerm,
  severityFilter,
  setSeverityFilter,
  scope,
  setScope,
}: IncidentFiltersProps) {
  const { role } = useAuth();

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative md:w-[85%]">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search by incident title, description or type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-2 md:gap-4">
        <div>
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select severity" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="all">All Severity</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {role === 'admin' && (
          <div>
            <Select
              value={scope}
              onValueChange={(value) =>
                setScope(value as 'all' | 'mine' | 'org')
              }
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <Users className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Scope" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all">All Incidents</SelectItem>
                <SelectItem value="mine">My Incidents</SelectItem>
                <SelectItem value="org">Organization Incidents</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
    </div>
  );
}
