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

export const ExportActivityLogsDialog: React.FC<Props> = ({ onExport }) => {
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="text-gray-700 border-gray-600">
            Export Logs
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleExportClick('csv')}>
            <Download className="h-4 w-4 mr-2" />
            CSV
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => handleExportClick('pdf')}>
            <Download className="h-4 w-4 mr-2" />
            PDF
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="bg-[#162235] border-[#2c3a52]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-blue-400">
              Select Export Date Range
            </AlertDialogTitle>
          </AlertDialogHeader>

          <div className="py-4">
            <DateRangeFilter value={range} onChange={setRange} />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={handleConfirm}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Export {format.toUpperCase()}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
