export interface Admin {
  id: string;
  name: string;
  email: string;
  password?: string;
  role?: 'admin';
  status: 'active' | 'inactive';
  isVerified?: boolean;
  orgId?: string;
  orgName?: string;
  joined?: string;
}
