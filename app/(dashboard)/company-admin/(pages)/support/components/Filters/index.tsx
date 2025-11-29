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

type SupportFiltersProps = ReturnType<typeof useSupport>;

export function SupportFilters({
  sortedTickets,
  setShowCreateModal,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  userTypeFilter,
  setUserTypeFilter,
  priorityFilter,
  setPriorityFilter,
  sortBy,
  setSortBy,
}: SupportFiltersProps) {
  return (
    <Card className="dashboard-card mb-6">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <CardTitle className="text-white flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters ({sortedTickets.length})
          </CardTitle>

          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white mt-3 lg:mt-3"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Ticket
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by ticket ID or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <Label className="text-gray-300 mb-2 block text-sm">Status</Label>
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

            {/* <div>
              <Label className="text-gray-300 mb-2 block text-sm">
                User Type
              </Label>
              <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="Driver">Driver</SelectItem>
                  <SelectItem value="Client">Client</SelectItem>
                  <SelectItem value="Company Admin">Company Admin</SelectItem>
                </SelectContent>
              </Select>
            </div> */}

            {/* <div>
              <Label className="text-gray-300 mb-2 block text-sm">
                Priority
              </Label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div> */}

            {/* <div>
              <Label className="text-gray-300 mb-2 block text-sm">
                Sort By
              </Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="priority">Highest Priority</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
