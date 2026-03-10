import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { useMedilogicDrivers } from '../../useDrivers';
import { Button } from '@/components/ui/button';
import { Download, Eye, FileText } from 'lucide-react';

type MedilogicDriversProps = ReturnType<typeof useMedilogicDrivers>;

export default function DocumentsModal({
  documentsModalOpen,
  setDocumentsModalOpen,
  selectedDriver,
}: MedilogicDriversProps) {
  return (
    <AlertDialog open={documentsModalOpen} onOpenChange={setDocumentsModalOpen}>
      <AlertDialogContent className="max-w-xl bg-gray-800 border border-[#2c3a52]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-blue-400 text-lg">
            Driver Documents
          </AlertDialogTitle>
        </AlertDialogHeader>

        {selectedDriver?.documents?.length === 0 && (
          <div className="text-center text-gray-400 py-6 text-sm">
            This driver has not uploaded any documents yet.
          </div>
        )}

        {selectedDriver?.documents?.length > 0 && (
          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {selectedDriver.documents.map((doc: any) => (
              <div
                key={doc.id}
                className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between bg-[#0f1b2d] border border-[#2c3a52] rounded-lg p-3 hover:border-blue-500 transition"
              >
                {/* FILE INFO */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="bg-blue-500/20 p-2 rounded-md flex-shrink-0">
                    <FileText className="h-4 w-4 text-blue-400" />
                  </div>

                  <p className="text-sm text-gray-200 truncate">
                    {doc.filename}
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap"
                    onClick={() => window.open(doc.file_url, '_blank')}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#2c3a52] text-gray-800 hover:text-gray-200 hover:bg-[#1d2a3d] whitespace-nowrap"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = doc.file_url;
                      link.download = doc.filename;
                      link.click();
                    }}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end pt-4">
          <AlertDialogCancel className="border-[#2c3a52] text-gray-800 hover:text-gray-200 hover:bg-[#1d2a3d]">
            Close
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
