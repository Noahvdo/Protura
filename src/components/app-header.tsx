import { Bell, CircleHelp } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";
import { SearchInput } from "./ui/search-input";

export default function AppHeader() {
  return (
    <div className="flex gap-2 items-center px-4 border-b border-muted-background w-full">
      <SidebarTrigger />
      <div className="flex justify-between w-full">
        <div className="flex flex-col pr-2">
          <span className="text-xs">Welcome back,</span>
          <span className="text-sm font-bold text-nowrap">
            Noah van den Oudenhoven
          </span>
        </div>
        <div className="w-1/2">
          <SearchInput placeholder="Quick search..."></SearchInput>
        </div>
        <div className="flex items-center gap-4">
          <CircleHelp className="w-4 h-4" />
          <Bell className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
