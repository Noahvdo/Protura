"use client";

import * as React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchInput } from "@/components/ui/search-input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { Plus } from "lucide-react";
import Container from "@/components/ui/container";
import Link from "next/link";
import { Company } from "@/lib/types/company";
import { useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable({ columns, data }: DataTableProps<Company, Company>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [search, setSearch] = React.useState({
    value: "",
    column: "name",
  });

  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getRowId: (originalRow) => originalRow.id,
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      <Container className="flex gap-4 py-4 items-center justify-between">
        <div className="flex items-center gap-1">
          <Tabs
            defaultValue="name"
            onValueChange={(value) => {
              setSearch((search) => {
                table.getColumn(search.column)?.setFilterValue("");
                table.getColumn(value)?.setFilterValue(search.value);
                return {
                  value: search.value,
                  column: value,
                };
              });
            }}
          >
            <TabsList>
              <TabsTrigger value="name">Name</TabsTrigger>
              <TabsTrigger value="companyNo">Company No</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="max-w-sm">
            <SearchInput
              placeholder="Search"
              value={(search.value as string) ?? ""}
              onChange={(event) => {
                setSearch((search) => ({
                  value: event.target.value,
                  column: search.column,
                }));
                table
                  .getColumn(search.column)
                  ?.setFilterValue(event.target.value);
              }}
              className="max-w-sm"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label>Status:</Label>
            <ToggleGroup
              type="multiple"
              className="flex justify-start"
              defaultValue={["active", "new", "inactive"]}
              onValueChange={(value) => {
                table
                  .getColumn("status")
                  ?.setFilterValue(value.length === 3 ? null : value);
              }}
            >
              <ToggleGroupItem
                value="active"
                className="px-2 py-1 text-xs h-8 font-semibold capitalize data-[state=on]:bg-green-100 data-[state=on]:text-green-800 "
              >
                Active
              </ToggleGroupItem>
              <ToggleGroupItem
                value="new"
                className="px-2 py-1 text-xs h-8 font-semibold capitalize data-[state=on]:bg-blue-100 data-[state=on]:text-blue-800"
              >
                New
              </ToggleGroupItem>
              <ToggleGroupItem
                value="inactive"
                className="px-2 py-1 text-xs h-8 font-semibold capitalize data-[state=on]:bg-red-100 data-[state=on]:text-red-800"
              >
                Inactive
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="flex items-center gap-2">
            <Label>Created (between):</Label>
            <DatePickerWithRange
              onDateChange={(date) =>
                table.getColumn("createdAt")?.setFilterValue(date)
              }
            ></DatePickerWithRange>
          </div>

          <Button asChild>
            <Link href="/companies/new">
              <Plus /> Create company
            </Link>
          </Button>
        </div>
      </Container>
      <div className="border-t border-b">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer hover:bg-muted" // make it obvious it’s clickable
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => router.push(`/companies/${row.id}`)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2 py-2 px-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <span className="text-sm">
          Page {table.getState().pagination.pageIndex + 1} /{" "}
          {table.getPageCount()}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
