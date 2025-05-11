import CreateCompanyForm from "@/components/forms/company/create-company";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Link from "next/link";

export default function Page() {
  return (
    <div className="px-24 w-full max-w-[1100px] mx-auto">
      <Container className="flex flex-col gap-6">
        <div>
          <Button
            variant="link"
            asChild
            className="px-0 text-muted-foreground hover:text-primary"
          >
            <Link href="/companies">{"<"}- Back to companies</Link>
          </Button>
          <h1 className="text-4xl font-bold">New company.</h1>
          <p className="text-muted-foreground">Going hard dude, nice🚀</p>
        </div>
        <CreateCompanyForm />
      </Container>
    </div>
  );
}
