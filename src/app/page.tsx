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
          className="w-1/3 grid mt-1 border border-accent rounded-md grid-cols-3 shadow divide-x divide-accent max-w-[750px]"
        >
          <QuantityCard
            title="Projects"
            quantity={3}
            CardIcon={PanelsTopLeft}
            delta={-2}
          />
          <QuantityCard
            title="Tasks"
            quantity={3}
            CardIcon={ListTodo}
            delta={3}
          />
          <QuantityCard title="Invoices" quantity={3} CardIcon={Files} />
        </div>
      </div>
    </div>
  );
}

const QuantityCard = ({
  title,
  quantity,
  delta,
  CardIcon,
}: {
  title: string;
  quantity: number;
  delta?: number;
  CardIcon?: JSXElementConstructor<HTMLAttributes<HTMLOrSVGElement>>;
}) => {
  return (
    <div className="px-4 py-4 flex items-start justify-between max-w-80 w-full">
      <div className="items-start flex flex-col justify-between">
        <Label>{title}</Label>
        <p className="text-3xl mt-2">{quantity}</p>
        {delta && (
          <p className="text-xs text-muted-foreground">
            {delta > 0 ? `+${delta}` : delta} since yesterday
          </p>
        )}
      </div>
      {CardIcon && <CardIcon className="h-5 w-5 text-muted-foreground" />}
    </div>
  );
};
