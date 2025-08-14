export interface Organization {
  id: string;
  name: string;
  type: string;
  status: string;
  createdDate: string;
  userCount: number;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  invite_code?: string;
  ico_registered?: boolean;
  data_retention_years?: number;
}
