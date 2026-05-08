import type { CalendarProps } from "@/types";
import TimeBlockItem from "@/components/TimeBlockItem";
import TimeGutter from "@/components/TimeGutter";
import { buildLayoutForDay, MINUTE_HEIGHT } from "@/utils/calendarLayout";
import { addDays, startOfWeek } from "date-fns";

export default function WeeklyCalendar({
  date,
  blocks,
  startHour = 6,
  endHour = 22,
  onBlockClick,
}: CalendarProps) {
  const weekStart = startOfWeek(date, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, index) =>
    addDays(weekStart, index),
  );
  const dayHeight = (endHour - startHour) * 60 * MINUTE_HEIGHT;
  const hours = Array.from(
    { length: endHour - startHour + 1 },
    (_, index) => startHour + index,
  );

  return (
    <div className="overflow-x-auto">
      <div className="min-w-225">
        <div className="grid grid-cols-[72px_repeat(7,minmax(120px,1fr))] gap-4 pb-3">
          <div />
          {weekDays.map((day) => (
            <div
              key={day.toISOString()}
              className="text-xs text-muted-foreground"
            >
              <div className="font-semibold text-foreground">
                {day.toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </div>
              <div>
                {day.toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="overflow-y-auto pr-2 max-h-140">
          <div className="grid grid-cols-[72px_repeat(7,minmax(120px,1fr))] gap-4">
            <TimeGutter startHour={startHour} endHour={endHour} />
            {weekDays.map((day) => {
              const { layout } = buildLayoutForDay(
                day,
                blocks,
                startHour,
                endHour,
              );

              return (
                <div
                  key={day.toISOString()}
                  className="relative rounded-xl border border-border/60 bg-card"
                >
                  <div
                    className="relative w-full"
                    style={{ height: dayHeight }}
                  >
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
                        <TimeBlockItem
                          key={item.block.id}
                          block={item.block}
                          onClick={onBlockClick}
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
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
