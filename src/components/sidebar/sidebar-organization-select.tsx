"use client";
import { ChevronsUpDown } from "lucide-react";
import { alterStringLength, cn } from "@/lib/utils";
import { useSidebar } from "../ui/sidebar";

export default function SidebarOrganizationSelect() {
  const { open } = useSidebar();

  return (
    <div
      className={cn(
        "w-full flex items-center text-left py-2 gap-2 rounded-md transition-all",
        open && "hover:bg-[hsl(var(--sidebar-accent))] px-2",
        !open && "hover:bg-[hsl(var(--sidebar-accent))] justify-center"
      )}
    >
      <div
        className={cn(
          "transition-all origin-left w-full items-start justify-between flex flex-col text-nowrap",
          open && "scale-100",
          !open && "scale-0 hidden"
        )}
      >
        <span className="text-sm font-bold text-left">Protura</span>
        <span className="text-xs dark:text-gray-300 text-left">
          {alterStringLength("Crazy shit company dude", 23)}
        </span>
      </div>
      <ChevronsUpDown className={cn("h-4 w-4 shrink-0")} />
    </div>
  );
}
