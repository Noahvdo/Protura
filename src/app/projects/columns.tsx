"use client";
import { cn, sameDay } from "@/lib/utils";
import type { ColumnDef, Row } from "@tanstack/react-table";

import { ArrowUpDown, Delete, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { DateRange } from "react-day-picker";
import { deleteCompany } from "@/lib/actions/company/delete";
import { Project } from "@/lib/types/project";

const exactMatchFilterFn = (
  row: Row<Project>,
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

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "projectNo",
    header: () => {
      return <span className="ml-2">Project #</span>;
    },
    cell: ({ row }) => {
      return <span className="ml-2">{row.getValue("projectNo")}</span>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.getValue<string>("name");
      return <span className="ml-4">{name}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: exactMatchFilterFn,
    cell: ({ row }) => {
      const status = row.getValue<string>("status").toLowerCase();
      return (
        <span
          className={cn(
            `px-2 py-1 text-xs font-semibold rounded-full capitalize`,
            status === "in_progress" && "bg-yellow-100 text-yellow-800",
            status === "completed" && "bg-green-100 text-green-800",
            status === "on_hold" && "bg-red-100 text-red-800",
            status === "canceled" && "bg-red-100 text-red-800",
            status === "new" && "bg-blue-100 text-blue-800",
            status === "archived" && "bg-gray-100 text-gray-800"
          )}
        >
          {status.replace("_", " ")}
        </span>
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
    header: "Actions",
    size: 100,
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
              onClick={() =>
                navigator.clipboard.writeText(company.projectNo.toString())
              }
            >
              Copy project #
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View project</DropdownMenuItem>
            <DropdownMenuItem>View tasks</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="focus:bg-destructive focus:text-destructive-foreground"
              onClick={() => deleteCompany(company.id)}
            >
              <Delete className="rotate-180" /> Delete project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
