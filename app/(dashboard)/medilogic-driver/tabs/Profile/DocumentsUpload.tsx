'use client';

import { UploadCloud, FileUp, X } from 'lucide-react';
import { useState } from 'react';
import useFeatureAccess from '../../hooks/useFeatureAccess';
import FeatureLock from '../../FeatureLock';
import { Label } from '@/components/ui/label';

type Props = {
  uploadDocuments: (files: File[]) => Promise<void>;
};

export default function DocumentsUploadSection({ uploadDocuments }: Props) {
  const { canUploadDocs } = useFeatureAccess();

  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);

    setFiles((prev) => {
      const unique = newFiles.filter(
        (file) =>
          !prev.some((f) => f.name === file.name && f.size === file.size)
      );

      return [...prev, ...unique];
    });
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (!files.length) return;

    setUploading(true);
    await uploadDocuments(files);
    setUploading(false);
    setFiles([]);
  };

  const formatFileSize = (size: number) => {
    const kb = size / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  return (
    <FeatureLock locked={!canUploadDocs}>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-5">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <UploadCloud className="h-5 w-5" />
          Upload Verification Documents
        </h3>

        <div className="text-sm text-gray-400">
          Please upload any of the following documents:
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Driver License</li>
            <li>Proof of Address</li>
            <li>Professional ID Photo</li>
          </ul>
        </div>

        <div>
          <Label className="text-gray-300 text-sm mb-2">Select Documents</Label>

          <div className="relative border-2 border-dashed border-gray-600 rounded-lg p-6 text-center bg-gray-700/50 hover:bg-gray-700 transition">
            <input
              type="file"
              multiple
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
            />

            <div className="pointer-events-none">
              <FileUp className="h-8 w-8 text-gray-400 mx-auto mb-2" />

              {files.length > 0 ? (
                <div className="space-y-2">
                  {files.map((file, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-gray-800 px-3 py-2 rounded"
                    >
                      <div className="text-left">
                        <p className="text-sm text-white">{file.name}</p>
                        <p className="text-xs text-gray-400">
                          {formatFileSize(file.size)}
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          removeFile(i);
                        }}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-300">
                    Click or drag to upload files
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PDF, JPG, PNG, DOC up to 10MB each
                  </p>
                </>
              )}
            </div>
          </div>

          {files.length > 0 && (
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setFiles([])}
                className="px-3 py-1 text-sm border border-gray-600 rounded text-gray-300 hover:bg-gray-700"
              >
                Clear Files
              </button>

              <button
                onClick={handleUpload}
                disabled={uploading}
                className="px-4 py-2 bg-[#15941f] text-white rounded-lg"
              >
                {uploading ? 'Uploading...' : 'Upload Documents'}
              </button>
            </div>
          )}
        </div>
      </div>
    </FeatureLock>
  );
}

// 'use client';

// import { UploadCloud } from 'lucide-react';
// import { useState } from 'react';
// import useFeatureAccess from '../../hooks/useFeatureAccess';
// import FeatureLock from '../../FeatureLock';

// type Props = {
//   uploadDocuments: (files: File[]) => Promise<void>;
// };

// export default function DocumentsUploadSection({ uploadDocuments }: Props) {
//   const { canUploadDocs } = useFeatureAccess();
//   const [files, setFiles] = useState<File[]>([]);
//   const [uploading, setUploading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     setFiles(Array.from(e.target.files));
//   };

//   const handleUpload = async () => {
//     if (!files.length) return;

//     setUploading(true);
//     await uploadDocuments(files);
//     setUploading(false);
//     setFiles([]);
//   };

//   return (
//     <FeatureLock locked={!canUploadDocs}>
//       <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
//         <h3 className="text-white font-semibold flex items-center gap-2">
//           <UploadCloud className="h-5 w-5" />
//           Upload Verification Documents
//         </h3>

//         <input
//           type="file"
//           multiple
//           onChange={handleChange}
//           className="text-sm text-gray-300"
//         />

//         {files.length > 0 && (
//           <button
//             onClick={handleUpload}
//             disabled={uploading}
//             className="px-4 py-2 bg-[#15941f] text-white rounded-lg"
//           >
//             {uploading ? 'Uploading...' : 'Upload Documents'}
//           </button>
//         )}
//       </div>
//     </FeatureLock>
//   );
// }
