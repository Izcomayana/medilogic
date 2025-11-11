import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCompliance } from '@/hooks/useCompliance';
import { FileText, Plus, Search, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type ComplianceFiltersProps = ReturnType<typeof useCompliance>;

export function ComplianceFilters({
  filteredRecords,
  setIsCreateModalOpen,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}: ComplianceFiltersProps) {
  return (
    <Card className="dashboard-card mb-6">
      <CardHeader>
        <div className="flex flex-col justify-between md:flex-row md:items-center">
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Organization Compliance Records ({filteredRecords.length})
          </CardTitle>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-[#15941f] hover:bg-[#0d7314] text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Compliance Record
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by organization or record ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600 text-white">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="compliant">Compliant</SelectItem>
              <SelectItem value="review required">Review Required</SelectItem>
              <SelectItem value="non-compliant">Non-Compliant</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
