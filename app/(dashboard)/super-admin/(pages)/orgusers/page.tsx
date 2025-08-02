"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, Search, Building2 } from "lucide-react";
import { useState } from "react";

const orgUsers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@techcorp.com",
    role: "Admin",
    organization: "TechCorp Solutions",
    status: "Active",
    lastLogin: "2024-01-15",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@techcorp.com",
    role: "User",
    organization: "TechCorp Solutions",
    status: "Active",
    lastLogin: "2024-01-14",
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol@financeinc.com",
    role: "Manager",
    organization: "FinanceInc",
    status: "Inactive",
    lastLogin: "2024-01-10",
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david@healthcare.com",
    role: "User",
    organization: "HealthCare Plus",
    status: "Active",
    lastLogin: "2024-01-16",
  },
];

const organizations = [
  "All Organizations",
  "TechCorp Solutions",
  "FinanceInc",
  "HealthCare Plus",
  "EduTech Academy",
];

export default function OrgUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrg, setSelectedOrg] = useState("All Organizations");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredUsers = orgUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOrg =
      selectedOrg === "All Organizations" || user.organization === selectedOrg;
    const matchesStatus =
      statusFilter === "all" ||
      user.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesOrg && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Badge className="bg-[#15941f] text-white">Active</Badge>;
      case "inactive":
        return <Badge variant="destructive">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return (
          <Badge variant="secondary" className="bg-blue-600 text-white">
            Admin
          </Badge>
        );
      case "manager":
        return (
          <Badge variant="secondary" className="bg-purple-600 text-white">
            Manager
          </Badge>
        );
      case "user":
        return (
          <Badge variant="outline" className="border-gray-600 text-gray-300">
            User
          </Badge>
        );
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <header className="flex h-16 items-center gap-4 border-b border-gray-700 bg-gray-900 px-6">
        <SidebarTrigger className="text-white hover:bg-gray-800" />
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-white">
            Organization Users
          </h1>
          <p className="text-sm text-gray-400">
            View and manage users across all organizations
          </p>
        </div>
      </header>

      <main className="flex-1 p-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5" />
              Organization Users ({filteredUsers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <Select value={selectedOrg} onValueChange={setSelectedOrg}>
                <SelectTrigger className="w-[200px] bg-gray-700 border-gray-600 text-white">
                  <Building2 className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {organizations.map((org) => (
                    <SelectItem key={org} value={org}>
                      {org}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px] bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border border-gray-700">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700 hover:bg-gray-800">
                    <TableHead className="text-gray-300">Name</TableHead>
                    <TableHead className="text-gray-300">Email</TableHead>
                    <TableHead className="text-gray-300">
                      Organization
                    </TableHead>
                    <TableHead className="text-gray-300">Role</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Last Login</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      className="border-gray-700 hover:bg-gray-800"
                    >
                      <TableCell className="font-medium text-white">
                        {user.name}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {user.email}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {user.organization}
                      </TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell className="text-gray-300">
                        {user.lastLogin}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
