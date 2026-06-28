import type { CalendarProps } from "@/types";
import TimeBlockItemWithDetails from "@/components/TimeBlockItemWithDetails";
import TimeGutter from "@/components/TimeGutter";
import { buildLayoutForDay, MINUTE_HEIGHT } from "@/utils/calendarLayout";

export default function DailyCalendar({
  date,
  blocks,
  startHour = 6,
  endHour = 22,
}: Readonly<CalendarProps>) {
  const { layout, startMinutes, endMinutes } = buildLayoutForDay(
    date,
    blocks,
    startHour,
    endHour,
  );

  const dayHeight = (endMinutes - startMinutes) * MINUTE_HEIGHT;
  const hours = Array.from(
    { length: endHour - startHour + 1 },
    (_, index) => startHour + index,
  );

  return (
    <div className="overflow-y-auto pr-2 max-h-140">
      <div className="grid grid-cols-[72px_1fr] gap-4">
        <TimeGutter startHour={startHour} endHour={endHour} />
        <div className="relative rounded-xl border border-border/60 bg-card">
          <div className="relative w-full" style={{ height: dayHeight }}>
            {hours.map((hour) => (
              <div
                key={hour}
                className="absolute left-0 right-0 border-t border-border/40"
                style={{
                  top: (hour - startHour) * 60 * MINUTE_HEIGHT,
                }}
              />
            ))}
            {layout.map((item) => {
              const width = 100 / item.columnCount;
              return (
                <TimeBlockItemWithDetails
                  key={item.block.id}
                  timeBlock={item.block}
                  style={{
                    top: item.top,
                    height: item.height,
                    left: `${item.column * width}%`,
                    width: `${width}%`,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
