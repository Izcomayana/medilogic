"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Mail, Calendar, Eye } from "lucide-react";
import { ActiveUser } from "../page";
import { getRoleBadge, getStatusBadge, formatDate } from "./helpers/userUtil";

type ActiveUsersTableProps = {
  users: ActiveUser[];
  onViewDetails: (user: ActiveUser) => void;
};

export default function ActiveUsersTable({ users, onViewDetails }: ActiveUsersTableProps) {
  return (
    <div className="rounded-md border border-gray-700">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-700 hover:bg-gray-800">
            <TableHead className="text-gray-300">User ID</TableHead>
            <TableHead className="text-gray-300">Name</TableHead>
            <TableHead className="text-gray-300">Email</TableHead>
            <TableHead className="text-gray-300">Role</TableHead>
            <TableHead className="text-gray-300">Status</TableHead>
            <TableHead className="text-gray-300">Date Joined</TableHead>
            <TableHead className="text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="border-gray-700 hover:bg-gray-800">
              <TableCell className="font-medium text-white">{user.id}</TableCell>
              <TableCell className="text-gray-300">{user.name}</TableCell>
              <TableCell className="text-gray-300 flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {user.email}
              </TableCell>
              <TableCell>{getRoleBadge(user.role)}</TableCell>
              <TableCell>{getStatusBadge(user.status)}</TableCell>
              <TableCell className="text-gray-300 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(user.dateJoined)}
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewDetails(user)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
