import { Organization } from "@/lib/types/organization";
import { cookies } from "next/headers";
import "server-only";

export const getOrganizationId = async (): Promise<string> => {
  //   const organization = (await cookies()).get("organization");

  //   if (!organization) {
  //     throw new Error("Organization not found");
  //   }

  //   return (organization as unknown as Organization).id;
  return "ebc18f05-571d-46ad-abf6-dbd4daedd293";
};
