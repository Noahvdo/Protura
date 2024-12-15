"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

export function DatePicker() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            date.toLocaleDateString("nl-NL", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export function DatePickerWithRange({
  onDateChange,
  className,
}: React.HTMLAttributes<HTMLDivElement> & {
  onDateChange?: (date: DateRange | undefined) => void;
}) {
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  const handleSelect = (selected: DateRange | undefined) => {
    setDate(selected);
    onDateChange?.(selected);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
            disabled={{ after: new Date() }}
          />
          <div className="flex items-center gap-2 px-4 pb-4">
            <ToggleGroup type="single">
              <ToggleGroupItem value="this-year">This year</ToggleGroupItem>
              <ToggleGroupItem value="last-6-months">
                Last 6 months
              </ToggleGroupItem>
              <ToggleGroupItem value="last-month">Last month</ToggleGroupItem>
              <ToggleGroupItem value="last-week">Last week</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
