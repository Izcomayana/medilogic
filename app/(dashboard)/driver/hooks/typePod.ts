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
  tripId: string;
  deliveredTo: string;
  notes: string;
  driverId: string;
  createdAt: string;
  signature: string | null;
  files: PodFile[];
  type?: string;
}
