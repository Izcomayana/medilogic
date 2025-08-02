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
import { RotateCcw, Search, Copy, Calendar } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const inviteCodes = [
  {
    id: 1,
    organization: "TechCorp Solutions",
    code: "TECH-2024-ABC123",
    status: "Active",
    createdDate: "2024-01-15",
    expiryDate: "2024-07-15",
    usedCount: 12,
    maxUses: 50,
  },
  {
    id: 2,
    organization: "FinanceInc",
    code: "FIN-2024-XYZ789",
    status: "Active",
    createdDate: "2024-02-01",
    expiryDate: "2024-08-01",
    usedCount: 8,
    maxUses: 25,
  },
  {
    id: 3,
    organization: "HealthCare Plus",
    code: "HEALTH-2024-DEF456",
    status: "Expired",
    createdDate: "2023-12-01",
    expiryDate: "2024-01-01",
    usedCount: 15,
    maxUses: 30,
  },
  {
    id: 4,
    organization: "EduTech Academy",
    code: "EDU-2024-GHI789",
    status: "Inactive",
    createdDate: "2024-01-20",
    expiryDate: "2024-07-20",
    usedCount: 0,
    maxUses: 20,
  },
];

export default function InviteCodes() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCodes = inviteCodes.filter(
    (code) =>
      code.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleRegenerateCode = (orgName: string) => {
    toast.success(`New invite code generated for ${orgName}`);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Invite code copied to clipboard");
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Badge className="bg-[#15941f] text-white">Active</Badge>;
      case "expired":
        return <Badge variant="destructive">Expired</Badge>;
      case "inactive":
        return (
          <Badge variant="secondary" className="bg-gray-600 text-white">
            Inactive
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getUsageProgress = (used: number, max: number) => {
    const percentage = (used / max) * 100;
    return (
      <div className="flex items-center gap-2">
        <div className="w-20 bg-gray-700 rounded-full h-2">
          <div
            className="bg-[#15941f] h-2 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="text-sm text-gray-300">
          {used}/{max}
        </span>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <header className="flex h-16 items-center gap-4 border-b border-gray-700 bg-gray-900 px-6">
        <SidebarTrigger className="text-white hover:bg-gray-800" />
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-white">
            Invite Code Management
          </h1>
          <p className="text-sm text-gray-400">
            Manage and regenerate organization invite codes
          </p>
        </div>
      </header>

      <main className="flex-1 p-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <RotateCcw className="h-5 w-5" />
              Invite Codes ({filteredCodes.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by organization or code..."
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
                    <TableHead className="text-gray-300">
                      Organization
                    </TableHead>
                    <TableHead className="text-gray-300">Invite Code</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Usage</TableHead>
                    <TableHead className="text-gray-300">Created</TableHead>
                    <TableHead className="text-gray-300">Expires</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCodes.map((code) => (
                    <TableRow
                      key={code.id}
                      className="border-gray-700 hover:bg-gray-800"
                    >
                      <TableCell className="font-medium text-white">
                        {code.organization}
                      </TableCell>
                      <TableCell className="text-gray-300 font-mono">
                        <div className="flex items-center gap-2">
                          <span>{code.code}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyCode(code.code)}
                            className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(code.status)}</TableCell>
                      <TableCell>
                        {getUsageProgress(code.usedCount, code.maxUses)}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {code.createdDate}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {code.expiryDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleRegenerateCode(code.organization)
                          }
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          <RotateCcw className="h-3 w-3 mr-1" />
                          Regenerate
                        </Button>
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
