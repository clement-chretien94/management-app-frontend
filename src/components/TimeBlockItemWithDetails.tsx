import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { TimeBlock } from "@/types";
import { Clock, Lock, LockOpen, Tag, X } from "lucide-react";
import type { CSSProperties } from "react";
import TimeBlockItem from "@/components/TimeBlockItem";
import {
  formatTimeLabel,
  formatDate,
  getDuration,
} from "@/utils/calendarLayout";
import { formatDuration } from "date-fns";
import { useNavigate } from "react-router";
import DeleteTimeBlockAlert from "./DeleteTimeBlockAlert";

interface TimeBlockItemWithDetails {
  timeBlock: TimeBlock;
  style: CSSProperties;
  onDeleteTimeBlock: () => void;
}

export default function TimeBlockItemWithDetails({
  timeBlock,
  style,
  onDeleteTimeBlock,
}: Readonly<TimeBlockItemWithDetails>) {
  const navigate = useNavigate();

  const startTime = new Date(timeBlock.startTime);
  const endTime = new Date(timeBlock.endTime);

  const duration = getDuration(startTime, endTime);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <TimeBlockItem block={timeBlock} style={style} />
      </AlertDialogTrigger>
      <AlertDialogContent className="p-0 overflow-hidden max-w-sm">
        <AlertDialogDescription className="sr-only">
          {timeBlock.title} — {formatDate(startTime)},{" "}
          {formatTimeLabel(startTime)} to {formatTimeLabel(endTime)}
        </AlertDialogDescription>
        <AlertDialogCancel
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 h-7 w-7 rounded-full border-none shadow-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </AlertDialogCancel>
        <div className="px-6 pt-4 pb-6 space-y-5">
          <AlertDialogHeader className="space-y-1">
            <AlertDialogTitle className="text-lg font-semibold leading-tight pr-6">
              {timeBlock.title}
            </AlertDialogTitle>
            <p className="text-sm text-muted-foreground">
              {formatDate(startTime)}
            </p>
          </AlertDialogHeader>

          <div className="space-y-3 text-sm">
            {/* Time range */}
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="font-medium">
                {formatTimeLabel(startTime)} – {formatTimeLabel(endTime)}
              </span>
              <span className="ml-auto text-muted-foreground text-xs bg-muted px-2 py-0.5 rounded-full">
                {formatDuration(duration, { format: ["hours", "minutes"] })}
              </span>
            </div>

            {/* Category */}
            <div className="flex items-center gap-3">
              <Tag className="h-4 w-4 text-muted-foreground shrink-0" />
              {timeBlock.category ? (
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: timeBlock.category.color }}
                  />
                  <span>{timeBlock.category.title}</span>
                </div>
              ) : (
                <span className="text-muted-foreground">No category</span>
              )}
            </div>

            {/* Locked status */}
            <div className="flex items-center gap-3">
              {timeBlock.isLocked ? (
                <Lock className="h-4 w-4 text-muted-foreground shrink-0" />
              ) : (
                <LockOpen className="h-4 w-4 text-muted-foreground shrink-0" />
              )}
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  timeBlock.isLocked
                    ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                }`}
              >
                {timeBlock.isLocked ? "Locked" : "Unlocked"}
              </span>
            </div>
          </div>

          <AlertDialogFooter className="pt-2 sm:grid sm:grid-cols-2">
            <AlertDialogAction
              onClick={() => navigate(`/timeblocks/${timeBlock.id}/edit`)}
            >
              Edit
            </AlertDialogAction>
            <AlertDialogAction asChild>
              <DeleteTimeBlockAlert
                title={timeBlock.title}
                id={timeBlock.id}
                onDelete={onDeleteTimeBlock}
              />
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
