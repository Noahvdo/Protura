import { Label } from "@/components/ui/label";
import { Files, ListTodo, PanelsTopLeft } from "lucide-react";
import React, { HTMLAttributes, JSXElementConstructor } from "react";

export default function Home() {
  return (
    <div>
      <div>
        <Label htmlFor="dueCards" className="ml-1">
          Due this week
        </Label>
        <div
          id="dueCards"
          className="w-1/3 grid mt-1 border border-accent rounded-md grid-cols-3 shadow"
        >
          <QuantityCard
            title="Projects"
            quantity={3}
            CardIcon={PanelsTopLeft}
          />
          <QuantityCard title="Tasks" quantity={3} CardIcon={ListTodo} />
          <QuantityCard title="Invoices" quantity={3} CardIcon={Files} />
        </div>
      </div>
    </div>
  );
}

const QuantityCard = ({
  title,
  quantity,
  CardIcon,
}: {
  title: string;
  quantity: number;
  CardIcon?: JSXElementConstructor<HTMLAttributes<HTMLOrSVGElement>>;
}) => {
  return (
    <div className="px-4 py-4 border-r border-accent flex items-start justify-between">
      <div className="items-start flex flex-col justify-between">
        <Label>{title}</Label>
        <p className="text-3xl mt-2">{quantity}</p>
        <p className="text-xs text-muted-foreground">+3 from yesterday</p>
      </div>
      {CardIcon && <CardIcon className="h-5 w-5 text-muted-foreground" />}
    </div>
  );
};
