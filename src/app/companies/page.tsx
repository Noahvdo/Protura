import { Company } from "@/lib/types/company";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function Page() {
  const companies: Company[] = await fetch(
    "http://localhost:8080/companies",
    {}
  ).then((res) => res.json());

  return (
    <div className="py-10">
      <DataTable columns={columns} data={companies} />
    </div>
  );
}
