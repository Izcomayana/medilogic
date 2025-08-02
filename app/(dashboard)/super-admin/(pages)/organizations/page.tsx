/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  RotateCcw,
  Users,
  Calendar,
  Hash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";

const organizations = [
  {
    id: 1,
    name: "TechCorp Solutions",
    type: "Technology",
    status: "Active",
    createdDate: "2024-01-15",
    userCount: 45,
    description:
      "Leading technology solutions provider specializing in cloud infrastructure and AI development.",
    address: "123 Tech Street, Silicon Valley, CA 94000",
    phone: "+1 (555) 123-4567",
    email: "contact@techcorp.com",
  },
  {
    id: 2,
    name: "FinanceInc",
    type: "Financial Services",
    status: "Active",
    createdDate: "2024-02-20",
    userCount: 32,
    description:
      "Comprehensive financial services including investment management and consulting.",
    address: "456 Finance Ave, New York, NY 10001",
    phone: "+1 (555) 987-6543",
    email: "info@financeinc.com",
  },
  {
    id: 3,
    name: "HealthCare Plus",
    type: "Healthcare",
    status: "Pending",
    createdDate: "2024-03-10",
    userCount: 18,
    description:
      "Modern healthcare solutions with focus on patient care and medical technology.",
    address: "789 Medical Center Dr, Boston, MA 02101",
    phone: "+1 (555) 456-7890",
    email: "support@healthcareplus.com",
  },
  {
    id: 4,
    name: "EduTech Academy",
    type: "Education",
    status: "Inactive",
    createdDate: "2024-01-05",
    userCount: 0,
    description:
      "Educational technology platform for online learning and skill development.",
    address: "321 Education Blvd, Austin, TX 73301",
    phone: "+1 (555) 321-0987",
    email: "hello@edutechacademy.com",
  },
];

interface Organization {
  id: number;
  name: string;
  type: string;
  status: string;
  createdDate: string;
  userCount: number;
  description: string;
  address: string;
  phone: string;
  email: string;
}

export default function Organizations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [editFormData, setEditFormData] = useState<{
    name: string;
    type: string;
    description: string;
    address: string;
    phone: string;
    email: string;
  }>({
    name: "",
    type: "",
    description: "",
    address: "",
    phone: "",
    email: "",
  });

  const filteredOrganizations = organizations.filter((org) => {
    const matchesSearch =
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      org.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleRegenerateCode = (orgName: string) => {
    toast.success(`Invite code regenerated for ${orgName}`);
  };

  const handleDeactivate = (orgName: string) => {
    toast.success(`${orgName} has been deactivated`);
  };

  const handleViewOrg = (org: any) => {
    setSelectedOrg(org);
    setIsViewDialogOpen(true);
  };

  const handleEditOrg = (org: any) => {
    setSelectedOrg(org);
    setEditFormData({
      name: org.name,
      type: org.type,
      description: org.description,
      address: org.address,
      phone: org.phone,
      email: org.email,
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!selectedOrg) return;
    toast.success(`${selectedOrg.name} has been updated successfully`);
    setIsEditDialogOpen(false);
    setSelectedOrg(null);
  };

  const getStatusBadge = (status: any) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Badge className="bg-[#15941f] text-white">Active</Badge>;
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-500 text-white">
            Pending
          </Badge>
        );
      case "inactive":
        return <Badge variant="destructive">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <header className="flex h-16 items-center gap-4 border-b border-gray-700 bg-gray-900 px-6">
        <SidebarTrigger className="text-white hover:bg-gray-800" />
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-white">
            Organization Management
          </h1>
          <p className="text-sm text-gray-400">
            Manage all organizations and their settings
          </p>
        </div>
      </header>

      <main className="flex-1 p-6">
        <Card className="dashboard-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Organizations ({filteredOrganizations.length})
              </CardTitle>
              <Dialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="primary-button cursor-pointer">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Organization
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 border-gray-700 text-white">
                  <DialogHeader>
                    <DialogTitle>Create New Organization</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Add a new organization to the system.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Organization name"
                        className="col-span-3 bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="type" className="text-right">
                        Type
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3 bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="finance">
                            Financial Services
                          </SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      className="primary-button"
                      onClick={() => {
                        toast.success("Organization created successfully");
                        setIsCreateDialogOpen(false);
                      }}
                    >
                      Create Organization
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search organizations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-600 border-gray-500">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="rounded-md border border-gray-700">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700 hover:bg-gray-800">
                    <TableHead className="text-gray-300">Name</TableHead>
                    <TableHead className="text-gray-300">Type</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Users</TableHead>
                    <TableHead className="text-gray-300">
                      Created Date
                    </TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrganizations.map((org) => (
                    <TableRow
                      key={org.id}
                      className="border-gray-700 hover:bg-gray-800"
                    >
                      <TableCell className="font-medium text-white">
                        {org.name}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {org.type}
                      </TableCell>
                      <TableCell>{getStatusBadge(org.status)}</TableCell>
                      <TableCell className="text-gray-300">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {org.userCount}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {org.createdDate}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRegenerateCode(org.name)}
                            className="cursor-pointer border-gray-600 text-gray-600 hover:bg-gray-700"
                          >
                            <RotateCcw className="h-3 w-3" />
                            Regenerate
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 text-gray-400 hover:bg-gray-700"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="bg-gray-700 border-gray-600"
                            >
                              <DropdownMenuItem
                                className="text-gray-300 hover:bg-gray-600 cursor-pointer"
                                onClick={() => handleViewOrg(org)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-gray-300 hover:bg-gray-600 cursor-pointer"
                                onClick={() => handleEditOrg(org)}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-400 hover:bg-gray-600 cursor-pointer"
                                onClick={() => handleDeactivate(org.name)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Deactivate
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* View Organization Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Organization Details
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              View detailed information about this organization.
            </DialogDescription>
          </DialogHeader>
          {selectedOrg && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-300">
                    Organization Name
                  </Label>
                  <p className="text-white font-medium">{selectedOrg.name}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-300">
                    Type
                  </Label>
                  <p className="text-white">{selectedOrg.type}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-300">
                    Status
                  </Label>
                  <div>{getStatusBadge(selectedOrg.status)}</div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-300">
                    User Count
                  </Label>
                  <div className="flex items-center gap-2 text-white">
                    <Users className="h-4 w-4" />
                    {selectedOrg.userCount}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-300">
                    Created Date
                  </Label>
                  <div className="flex items-center gap-2 text-white">
                    <Calendar className="h-4 w-4" />
                    {selectedOrg.createdDate}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-300">
                  Description
                </Label>
                <p className="text-white text-sm leading-relaxed">
                  {selectedOrg.description}
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-300">
                  Address
                </Label>
                <p className="text-white text-sm">{selectedOrg.address}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-300">
                    Phone
                  </Label>
                  <p className="text-white">{selectedOrg.phone}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-300">
                    Email
                  </Label>
                  <p className="text-white">{selectedOrg.email}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-300">
                  Organization ID
                </Label>
                <div className="flex items-center gap-2 text-white">
                  <Hash className="h-4 w-4" />
                  {selectedOrg.id}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsViewDialogOpen(false)}
              className="border-gray-600 text-gray-800 hover:bg-gray-700"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Organization Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit Organization
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Update the organization information below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Organization Name</Label>
                <Input
                  id="edit-name"
                  value={editFormData.name}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, name: e.target.value })
                  }
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-type">Type</Label>
                <Select
                  value={editFormData.type}
                  onValueChange={(value) =>
                    setEditFormData({ ...editFormData, type: value })
                  }
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Financial Services">
                      Financial Services
                    </SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Input
                id="edit-description"
                value={editFormData.description}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    description: e.target.value,
                  })
                }
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-address">Address</Label>
              <Input
                id="edit-address"
                value={editFormData.address}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, address: e.target.value })
                }
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  value={editFormData.phone}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, phone: e.target.value })
                  }
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editFormData.email}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, email: e.target.value })
                  }
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="border-gray-600 text-gray-800 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} className="primary-button">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
