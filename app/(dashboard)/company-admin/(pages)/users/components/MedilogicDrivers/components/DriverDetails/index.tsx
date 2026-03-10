import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { useMedilogicDrivers } from '../../useDrivers';
import { User } from 'lucide-react';

type MedilogicDriversProps = ReturnType<typeof useMedilogicDrivers>;

export default function DriverDetails({
  driverModalOpen,
  setDriverModalOpen,
  selectedDriver,
}: MedilogicDriversProps) {
  return (
    <AlertDialog open={driverModalOpen} onOpenChange={setDriverModalOpen}>
      <AlertDialogContent className="max-w-lg bg-gray-800 border border-slate-700">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-blue-400">
            <User className="h-5 w-5" />
            Driver Details
          </AlertDialogTitle>
        </AlertDialogHeader>

        {selectedDriver && (
          <div className="grid grid-cols-2 gap-y-4 text-sm mt-2">
            <p className="text-gray-400">Name</p>
            <p className="text-gray-200 font-medium">{selectedDriver.name}</p>

            <p className="text-gray-400">Email</p>
            <p className="text-gray-200">{selectedDriver.email}</p>

            <p className="text-gray-400">Phone</p>
            <p className="text-gray-200">
              {selectedDriver.phone_number ?? '-'}
            </p>

            <p className="text-gray-400">Country</p>
            <p className="text-gray-200">{selectedDriver.country ?? '-'}</p>

            <p className="text-gray-400">Vehicle</p>
            <p className="text-gray-200">
              {selectedDriver.vehicle_type ?? '-'}
            </p>

            <p className="text-gray-400">Experience</p>
            <p className="text-gray-200">
              {selectedDriver.experience_years ?? 0} yrs
            </p>

            <p className="text-gray-400">Status</p>

            <span
              className={`px-2 py-1 rounded-md text-xs font-medium w-fit ${
                selectedDriver.status === 'approved'
                  ? 'bg-green-500/20 text-green-400'
                  : selectedDriver.status === 'pending'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-red-500/20 text-red-400'
              }`}
            >
              {selectedDriver.status}
            </span>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <AlertDialogCancel className="border-slate-600 text-gray-800 hover:text-gray-200 hover:bg-slate-800">
            Close
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
