import type { CSSProperties } from "react";
import type { TimeBlock } from "@/types";
import { Lock } from "lucide-react";

const formatTimeLabel = (date: Date) => {
  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
};

export default function TimeBlockItem({
  block,
  style,
  onClick,
}: {
  block: TimeBlock;
  style: CSSProperties;
  onClick?: (block: TimeBlock) => void;
}) {
  const startTime = new Date(block.startTime);
  const endTime = new Date(block.endTime);

  return (
    <button
      type="button"
      className={
        "absolute rounded-lg border border-primary/20 bg-primary/10 p-2 text-left text-xs text-foreground shadow-sm transition"
      }
      style={style}
      onClick={() => onClick?.(block)}
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
