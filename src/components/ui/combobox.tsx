"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export function Combobox({
  organizations,
}: {
  organizations: { value: string; label: string }[];
}) {
  const [value, setValue] = React.useState("");
  const [id, setId] = React.useState("");

  React.useEffect(() => {
    if (id) console.log(id);
  }, [id]);

  return (
    <Command>
      <CommandInput placeholder="Search organization..." />
      <CommandList>
        <CommandEmpty>No organization found.</CommandEmpty>
        <CommandGroup>
          {organizations.map((organization) => (
            <CommandItem
              key={organization.value}
              onSelect={(currentValue) => {
                // used for ui state
                setValue(currentValue === value ? "" : currentValue);
                // used to set the organization id cookie
                setId(organization.value);
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === organization.label ? "opacity-100" : "opacity-0"
                )}
              />
              {organization.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
