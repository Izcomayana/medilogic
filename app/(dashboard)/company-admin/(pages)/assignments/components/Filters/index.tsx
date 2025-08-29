/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';

interface FiltersProps {
  searchTerm: string;
  setSearchTerm: any;
  statusFilter: string;
  setStatusFilter: any;
  dateFilter: string;
  setDateFilter: any;
}

export function Filters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
}: FiltersProps) {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search by driver, trip, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
        />
      </div>
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-[150px] bg-gray-700 border-gray-600 text-white">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="bg-gray-700 border-gray-600">
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="in progress">In Progress</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
        </SelectContent>
      </Select>
      <Select value={dateFilter} onValueChange={setDateFilter}>
        <SelectTrigger className="w-[150px] bg-gray-700 border-gray-600 text-white">
          <SelectValue placeholder="Date" />
        </SelectTrigger>
        <SelectContent className="bg-gray-700 border-gray-600">
          <SelectItem value="all">All Dates</SelectItem>
          <SelectItem value="2024-01-20">Today</SelectItem>
          <SelectItem value="2024-01-19">Yesterday</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
