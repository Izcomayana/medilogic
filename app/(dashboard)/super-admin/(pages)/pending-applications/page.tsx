'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  ClipboardList,
  Search,
  Eye,
  Building2,
  Shield,
  Calendar,
  User,
  Mail,
  MapPin,
  FileText,
  Check,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const pendingApplications = [
  {
    id: 'APP001',
    applicantName: 'John Doe',
    email: 'john.doe@clinicabc.com',
    role: 'Org Admin',
    organizationName: 'Clinic ABC',
    organizationType: 'Healthcare Clinic',
    country: null,
    state: null,
    region: null,
    submittedDate: '2025-08-20',
    notes:
      'Looking to manage medical waste disposal for our 50-bed facility. We handle general medical waste and some pharmaceutical waste.',
    status: 'Pending',
  },
  {
    id: 'APP002',
    applicantName: 'Jane Smith',
    email: 'jane.smith@regulator.gov.ng',
    role: 'Regulator',
    organizationName: null,
    organizationType: null,
    country: 'Nigeria',
    state: 'Lagos State',
    region: 'Lagos Metropolitan Area',
    submittedDate: '2025-08-22',
    notes:
      'Experienced environmental regulator with 8 years in waste management oversight. Previously worked with NESREA.',
    status: 'Pending',
  },
  {
    id: 'APP003',
    applicantName: 'Michael Johnson',
    email: 'm.johnson@wastetech.com',
    role: 'Org Admin',
    organizationName: 'WasteTech Solutions',
    organizationType: 'Waste Management Company',
    country: null,
    state: null,
    region: null,
    submittedDate: '2025-08-21',
    notes:
      'Industrial waste management company serving manufacturing sector. Need to track hazardous waste disposal.',
    status: 'Pending',
  },
  {
    id: 'APP004',
    applicantName: 'Sarah Williams',
    email: 'sarah.williams@regulator.gov.ng',
    role: 'Regulator',
    organizationName: null,
    organizationType: null,
    country: 'Nigeria',
    state: 'Kano State',
    region: 'Kano Metropolitan',
    submittedDate: '2025-08-19',
    notes:
      'Regional compliance officer specializing in healthcare waste regulations.',
    status: 'Pending',
  },
  {
    id: 'APP005',
    applicantName: 'David Chen',
    email: 'david.chen@pharmacare.com',
    role: 'Org Admin',
    organizationName: 'PharmaCare Industries',
    organizationType: 'Pharmaceutical Company',
    country: null,
    state: null,
    region: null,
    submittedDate: '2025-08-18',
    notes:
      'Pharmaceutical manufacturing facility requiring compliance tracking for drug waste and chemical disposal.',
    status: 'Pending',
  },
];

export default function PendingApplicationsPage() {
  const [applications, setApplications] = useState(pendingApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedApplication, setSelectedApplication] = useState<
    (typeof pendingApplications)[0] | null
  >(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.organizationName &&
        app.organizationName
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (app.region &&
        app.region.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'org-admins' && app.role === 'Org Admin') ||
      (activeTab === 'regulators' && app.role === 'Regulator');

    return matchesSearch && matchesTab;
  });

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (sortBy === 'newest') {
      return (
        new Date(b.submittedDate).getTime() -
        new Date(a.submittedDate).getTime()
      );
    } else {
      return (
        new Date(a.submittedDate).getTime() -
        new Date(b.submittedDate).getTime()
      );
    }
  });

  const orgAdminCount = applications.filter(
    (app) => app.role === 'Org Admin'
  ).length;
  const regulatorCount = applications.filter(
    (app) => app.role === 'Regulator'
  ).length;

  const handleViewDetails = (application: (typeof pendingApplications)[0]) => {
    setSelectedApplication(application);
    setIsDetailsModalOpen(true);
  };

  const handleApprove = (applicationId: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== applicationId));
    toast.success('Application approved successfully');
    setIsDetailsModalOpen(false);
  };

  const handleReject = (applicationId: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== applicationId));
    toast.success('Application rejected');
    setIsDetailsModalOpen(false);
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Org Admin':
        return (
          <Badge variant="secondary" className="bg-blue-600 text-white">
            <Building2 className="h-3 w-3 mr-1" />
            Org Admin
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <header className="flex h-16 items-center gap-4 border-b border-gray-700 bg-gray-900 px-6">
        <SidebarTrigger className="text-white hover:bg-gray-800" />
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-white">
            Pending Applications
          </h1>
          <p className="text-sm text-gray-400">
            View applications from regulators and organization admins awaiting
            review.
          </p>
        </div>
      </header>

      <main className="flex-1 p-6">
        {/* Filters and Controls */}
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
              <div className="flex bg-gray-800 rounded-lg p-1">
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
                  variant={activeTab === 'org-admins' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('org-admins')}
                  className={
                    activeTab === 'org-admins'
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
              <Select value={sortBy} onValueChange={setSortBy}>
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

        {/* Applications Table */}
        <Card className="dashboard-card">
          <CardContent className="p-0">
            {sortedApplications.length === 0 ? (
              <div className="text-center py-12">
                <ClipboardList className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">
                  📭 No pending applications at the moment
                </h3>
                <p className="text-gray-400">
                  Youll see new regulator and organization admin requests here.
                </p>
              </div>
            ) : (
              <div className="rounded-md border border-gray-700">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700 hover:bg-gray-800">
                      <TableHead className="text-gray-300">Applicant</TableHead>
                      <TableHead className="text-gray-300">Role</TableHead>
                      <TableHead className="text-gray-300">
                        Organization / Region
                      </TableHead>
                      <TableHead className="text-gray-300">
                        Submitted On
                      </TableHead>
                      <TableHead className="text-gray-300">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedApplications.map((application) => (
                      <TableRow
                        key={application.id}
                        className="border-gray-700 hover:bg-gray-800"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <span className="font-medium text-white">
                                {application.applicantName}
                              </span>
                              <span className="text-sm text-gray-400 flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {application.email}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getRoleBadge(application.role)}</TableCell>
                        <TableCell className="text-gray-300">
                          {application.role === 'Org Admin' ? (
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {application.organizationName}
                              </span>
                              <span className="text-sm text-gray-400">
                                {application.organizationType}
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-sm">
                              <MapPin className="h-3 w-3" />
                              <span>
                                {application.country} → {application.state} →{' '}
                                {application.region}
                              </span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {formatDate(application.submittedDate)}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(application)}
                            className="border-gray-600 text-gray-300 hover:bg-gray-700"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Application Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Application Details
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Review the complete application information before making a
              decision.
            </DialogDescription>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-6 py-4">
              {/* Applicant Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                  Applicant Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-400 text-sm">Name</Label>
                    <p className="text-white font-medium flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {selectedApplication.applicantName}
                    </p>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm">Email</Label>
                    <p className="text-white flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {selectedApplication.email}
                    </p>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm">Role</Label>
                    <div className="mt-1">
                      {getRoleBadge(selectedApplication.role)}
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm">
                      Submitted Date
                    </Label>
                    <p className="text-white flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formatDate(selectedApplication.submittedDate)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Role-specific Information */}
              {selectedApplication.role === 'Org Admin' ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                    Organization Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-400 text-sm">
                        Organization Name
                      </Label>
                      <p className="text-white font-medium flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        {selectedApplication.organizationName}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-400 text-sm">
                        Organization Type
                      </Label>
                      <p className="text-white">
                        {selectedApplication.organizationType}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                    Regulatory Jurisdiction
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label className="text-gray-400 text-sm">
                        Regulated Region
                      </Label>
                      <p className="text-white flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {selectedApplication.country} →{' '}
                        {selectedApplication.state} →{' '}
                        {selectedApplication.region}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Notes */}
              {selectedApplication.notes && (
                <div className="space-y-2">
                  <Label className="text-gray-400 text-sm">
                    Additional Notes
                  </Label>
                  <div className="bg-gray-700 rounded-lg p-3 border border-gray-600">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {selectedApplication.notes}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() =>
                selectedApplication && handleReject(selectedApplication.id)
              }
              className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
            >
              <X className="h-4 w-4 mr-2" />
              Reject Application
            </Button>
            <Button
              onClick={() =>
                selectedApplication && handleApprove(selectedApplication.id)
              }
              className="primary-button"
            >
              <Check className="h-4 w-4 mr-2" />
              Approve Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
