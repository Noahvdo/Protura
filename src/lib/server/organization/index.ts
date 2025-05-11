import { Organization } from "@/lib/types/organization";
import { cookies } from "next/headers";
import "server-only";

export const getOrganizationId = async (): Promise<string> => {
  //   const organization = (await cookies()).get("organization");

  //   if (!organization) {
  //     throw new Error("Organization not found");
  //   }

  //   return (organization as unknown as Organization).id;
  return "551c6bbf-3c93-49f3-9db0-7b69603b29fb";
};
