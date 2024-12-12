"use client";
import { useSidebar } from "../ui/sidebar";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export const SidebarText = ({ children }: { children: React.ReactNode }) => {
  const { open } = useSidebar();

  return (
    <span className={cn(`origin-left`, open ? "scale-100" : "scale-0")}>
      {children}
    </span>
  );
};

export const SidebarTooltip = ({
  children,
  tooltipText,
}: {
  children: React.ReactNode;
  tooltipText: string;
}) => {
  const { open } = useSidebar();

  return (
    <>
      {open ? (
        children
      ) : (
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger>{children}</TooltipTrigger>
            <TooltipContent side="right" className="bg-sidebar" sideOffset={15}>
              <p className="font-medium text-sidebar-foreground">
                {tooltipText}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
};
