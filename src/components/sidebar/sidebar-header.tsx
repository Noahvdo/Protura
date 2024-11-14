"use client";

import { cn } from "@/lib/utils";
import { Combobox } from "../ui/combobox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarMenu, SidebarMenuItem, useSidebar } from "../ui/sidebar";
import SidebarOrganizationSelect from "./sidebar-organization-select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function SidebarHeaderContent({
  organizations,
}: {
  organizations: { label: string; value: string }[];
}) {
  const { open } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div
          className={cn(
            "w-full flex items-center text-left py-2 gap-2 rounded-md transition-all",
            open && "px-2"
          )}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="/logo.svg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div
            className={cn(
              "transition-all origin-left w-full flex items-center justify-between",
              open && "scale-100",
              !open && "scale-0"
            )}
          >
            <h1
              className={cn(
                "text-lg font-bold origin-left",
                open && "scale-100",
                !open && "scale-0 hidden"
              )}
            >
              Protura
            </h1>
          </div>
        </div>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full">
            <SidebarOrganizationSelect />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" className="w-56 mt-16">
            <Combobox organizations={organizations}></Combobox>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
