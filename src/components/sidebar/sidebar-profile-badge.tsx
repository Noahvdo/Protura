"use client";
import { ChevronsUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSidebar } from "../ui/sidebar";
import { alterStringLength, cn } from "@/lib/utils";

export default function SidebarProfileBadge() {
  const { open } = useSidebar();

  return (
    <div
      className={cn(
        "w-full flex items-center h-[fit-content] text-left py-2 gap-2 rounded-md transition-all",
        open && "hover:bg-[hsl(var(--sidebar-accent))] px-2"
      )}
    >
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "transition-all origin-left w-full flex items-center justify-between",
          open && "scale-100",
          !open && "scale-0"
        )}
      >
        <div className="flex flex-col">
          <span className="text-sm font-bold">
            {alterStringLength("Noah", 23)}
          </span>
          <span className="text-xs dark:text-gray-300">noahvdo@gmail.com</span>
        </div>
        <ChevronsUpDown className="h-4 w-4 shrink-0" />
      </div>
    </div>
  );
}
