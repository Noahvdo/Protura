"use client";

import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import parsePhoneNumberFromString from "libphonenumber-js";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormGenerateButton,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { generateCompanyNo } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { companySchema } from "@/lib/schemas/company";
import { createCompany } from "@/lib/actions/company/create";
import { useActionState } from "react";

interface CreateCompanyFormProps
  extends React.HTMLAttributes<HTMLFormElement> {}

const CreateCompanyForm: React.FC<
  CreateCompanyFormProps
> = ({}: CreateCompanyFormProps) => {
  const form = useForm<z.infer<typeof companySchema>>({
    context: companySchema,
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      email: "",
      invoiceEmail: "",
      phone: "",
      address: "",
      city: "",
      country: "",
      companyNo: "",
      status: "new",
    },
  });

  const [state, formAction, isPending] = useActionState(createCompany, null);

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-6 gap-2 gap-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="idkMan"
                    placeholder="Mickey Mouse Company Ltd."
                  />
                </FormControl>
                <FormDescription>The name of the company.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>General Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="idkMan"
                    placeholder="info@wheres-waldo.com"
                  />
                </FormControl>
                <FormDescription>
                  The general email of the company.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Company phone number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="idkMan"
                    placeholder="+31 6 12342069"
                  />
                </FormControl>
                <FormDescription>
                  The general phone number of the company.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    autoComplete="idkMan"
                    onValueChange={(value: "active" | "new" | "inactive") =>
                      form.setValue("status", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>The company status.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="invoiceEmail"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Invoice Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="idkMan"
                    placeholder="billing@the-grinch.com"
                    className="col-span-2"
                  />
                </FormControl>
                <FormDescription>
                  The email to send invoices to.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyNo"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormLabel>Company No</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-4 gap-2">
                    <Input
                      {...field}
                      autoComplete="idkMan"
                      placeholder="N2004O19A04H"
                      className="col-span-3"
                    />
                    <FormGenerateButton
                      variant="outline"
                      fn={generateCompanyNo}
                      className="col-span-1"
                    >
                      Generate
                    </FormGenerateButton>
                  </div>
                </FormControl>
                <FormDescription>
                  The company identifier. <br /> Used for invoices and
                  administrative stuff.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="idkMan"
                    placeholder="The Moonstreet, 29"
                  />
                </FormControl>
                <FormDescription>The company name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="idkMan"
                    placeholder="The golden city"
                  />
                </FormControl>
                <FormDescription>
                  The city where the company is in.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="idkMan"
                    placeholder="The Netherlands"
                  />
                </FormControl>
                <FormDescription>
                  The country the company is in.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          Create company
        </Button>
      </form>
    </Form>
  );
};

CreateCompanyForm.displayName = "CreateCompanyForm";

export default CreateCompanyForm;
