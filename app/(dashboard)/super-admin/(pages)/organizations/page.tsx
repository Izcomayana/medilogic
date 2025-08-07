"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, Plus, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { organizations } from "./org";
import OrganizationTable from "./components/OrgTable";

export interface Organization {
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
  const [editFormData, setEditFormData] = useState<Organization>({
    id: 0,
    name: "",
    type: "",
    status: "",
    createdDate: "",
    userCount: 0,
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

  const handleViewOrg = (org: Organization) => {
    setSelectedOrg(org);
    setIsViewDialogOpen(true);
  };

  const handleEditOrg = (org: Organization) => {
    setSelectedOrg(org);
    setEditFormData(org);
    setIsEditDialogOpen(true);
  };

  const handleEditChange = (changes: Partial<Organization>) => {
    setEditFormData((prev) => ({ ...prev, ...changes }));
  };

  const handleSaveEdit = () => {
    if (!selectedOrg || !editFormData) return;
    toast.success(`${editFormData.name} has been updated successfully`);
    setIsEditDialogOpen(false);
    setSelectedOrg(null);
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
              <OrganizationTable
                organizations={filteredOrganizations}
                onRegenerate={handleRegenerateCode}
                onView={handleViewOrg}
                onEdit={handleEditOrg}
                onDeactivate={handleDeactivate}
                viewOpen={isViewDialogOpen}
                editOpen={isEditDialogOpen}
                selectedOrg={selectedOrg}
                editFormData={editFormData}
                closeView={() => setIsViewDialogOpen(false)}
                closeEdit={() => setIsEditDialogOpen(false)}
                onEditChange={handleEditChange}
                onEditSave={handleSaveEdit}
              />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
