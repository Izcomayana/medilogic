export interface Regulators {
  id: string;
  name: string;
  email?: string;
  role?: 'regulator';
  phone?: string;
  address?: string;
  orgName?: string;
  license_number?: number;
  license_expiry?: string;
  status: 'active' | 'inactive';
  regCountry: string;
  regState?: string;
  regRegion: string;
  regWasteTypes?: string[];
  regGoodsTypes?: string[];
  regLogScope?: string[];
}
