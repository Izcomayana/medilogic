export interface PodFile {
  name?: string;
  size?: string;
  url?: string;
  type?: string;
}

export interface Pod {
  id: string;
  tripId: string;
  deliveredTo: string;
  notes: string;
  driverId: string;
  createdAt: string;
  signature: string | null;
  files: PodFile[];
}

// export interface Pod {
//   id: string;
//   tripId: string;
//   deliveredTo: string;
//   notes: string;
//   driverId: string;
//   createdAt: string;
//   signature: string | null;
//   files: any[]; // or more specific if your backend defines a structure
// }
