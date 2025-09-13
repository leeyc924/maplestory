// components/ui/date-picker.tsx
"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import dayjs from "@/lib/dayjs";
import { cn } from "@/lib/utils";

export function DatePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [date, setDate] = React.useState<Date | undefined>(
    value ? new Date(value) : undefined,
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? dayjs(date).format("YYYY-MM-DD") : "날짜 선택"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            setDate(d ?? undefined);
            if (d) onChange(dayjs(d).format("YYYY-MM-DD"));
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
