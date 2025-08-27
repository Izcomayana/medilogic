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
  // User,
  Building2,
  Settings,
  Download,
} from 'lucide-react';
import { useOrganizations } from '@/hooks/useOrg';
import { DateRangeFilter, useActivityLogs } from '@/hooks/useActivity';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type FiltersProps = ReturnType<typeof useActivityLogs>;

export function Filters({
  exportLogsCSV,
  filteredLogs,
  exportLogsPDF,
  exportingpdf,
  exportingcsv,
  searchTerm,
  setSearchTerm,
  dateRange,
  setDateRange,
  orgFilter,
  setOrgFilter,
  actionFilter,
  setActionFilter,
}: FiltersProps) {
  const { orgs } = useOrganizations();

  const handleDateRangeChange = (value: string) => {
    if (['all', 'today', 'week', 'month', 'year'].includes(value)) {
      setDateRange(value as DateRangeFilter);
    }
  };

  const handleExport = async (type: 'csv' | 'pdf') => {
    if (type === 'csv') {
      try {
        await exportLogsCSV();
        toast.success(`CSV export completed for ${filteredLogs.length} logs`);
      } catch {
        toast.error('Failed to export CSV');
      }
    } else if (type === 'pdf') {
      try {
        await exportLogsPDF();
        toast.success(`PDF export completed for ${filteredLogs.length} logs`);
      } catch {
        toast.error('Failed to export PDF');
      }
    } else {
      toast.info('PDF export not implemented yet');
    }
  };

  return (
    <Card className="dashboard-card mb-6 py-3">
      <CardHeader className="px-3 flex flex-col md:flex-row justify-between">
        <CardTitle className="text-white flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters & Controls
        </CardTitle>

        <div className="flex gap-2">
          <Button
            onClick={() => handleExport('csv')}
            disabled={exportingcsv}
            variant="outline"
            className="border-gray-100 text-xs p-1 text-gray-700 hover:text-gray-300 hover:bg-gray-700"
          >
            <Download className="h-3 w-3 mr-1" />
            {exportingcsv ? 'Exporting...' : 'Export CSV'}
          </Button>

          <Button
            onClick={() => handleExport('pdf')}
            disabled={exportingpdf}
            className="primary-button text-xs"
          >
            <Download className="h-3 w-3 mr-1" />
            {exportingpdf ? 'Exporting...' : 'Export PDF'}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="px-3">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {/* Search Bar */}
          <div className="xl:col-span-2">
            <Label className="text-gray-300 text-sm">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search logs with user, actions or details..."
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
            <Select value={dateRange} onValueChange={handleDateRangeChange}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* User Role Filter
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
                <SelectItem value="super-admin">Super Admin</SelectItem>
                <SelectItem value="admin">Org Admin</SelectItem>
                <SelectItem value="regulator">Regulator</SelectItem>
                <SelectItem value="client">Client</SelectItem>
                <SelectItem value="driver">Driver</SelectItem>
              </SelectContent>
            </Select>
          </div> */}

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
                <SelectItem value="create_organization">Create</SelectItem>
                <SelectItem value="regenerate_invite_code">
                  Invite Codes
                </SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="delete_user_permanently">Delete</SelectItem>
                <SelectItem value="login">Login</SelectItem>
                <SelectItem value="activate_user">Activate User</SelectItem>
                <SelectItem value="activate_organization">
                  Activate Org
                </SelectItem>
                <SelectItem value="deactivate_user">Deactivate User</SelectItem>
                <SelectItem value="deactivate_organization">
                  Deactivate Org
                </SelectItem>
                <SelectItem value="reject">Reject</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}