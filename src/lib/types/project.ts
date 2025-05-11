import { Client } from "./client";
import { Company } from "./company";

export interface Project {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  status:
    | "NEW"
    | "CANCELED"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "ON_HOLD"
    | "ARCHIVED";
  company?: Company;
  companyId: string;
  projectNo: number;
  client?: Client;
  clientId: string;
  description?: string | null | undefined;
  startDate?: Date | null | undefined;
  endDate?: Date | null | undefined;
}
