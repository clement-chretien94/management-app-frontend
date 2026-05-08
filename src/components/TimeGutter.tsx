import { MINUTE_HEIGHT } from "@/utils/calendarLayout";

export default function TimeGutter({
  startHour,
  endHour,
}: {
  startHour: number;
  endHour: number;
}) {
  const hours = Array.from(
    { length: endHour - startHour + 1 },
    (_, index) => startHour + index,
  );

  return (
    <div className="flex flex-col text-xs text-muted-foreground">
      {hours.map((hour) => (
        <div
          key={hour}
          className="flex items-start justify-end pr-2"
          style={{ height: 60 * MINUTE_HEIGHT }}
        >
          <span className="-mt-1">{`${hour}:00`}</span>
        </div>
      ))}
    </div>
  );
}
