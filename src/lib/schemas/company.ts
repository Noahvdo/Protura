import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const companySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  invoiceEmail: z.string().email(),
  phone: z.string().refine((value) => parsePhoneNumberFromString(value, "NL"), {
    message: "Invalid phone number",
  }),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string(),
  companyNo: z.string(),
  status: z.enum(["active", "inactive", "new"]),
});
