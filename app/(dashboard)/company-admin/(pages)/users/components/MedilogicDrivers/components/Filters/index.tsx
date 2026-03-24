import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMedilogicDrivers } from '../../useDrivers';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useMemo, useState } from 'react';

type MedilogicDriversProps = ReturnType<typeof useMedilogicDrivers>;

const locations = [
  { country: 'Nigeria', region: 'Lagos' },
  { country: 'Nigeria', region: 'Abuja' },
  { country: 'UK', region: 'London' },
  { country: 'UK', region: 'Manchester' },
];

export default function MedilogicFilters({
  filters,
  setFilters,
}: MedilogicDriversProps) {
  return (
    <div className="flex gap-4 mt-4 ml-4">
      <Select
        value={filters.status}
        onValueChange={(value) =>
          setFilters((prev) => ({ ...prev, status: value }))
        }
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="approved">Approved</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="search"
        placeholder="Search country or region..."
        value={filters.search}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            search: e.target.value,
          }))
        }
        className="max-w-md"
      />

      <Select
        value={filters.min_experience}
        onValueChange={(value) =>
          setFilters((prev) => ({
            ...prev,
            min_experience: value,
          }))
        }
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Experience" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">1+ Years</SelectItem>
          <SelectItem value="3">3+ Years</SelectItem>
          <SelectItem value="5">5+ Years</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
