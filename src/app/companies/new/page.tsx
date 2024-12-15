import CreateCompanyForm from "@/components/forms/company/create-company";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Page() {
  return (
    <div className="lg:w-2/3 mx-auto min-w-[400px] w-full">
      <Container className="flex flex-col gap-6 lg:w-2/3 w-full mx-auto">
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
