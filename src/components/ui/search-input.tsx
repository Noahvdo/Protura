"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

const SearchInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div
      className={cn(
        "flex gap-2 items-center h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        isFocused && "outline-none ring-1 ring-ring"
      )}
    >
      <Search
        className={cn(
          "w-4 h-4 text-muted-foreground",
          isFocused ? "text-foreground" : "text-muted-foreground"
        )}
      />
      <input
        type={type}
        className={cn(
          "flex h-full w-full bg-transparent text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        ref={ref}
        {...props}
      />
    </div>
  );
});
SearchInput.displayName = "SearchInput";

export { SearchInput };
