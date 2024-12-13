"use client";

import { Company } from "@/lib/types/company";
import { cn, sameDay } from "@/lib/utils";
import type { ColumnDef, Row } from "@tanstack/react-table";
import parsePhoneNumber from "libphonenumber-js";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
import { DateRange } from "react-day-picker";

const exactMatchFilterFn = (
  row: Row<Company>,
  columnId: string,
  filterValue: any
) => {
  const cellValue = row.getValue(columnId) as string;

  // If no filterValue is provided, show all rows
  if (!filterValue) {
    return true;
  }

  filterValue = filterValue as string[];
  // Return true only if the cell value matches the filter exactly
  return filterValue.some((value: string) => value === cellValue);
};

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.getValue<string>("name");
      return <span className="ml-4">{name}</span>;
    },
  },
  {
    accessorKey: "companyNo",
    header: "Company #",
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: exactMatchFilterFn,
    cell: ({ row }) => {
      const status = row.getValue<string>("status");
      return (
        <span
          className={cn(
            `px-2 py-1 text-xs font-semibold rounded-full capitalize`,
            status === "active"
              ? "bg-green-100 text-green-800"
              : status === "inactive"
              ? "bg-red-100 text-red-800"
              : "bg-blue-100 text-blue-800"
          )}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone number",
    cell: ({ row }) => {
      const rawPhoneNumber = row.getValue<string>("phone");
      const phoneNumber = parsePhoneNumber(rawPhoneNumber, "NL");
      const phone = phoneNumber?.formatNational();
      return (
        <a href={`tel:${phoneNumber?.number}`}>
          <span className="text-blue-400">{phone}</span>
          {phoneNumber?.country !== "NL" && " (International)"}
        </a>
      );
    },
  },
  {
    accessorKey: "invoiceEmail",
    header: "Invoice Email",

    cell: ({ row }) => {
      const email = row.getValue<string>("invoiceEmail");
      return (
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                variant="link"
                className="px-0"
                onClick={() => {
                  navigator.clipboard.writeText(email);
                }}
              >
                {email}
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="bg-card-foreground"
              forceMount
            >
              <p className="font-medium text-card">Click to copy</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created on",
    cell: ({ row }) => {
      const date = new Date(row.getValue<string>("createdAt"));
      return date.toLocaleDateString("nl-NL", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },
    filterFn: (row, columnId, filterValue) => {
      const cellValue = row.getValue(columnId) as string;
      const { from, to } = filterValue as DateRange;
      const date = new Date(cellValue);

      if (!filterValue || (!from && !to)) {
        return true;
      }
      if (!from && to) {
        return sameDay(date, to);
      }
      if (from && !to) {
        return sameDay(date, from);
      }

      if (from && to) {
        if (sameDay(from, to)) {
          return (
            date.getFullYear() == from.getFullYear() &&
            date.getMonth() == from.getMonth() &&
            date.getDate() == from.getDate()
          );
        } else {
          return date >= from && date <= to;
        }
      } else {
        return true;
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const company = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(company.companyNo)}
            >
              Copy company #
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View company</DropdownMenuItem>
            <DropdownMenuItem>View manager</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
