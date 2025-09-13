'use client';

import { Button } from '@/components/ui/button';

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  usersPerPage: number;
  totalUsers: number;
  setCurrentPage: (page: number) => void;
};

export default function PaginationControls({
  currentPage,
  totalPages,
  startIndex,
  usersPerPage,
  totalUsers,
  setCurrentPage,
}: PaginationControlsProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-700">
      <div className="text-sm text-gray-400">
        Showing {startIndex + 1}–
        {Math.min(startIndex + usersPerPage, totalUsers)} of {totalUsers} users
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
