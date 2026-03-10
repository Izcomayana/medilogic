import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMedilogicDrivers } from '../../useDrivers';

type MedilogicDriversProps = ReturnType<typeof useMedilogicDrivers>;

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

      <Select
        value={filters.country}
        onValueChange={(value) =>
          setFilters((prev) => ({ ...prev, country: value }))
        }
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Nigeria">Nigeria</SelectItem>
          <SelectItem value="UK">UK</SelectItem>
        </SelectContent>
      </Select>

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
