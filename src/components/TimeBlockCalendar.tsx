import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import CalendarInput from "@/components/CalendarInput";
import { ChevronLeft, ChevronRight, Rows3, Columns3 } from "lucide-react";

type TimeBlockCalendarProps = {
  date: Date;
  onPrev?: () => void;
  onNext?: () => void;
  onDateChange: (date: Date) => void;
  calendarMode: "daily" | "weekly";
  onCalendarModeChange: (mode: "daily" | "weekly") => void;
  children: React.ReactNode;
};

export default function TimeBlockCalendar({
  date,
  onPrev,
  onNext,
  onDateChange,
  calendarMode,
  onCalendarModeChange,
  children,
}: Readonly<TimeBlockCalendarProps>) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-xl">
            {calendarMode === "daily" ? "Daily" : "Weekly"} Schedule
          </CardTitle>
          <div className="mt-1 flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={onPrev}>
              <ChevronLeft />
            </Button>
            <CalendarInput
              calendarMode={calendarMode}
              date={date}
              onDateChange={onDateChange}
            />
            <Button variant="outline" size="icon" onClick={onNext}>
              <ChevronRight />
            </Button>
          </div>
        </div>
        <ToggleGroup
          variant="outline"
          className="mt-4"
          type="single"
          value={calendarMode}
          onValueChange={(value) =>
            onCalendarModeChange(value as "daily" | "weekly")
          }
        >
          <ToggleGroupItem value="daily">
            <Rows3 />
          </ToggleGroupItem>
          <ToggleGroupItem value="weekly">
            <Columns3 />
          </ToggleGroupItem>
        </ToggleGroup>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
