import { Company } from "@/lib/types/company";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Project } from "@/lib/types/project";

export default async function Page() {
  const companies: Project[] = await fetch(
    "http://localhost:8080/projects",
    {}
  ).then((res) => res.json());
  return (
    <div>
      <DataTable columns={columns} data={companies} />
    </div>
  );
}
