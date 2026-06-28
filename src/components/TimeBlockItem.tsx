import type { CSSProperties, ComponentPropsWithoutRef } from "react";
import type { TimeBlock } from "@/types";
import { formatTimeLabel } from "@/utils/calendarLayout";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimeBlockItemProps extends ComponentPropsWithoutRef<"button"> {
  block: TimeBlock;
  style: CSSProperties;
}

export default function TimeBlockItem({
  block,
  style,
  className,
  ...props
}: Readonly<TimeBlockItemProps>) {
  const startTime = new Date(block.startTime);
  const endTime = new Date(block.endTime);

  return (
    <button
      type="button"
      {...props}
      className={cn(
        "absolute cursor-pointer rounded-lg border p-2 text-left text-xs text-foreground shadow-sm transition",
        !block.category?.color && "border-primary/20 bg-primary/10",
        className,
      )}
      style={
        block.category?.color
          ? {
              ...style,
              backgroundColor: block.category.color + "33",
              borderColor: block.category.color + "66",
            }
          : style
      }
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-semibold line-clamp-1">{block.title}</span>
        {block.isLocked && <Lock className="h-4 w-4" />}
      </div>
      <div className="mt-2 text-[11px] text-muted-foreground">
        {formatTimeLabel(startTime)} - {formatTimeLabel(endTime)}
      </div>
    </button>
  );
}
