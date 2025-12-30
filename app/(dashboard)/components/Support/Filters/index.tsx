import { Filter, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSupport } from '@/hooks/useSupport';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/components/auth';

type SupportFiltersProps = ReturnType<typeof useSupport>;

export function SupportFilters({
  filteredTickets,
  setShowCreateModal,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}: SupportFiltersProps) {
  const { role } = useAuth();

  const placeholder =
    role === 'super_admin'
      ? 'Search by user name or organization ID...'
      : 'Search by user name...';

  return (
    <Card className="dashboard-card mb-6">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <CardTitle className="text-white flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters ({filteredTickets.length})
          </CardTitle>

          {role !== 'super_admin' && (
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white mt-3 lg:mt-3"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Ticket
            </Button>
          )}
        </div>
      </CardHeader>

      {(role === 'super_admin' || role === 'admin') && (
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <Label className="text-gray-300 mb-2 block text-sm">
                  Status
                </Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
