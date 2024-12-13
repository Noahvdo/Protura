import { Client } from "./client";

export type Company = {
  id: string;
  name: string;
  email: string;
  invoiceEmail: string;
  phone: string;
  address: string | null;
  city: string | null;
  country: string;
  companyNo: string;
  status: "active" | "inactive" | "new";
  createdAt: string;
  updatedAt: string;
  clients?: Client[];
};
