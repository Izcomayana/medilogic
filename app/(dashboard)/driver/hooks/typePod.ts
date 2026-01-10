/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PodFile {
  s3_key?: any;
  id?: string;
  name?: string;
  size?: string;
  url?: string;
  type?: string;
}

export interface Pod {
  id: string;
  shortId?: string;
  tripId: string;
  deliveredTo: string;
  notes: string;
  driverId: string;
  createdAt: string;
  signature: string | null;
  files: PodFile[];
  type?: string;
  tripName?: string;
  driverName?: string;
}
