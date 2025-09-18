import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Building2,
  Calendar,
  User,
  Mail,
  MapPin,
  FileText,
  KeyRound
} from 'lucide-react';
import { usePendingApplications } from '@/hooks/usePendingApplications';
import {
  formatDate,
  getRoleBadge,
} from '../../../pending-applications/components/Filters';

type DetailsModalProps = ReturnType<typeof usePendingApplications>;

export function DetailsModal({
  isDetailsModalOpen,
  setIsDetailsModalOpen,
  selectedApplication,
}: DetailsModalProps) {
  return (
    <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Application Details
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Review the complete application information before making a
            decision.
          </DialogDescription>
        </DialogHeader>

        {selectedApplication && (
          <div className="space-y-6 py-4">
            {/* Applicant Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                Applicant Information
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <div>
                    <Label className="text-gray-400 text-sm">Name</Label>
                    <p className="text-white font-medium flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {selectedApplication.applicantName}
                    </p>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm">Email</Label>
                    <p className="text-white flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {selectedApplication.email}
                    </p>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm">Password</Label>
                    <p className="text-white flex items-center gap-2 text-xs">
                      <KeyRound className="h-4 w-4" />
                      {selectedApplication.password}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row gap-36">
                  <div>
                    <Label className="text-gray-400 text-sm">Role</Label>
                    <div className="mt-1">
                      {getRoleBadge(selectedApplication.role)}
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm">
                      Submitted Date
                    </Label>
                    <p className="text-white flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formatDate(selectedApplication.submittedDate)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Role-specific Information */}
            {selectedApplication.role === 'Admin' ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                  Organization Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-400 text-sm">
                      Organization Name
                    </Label>
                    <p className="text-white font-medium flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      {selectedApplication.organizationName}
                    </p>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm">
                      Organization Type
                    </Label>
                    <p className="text-white">
                      {selectedApplication.organizationType}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                  Regulatory Jurisdiction
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label className="text-gray-400 text-sm">
                      Regulated Region
                    </Label>
                    <p className="text-white flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {selectedApplication.country} →{' '}
                      {selectedApplication.state} → {selectedApplication.region}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Additional Notes */}
            {selectedApplication.notes && (
              <div className="space-y-2">
                <Label className="text-gray-400 text-sm">
                  Additional Notes
                </Label>
                <div className="bg-gray-700 rounded-lg p-3 border border-gray-600">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {selectedApplication.notes}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={() =>
              selectedApplication && handleReject(selectedApplication.id)
            }
            className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
          >
            <X className="h-4 w-4 mr-2" />
            Reject Application
          </Button>
          <Button
            onClick={() =>
              selectedApplication && handleApprove(selectedApplication.id)
            }
            className="primary-button"
          >
            <Check className="h-4 w-4 mr-2" />
            Approve Application
          </Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
