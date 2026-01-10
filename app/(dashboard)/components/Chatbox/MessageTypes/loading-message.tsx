'use client';

export function LoadingMessage() {
  return (
    <div className="flex justify-start gap-3">
      <div className="flex-shrink-0">
        <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-300">
          AI
        </div>
      </div>
      <div className="flex-1">
        <div className="bg-gray-700 text-gray-300 rounded-lg p-2 w-fit">
          <div className="flex items-center gap-2">
            {/* <span className="text-sm">Processing</span> */}
            <span className="flex gap-1">
              <span
                className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDelay: '0ms' }}
              ></span>
              <span
                className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDelay: '150ms' }}
              ></span>
              <span
                className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDelay: '300ms' }}
              ></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
