"use server";

import { companySchema } from "@/lib/schemas/company";
import { getOrganizationId } from "@/lib/server/organization";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createCompany = async (currentState: any, formData: unknown) => {
  if (formData instanceof FormData) {
    const organizationId = await getOrganizationId();

    const companyBody = {
      name: formData.get("name"),
      email: formData.get("email"),
      invoiceEmail: formData.get("invoiceEmail"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      city: formData.get("city"),
      country: formData.get("country"),
      companyNo: formData.get("companyNo"),
      status: formData.get("status"),
    };

    try {
      companySchema.parse(companyBody);
    } catch (error) {
      throw new Error("formdata is invalid");
    }

    const { status, ...rest } = companyBody;

    const response = await fetch(`http://localhost:8080/companies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        organizationId: organizationId,
        status: status?.toString().toUpperCase(),
        ...rest,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
      revalidatePath("/companies");
      redirect(`/companies`);
    } else {
      return { error: "Failed to create company" };
    }
  }
};
