import { Company } from "@/lib/types/company";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const company: Company = await fetch(
    `http://localhost:8080/companies/${id}`,
    {}
  ).then((res) => res.json());

  return (
    <div>
      <h2>Company: {company.name}</h2>
    </div>
  );
}
