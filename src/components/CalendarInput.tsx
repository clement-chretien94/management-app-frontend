import { Calendar } from "@/components/ui/calendar";
import { useEffect, useRef, useState } from "react";
import { startOfWeek, endOfWeek } from "date-fns";
import { formatDate, formatWeek } from "@/utils/calendarLayout";

type CalendarInputProps = {
  calendarMode: "daily" | "weekly";
  date: Date;
  onDateChange: (date: Date) => void;
};

export default function CalendarInput({
  calendarMode,
  date,
  onDateChange,
}: Readonly<CalendarInputProps>) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dateText =
    calendarMode === "daily"
      ? formatDate(date)
      : formatWeek(
          startOfWeek(date, { weekStartsOn: 1 }),
          endOfWeek(date, { weekStartsOn: 1 }),
        );

  return (
    <div className="relative" ref={calendarRef}>
      <div
        className="text-sm text-muted-foreground cursor-pointer"
        onClick={() => setIsCalendarOpen((prev) => !prev)}
      >
        {dateText}
      </div>
      {isCalendarOpen && (
        <div className="absolute left-1/2 z-20 mt-2 -translate-x-1/2 rounded-lg border bg-background shadow-md">
          <Calendar
            mode="single"
            required
            selected={date}
            onSelect={(newDate) => {
              onDateChange(newDate);
              setIsCalendarOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
