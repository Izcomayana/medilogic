'use client';

import { UploadCloud } from 'lucide-react';
import { useState } from 'react';
import useFeatureAccess from '../../hooks/useFeatureAccess';
import FeatureLock from '../../FeatureLock';

type Props = {
  uploadDocuments: (files: File[]) => Promise<void>;
};

export default function DocumentsUploadSection({ uploadDocuments }: Props) {
  const { canUploadDocs } = useFeatureAccess();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (!files.length) return;

    setUploading(true);
    await uploadDocuments(files);
    setUploading(false);
    setFiles([]);
  };

  return (
    <FeatureLock locked={!canUploadDocs}>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <UploadCloud className="h-5 w-5" />
          Upload Verification Documents
        </h3>

        <input
          type="file"
          multiple
          onChange={handleChange}
          className="text-sm text-gray-300"
        />

        {files.length > 0 && (
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="px-4 py-2 bg-[#15941f] text-white rounded-lg"
          >
            {uploading ? 'Uploading...' : 'Upload Documents'}
          </button>
        )}
      </div>
    </FeatureLock>
  );
}
