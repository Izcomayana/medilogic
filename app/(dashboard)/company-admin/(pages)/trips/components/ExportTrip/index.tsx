// // components/ExportTripsDialog.tsx

'use client';

import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import DateRangeFilter, {
  DateRangeLocal,
} from '@/app/(dashboard)/components/DateRange';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

type Props = {
  onExport: (format: 'csv' | 'pdf', range?: DateRangeLocal) => void;
};

export const ExportTripsDialog: React.FC<Props> = ({ onExport }) => {
  const [open, setOpen] = useState(false);
  const [format, setFormat] = useState<'csv' | 'pdf'>('csv');
  const [range, setRange] = useState<DateRangeLocal>();

  const handleExportClick = (selectedFormat: 'csv' | 'pdf') => {
    setFormat(selectedFormat);
    setOpen(true);
  };

  const handleConfirm = () => {
    onExport(format, range);
    setOpen(false);
    setRange(undefined);
  };

  return (
    <>
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="text-gray-700" variant="outline">
              Export Trips
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleExportClick('csv')}>
              <Download className="h-4 w-4" />
              CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExportClick('pdf')}>
              <Download className="h-4 w-4" />
              PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="bg-gray-900 border-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-200">
              Select Export Date Range
            </AlertDialogTitle>
          </AlertDialogHeader>

          <div className="py-4">
            <DateRangeFilter value={range} onChange={setRange} />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setRange(undefined);
              }}
            >
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleConfirm}
              className="primary-button"
            >
              Export {format.toUpperCase()}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
