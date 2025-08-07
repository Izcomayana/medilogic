"use client";

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

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  RotateCcw,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import { ViewOrganizationDialog, EditOrganizationDialog } from "../OrgDialogs";

interface Props {
  organizations: Organization[];
  onRegenerate: (name: string) => void;
  onView: (org: Organization) => void;
  onEdit: (org: Organization) => void;
  onDeactivate: (name: string) => void;
  viewOpen: boolean;
  editOpen: boolean;
  selectedOrg: Organization | null;
  editFormData: Organization;
  closeView: () => void;
  closeEdit: () => void;
  onEditChange: (data: Partial<Organization>) => void;
  onEditSave: () => void;
}

const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return (
        <span className="bg-[#15941f] text-white px-2 py-1 rounded text-xs">
          Active
        </span>
      );
    case "pending":
      return (
        <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs">
          Pending
        </span>
      );
    case "inactive":
      return (
        <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">
          Inactive
        </span>
      );
    default:
      return <span className="border px-2 py-1 rounded text-xs">{status}</span>;
  }
};

export default function OrganizationTable({
  organizations,
  onRegenerate,
  onView,
  onEdit,
  onDeactivate,
  viewOpen,
  editOpen,
  selectedOrg,
  editFormData,
  closeView,
  closeEdit,
  onEditChange,
  onEditSave,
}: Props) {
  return (
    <div className="rounded-md border border-gray-700">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-700 hover:bg-gray-800">
            <TableHead className="text-gray-300">Name</TableHead>
            <TableHead className="text-gray-300">Type</TableHead>
            <TableHead className="text-gray-300">Status</TableHead>
            <TableHead className="text-gray-300">Users</TableHead>
            <TableHead className="text-gray-300">Created Date</TableHead>
            <TableHead className="text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {organizations.map((org) => (
            <TableRow
              key={org.id}
              className="border-gray-700 hover:bg-gray-800"
            >
              <TableCell className="font-medium text-white">
                {org.name}
              </TableCell>
              <TableCell className="text-gray-300">{org.type}</TableCell>
              <TableCell>{getStatusBadge(org.status)}</TableCell>
              <TableCell className="text-gray-300">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {org.userCount}
                </div>
              </TableCell>
              <TableCell className="text-gray-300">{org.createdDate}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRegenerate(org.name)}
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
                        onClick={() => onView(org)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-gray-300 hover:bg-gray-600 cursor-pointer"
                        onClick={() => onEdit(org)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-400 hover:bg-gray-600 cursor-pointer"
                        onClick={() => onDeactivate(org.name)}
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

      <ViewOrganizationDialog
        open={viewOpen}
        onClose={closeView}
        org={selectedOrg}
        badgeRenderer={getStatusBadge}
      />

      <EditOrganizationDialog
        open={editOpen}
        onClose={closeEdit}
        formData={editFormData}
        onChange={onEditChange}
        onSave={onEditSave}
      />
    </div>
  );
}
