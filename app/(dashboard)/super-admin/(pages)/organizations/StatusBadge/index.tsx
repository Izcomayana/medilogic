export function StatusBadge({ status }: { status?: string }) {
  if (!status)
    return (
      <span className="border px-2 py-1 rounded text-xs text-gray-400">
        Unknown
      </span>
    );

  const colorMap: Record<string, string> = {
    active: "bg-[#15941f] text-white",
    pending: "bg-yellow-500 text-white",
    inactive: "bg-red-600 text-white",
  };

  return (
    <span
      className={`${colorMap[status.toLowerCase()] || "border"} px-2 py-1 rounded text-xs`}
    >
      {status}
    </span>
  );
}
