// import { Skeleton } from "@/components/ui/skeleton";

// function ChartWrapper({
//   title,
//   icon,
//   loading,
//   error,
//   children,
// }: {
//   title: string;
//   icon: React.ReactNode;
//   loading: boolean;
//   error: string | null;
//   children: React.ReactNode;
// }) {
//   return (
//     <Card className="dashboard-card">
//       <CardHeader>
//         <CardTitle className="text-white flex items-center gap-2">
//           {icon} {title}
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         {loading ? (
//           <div className="h-80 flex items-center justify-center">
//             <Skeleton className="h-full w-full rounded-lg bg-gray-800" />
//           </div>
//         ) : error ? (
//           <div className="h-80 flex flex-col items-center justify-center text-center text-red-400 border border-red-500/30 rounded-lg bg-red-900/10 p-4">
//             <p className="font-medium">⚠️ Failed to load {title}</p>
//             <p className="text-xs text-red-300 mt-1">{error}</p>
//           </div>
//         ) : (
//           children
//         )}
//       </CardContent>
//     </Card>
//   );
// }
