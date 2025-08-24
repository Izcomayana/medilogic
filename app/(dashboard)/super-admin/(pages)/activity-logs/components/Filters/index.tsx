import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Search,
  Calendar,
  Filter,
  User,
  Building2,
  Settings,
} from 'lucide-react';
import { useActivityLogs } from '@/hooks/useActivity';
import { useOrganizations } from '@/hooks/useOrg';

type FiltersProps = {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  roleFilter: string;
  setRoleFilter: (val: string) => void;
  dateRange: string;
  setDateRange: (val: string) => void;
  orgFilter: string;
  setOrgFilter: (val: string) => void;
  actionFilter: string;
  setActionFilter: (val: string) => void;
};

export function Filters({
  searchTerm,
  setSearchTerm,
  roleFilter,
  setRoleFilter,
  dateRange,
  setDateRange,
  orgFilter,
  setOrgFilter,
  actionFilter,
  setActionFilter,
}: FiltersProps) {
  const { orgs } = useOrganizations();

  return (
    <Card className="dashboard-card mb-6">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters & Controls
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {/* Search Bar */}
          <div className="xl:col-span-2">
            <Label className="text-gray-300 text-sm">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Date Range */}
          <div>
            <Label className="text-gray-300 text-sm flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Date Range
            </Label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* User Role Filter */}
          <div>
            <Label className="text-gray-300 text-sm flex items-center gap-1">
              <User className="h-3 w-3" />
              User Role
            </Label>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="super admin">Super Admin</SelectItem>
                <SelectItem value="org admin">Org Admin</SelectItem>
                <SelectItem value="regulator">Regulator</SelectItem>
                <SelectItem value="client">Client</SelectItem>
                <SelectItem value="driver">Driver</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Organization Filter */}
          <div>
            <Label className="text-gray-300 text-sm flex items-center gap-1">
              <Building2 className="h-3 w-3" />
              Organization
            </Label>
            <Select value={orgFilter} onValueChange={setOrgFilter}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {orgs.map((org) => (
                  <SelectItem key={org.id} value={org.name}>
                    {org.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Action Type Filter */}
          <div>
            <Label className="text-gray-300 text-sm flex items-center gap-1">
              <Settings className="h-3 w-3" />
              Action Type
            </Label>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="create">Create</SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
                <SelectItem value="login">Login</SelectItem>
                <SelectItem value="assign">Assign</SelectItem>
                <SelectItem value="approve">Approve</SelectItem>
                <SelectItem value="reject">Reject</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
