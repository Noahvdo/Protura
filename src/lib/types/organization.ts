import { Company } from "./company";

export interface Organization {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  financeInfoId: string;
  createdAt: string;
  updatedAt: string;
  companies: Company[];
}
