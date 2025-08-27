import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePendingApplications } from '@/hooks/usePendingApplications';
import {
  ClipboardList,
  Building2,
  Shield,
  Search,
  Calendar,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type PendingApplicationsProps = ReturnType<typeof usePendingApplications>;

export const getRoleBadge = (role: string) => {
  switch (role) {
    case 'Admin':
      return (
        <Badge variant="secondary" className="bg-blue-600 text-white">
          <Building2 className="h-3 w-3 mr-1" />
          Admin
        </Badge>
      );
    case 'Regulator':
      return (
        <Badge variant="secondary" className="bg-purple-600 text-white">
          <Shield className="h-3 w-3 mr-1" />
          Regulator
        </Badge>
      );
    default:
      return <Badge variant="outline">{role}</Badge>;
  }
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export function Filters({
  sortedApplications,
  activeTab,
  setActiveTab,
  applications,
  orgAdminCount,
  regulatorCount,
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
}: PendingApplicationsProps) {
  return (
    <Card className="dashboard-card mb-6">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <ClipboardList className="h-5 w-5" />
          Applications ({sortedApplications.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Tabs */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex flex-col lg:flex-row bg-gray-800 rounded-lg p-1 gap-3">
            <Button
              variant={activeTab === 'all' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('all')}
              className={
                activeTab === 'all'
                  ? 'primary-button'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }
            >
              📑 All ({applications.length})
            </Button>
            <Button
              variant={activeTab === 'admins' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('admins')}
              className={
                activeTab === 'admins'
                  ? 'primary-button'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }
            >
              🏥 Organization Admins ({orgAdminCount})
            </Button>
            <Button
              variant={activeTab === 'regulators' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('regulators')}
              className={
                activeTab === 'regulators'
                  ? 'primary-button'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }
            >
              🛡 Regulators ({regulatorCount})
            </Button>
          </div>
        </div>

        {/* Search and Sort */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by applicant name, email, or organization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          <Select
            value={sortBy}
            onValueChange={(val) => setSortBy(val as 'newest' | 'oldest')}
          >
            <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600 text-white">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
