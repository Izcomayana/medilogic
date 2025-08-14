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
  Shield,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Calendar,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";

const regulators = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@regulator.gov",
    regCountry: "USA",
    regState: "Los Angeles",
    region: "North America",
    status: "Active",
    joinedDate: "2024-01-10",
    phone: "+1 (555) 123-4567",
    department: "Financial Oversight",
    title: "Senior Regulatory Officer",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@regulator.gov",
    region: "Europe",
    regCountry: "Spain",
    regState: "Barcelona",
    status: "Active",
    joinedDate: "2024-02-15",
    phone: "+44 20 7946 0958",
    department: "Compliance Monitoring",
    title: "Lead Compliance Analyst",
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael.chen@regulator.gov",
    region: "London",
    regCountry: "England",
    regState: "London",
    status: "Inactive",
    joinedDate: "2024-01-20",
    phone: "+65 6123 4567",
    department: "Risk Assessment",
    title: "Risk Assessment Specialist",
  },
];

interface Regulator {
  joinedDate: string;
  id: number;
  name: string;
  status: string;
  regCountry: string;
  regState: string;
  regRegion: string;
  createdDate: string;
  userCount: number;
  email: string;
  phone: string;
}

export default function Regulators() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRegulator, setSelectedRegulator] = useState<Regulator | null>(
    null,
  );
  const [editFormData, setEditFormData] = useState<{
    name: string;
    email: string;
    region: string;
    regCountry: string;
    regState: string;
    phone: string;
    department: string;
    title: string;
    status: string;
  }>({
    name: "",
    email: "",
    region: "",
    regCountry: "",
    regState: "",
    phone: "",
    department: "",
    title: "",
    status: "",
  });

  const filteredRegulators = regulators.filter(
    (regulator) =>
      regulator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      regulator.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      regulator.region.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleEditRegulator = (regulator: any) => {
    setSelectedRegulator(regulator);
    setEditFormData({
      name: regulator.name,
      email: regulator.email,
      region: regulator.region,
      regCountry: regulator.regCountry,
      regState: regulator.regState,
      phone: regulator.phone,
      department: regulator.department,
      title: regulator.title,
      status: regulator.status,
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!selectedRegulator) return;
    toast.success(`${selectedRegulator.name} has been updated successfully`);
    setIsEditDialogOpen(false);
    setSelectedRegulator(null);
  };

  const handleDisable = (regulatorName: string) => {
    toast.success(`${regulatorName} has been disabled`);
  };

  const getStatusBadge = (status: any) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Badge className="bg-[#15941f] text-white">Active</Badge>;
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
            Regulator Management
          </h1>
          <p className="text-sm text-gray-400">
            Manage regulatory oversight personnel
          </p>
        </div>
      </header>

      <main className="flex-1 p-6">
        <Card className="dashboard-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Regulators ({filteredRegulators.length})
              </CardTitle>
              <Dialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="primary-button cursor-pointer">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Regulator
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 border-gray-700 text-white">
                  <DialogHeader>
                    <DialogTitle>Create New Regulator</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Add a new regulator to the system.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Full name"
                        className="col-span-3 bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@regulator.gov"
                        className="col-span-3 bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="region" className="text-right">
                        Region
                      </Label>
                      <Input
                        id="region"
                        placeholder="e.g., North America"
                        className="col-span-3 bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      className="primary-button"
                      onClick={() => {
                        toast.success("Regulator created successfully");
                        setIsCreateDialogOpen(false);
                      }}
                    >
                      Create Regulator
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
                  placeholder="Search regulators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
            </div>
            <div className="rounded-md border border-gray-700">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700 hover:bg-gray-800">
                    <TableHead className="text-gray-300">Name</TableHead>
                    <TableHead className="text-gray-300">Email</TableHead>
                    <TableHead className="text-gray-300">Region</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Joined Date</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRegulators.map((regulator) => (
                    <TableRow
                      key={regulator.id}
                      className="border-gray-700 hover:bg-gray-800"
                    >
                      <TableCell className="font-medium text-white">
                        {regulator.name}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {regulator.email}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {regulator.region}
                      </TableCell>
                      <TableCell>{getStatusBadge(regulator.status)}</TableCell>
                      <TableCell className="text-gray-300">
                        {regulator.joinedDate}
                      </TableCell>
                      <TableCell>
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
                              onClick={() => handleEditRegulator(regulator)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-400 hover:bg-gray-600 cursor-pointer"
                              onClick={() => handleDisable(regulator.name)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Disable
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Edit Regulator Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit Regulator
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Update the regulator information below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Full Name</Label>
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
                <Label htmlFor="edit-title">Job Title</Label>
                <Input
                  id="edit-title"
                  value={editFormData.title}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, title: e.target.value })
                  }
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-region">Region</Label>
                <Select
                  value={editFormData.region}
                  onValueChange={(value) =>
                    setEditFormData({ ...editFormData, region: value })
                  }
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="North America">North America</SelectItem>
                    <SelectItem value="Europe">Europe</SelectItem>
                    <SelectItem value="Asia Pacific">Asia Pacific</SelectItem>
                    <SelectItem value="Latin America">Latin America</SelectItem>
                    <SelectItem value="Middle East & Africa">
                      Middle East & Africa
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-department">Department</Label>
                <Select
                  value={editFormData.department}
                  onValueChange={(value) =>
                    setEditFormData({ ...editFormData, department: value })
                  }
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="Financial Oversight">
                      Financial Oversight
                    </SelectItem>
                    <SelectItem value="Compliance Monitoring">
                      Compliance Monitoring
                    </SelectItem>
                    <SelectItem value="Risk Assessment">
                      Risk Assessment
                    </SelectItem>
                    <SelectItem value="Legal Affairs">Legal Affairs</SelectItem>
                    <SelectItem value="Policy Development">
                      Policy Development
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={editFormData.status}
                onValueChange={(value) =>
                  setEditFormData({ ...editFormData, status: value })
                }
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedRegulator && (
              <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                <h4 className="text-sm font-medium text-gray-300 mb-2">
                  Additional Information
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>Joined: {selectedRegulator.joinedDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Shield className="h-4 w-4" />
                    <span>ID: #{selectedRegulator.id}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="border-gray-600 text-gray-900 hover:bg-gray-700"
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
