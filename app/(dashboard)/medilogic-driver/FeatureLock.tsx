import { Lock } from 'lucide-react';

export default function FeatureLock({
  locked,
  children,
}: {
  locked: boolean;
  children: React.ReactNode;
}) {
  if (!locked) return <>{children}</>;

  return (
    <div className="relative">
      <div className="opacity-40 pointer-events-none">{children}</div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black/40 backdrop-blur px-4 py-2 rounded-lg flex items-center gap-2 text-sm text-white">
          <Lock className="h-4 w-4" />
          Premium Feature
        </div>
      </div>
    </div>
  );
}
