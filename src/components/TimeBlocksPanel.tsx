import DailyCalendar from "@/components/DailyCalendar";
import TimeBlockCalendar from "@/components/TimeBlockCalendar";
import WeeklyCalendar from "@/components/WeeklyCalendar";
import type { TimeBlock } from "@/types";
import { useMemo, useState } from "react";
import {
  addDays,
  addWeeks,
  endOfWeek,
  startOfWeek,
  subDays,
  subWeeks,
} from "date-fns";

interface TimeBlocksPanelProps {
  timeBlocks: TimeBlock[];
}

export default function TimeBlocksPanel({ timeBlocks }: TimeBlocksPanelProps) {
  const [calendarMode, setCalendarMode] = useState<"daily" | "weekly">("daily");
  const [activeDate, setActiveDate] = useState(new Date());

  const filteredBlocks = useMemo(() => {
    const dayStart = new Date(activeDate);
    const dayEnd = new Date(activeDate);

    if (calendarMode === "weekly") {
      const weekStart = startOfWeek(activeDate, { weekStartsOn: 1 });
      const weekEnd = endOfWeek(activeDate, { weekStartsOn: 1 });
      dayStart.setTime(weekStart.getTime());
      dayEnd.setTime(weekEnd.getTime());
    }

    dayStart.setHours(0, 0, 0, 0);
    dayEnd.setHours(23, 59, 59, 999);

    return timeBlocks.filter((block) => {
      const start = new Date(block.startTime);
      const end = new Date(block.endTime);
      return end > dayStart && start < dayEnd;
    });
  }, [calendarMode, activeDate, timeBlocks]);

  const handlePrev = () => {
    if (calendarMode === "daily") {
      setActiveDate((prev) => subDays(prev, 1));
    } else {
      setActiveDate((prev) => subWeeks(prev, 1));
    }
  };

  const handleNext = () => {
    if (calendarMode === "daily") {
      setActiveDate((prev) => addDays(prev, 1));
    } else {
      setActiveDate((prev) => addWeeks(prev, 1));
    }
  };

  return (
    <div className="w-4/5">
      <TimeBlockCalendar
        date={activeDate}
        onPrev={handlePrev}
        onNext={handleNext}
        onDateChange={setActiveDate}
        calendarMode={calendarMode}
        onCalendarModeChange={setCalendarMode}
      >
        {calendarMode === "daily" ? (
          <DailyCalendar date={activeDate} blocks={filteredBlocks} />
        ) : (
          <WeeklyCalendar date={activeDate} blocks={filteredBlocks} />
        )}
      </TimeBlockCalendar>
    </div>
  );
}
