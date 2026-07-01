import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { createTimeBlock, updateTimeBlock } from "@/services/timeblock";
import type { TimeBlock } from "@/types";
import { useState } from "react";
import { useNavigate } from "react-router";
import { SelectCategory } from "@/components/SelectCategory";
import { DatePickerTime } from "./DatePickerTime";
import { CalendarClock, Clock, Lock, Tag } from "lucide-react";

interface TimeBlockUpdateCreateFormProps {
  timeBlock?: TimeBlock;
}

export default function TimeBlockUpdateCreateForm({
  timeBlock,
}: Readonly<TimeBlockUpdateCreateFormProps>) {
  const navigate = useNavigate();

  const [startTime, setStartTime] = useState<Date | undefined>(
    timeBlock?.startTime ? new Date(timeBlock.startTime) : undefined,
  );
  const [endTime, setEndTime] = useState<Date | undefined>(
    timeBlock?.endTime ? new Date(timeBlock.endTime) : undefined,
  );

  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | undefined
  >(timeBlock?.categoryId || undefined);

  const handleCreateUpdate = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const categoryId = selectedCategoryId;
    const isLocked = formData.get("isLocked") === "on";

    if (!startTime || !endTime) {
      console.error("Start time and end time must be defined.");
      return;
    }

    const startTimeISO = startTime.toISOString();
    const endTimeISO = endTime.toISOString();

    if (timeBlock?.id) {
      console.log(
        `Updating time block ${timeBlock.id} with title: ${title} and times: ${startTimeISO} - ${endTimeISO}`,
      );
      await updateTimeBlock(timeBlock.id, {
        title,
        startTime: startTimeISO,
        endTime: endTimeISO,
        ...(!!categoryId && { categoryId }),
        isLocked: isLocked,
      });
      navigate("/");
    } else {
      console.log(
        `Creating time block with title: ${title} and times: ${startTimeISO} - ${endTimeISO}`,
      );
      await createTimeBlock({
        title,
        startTime: startTimeISO,
        endTime: endTimeISO,
        ...(!!categoryId && { categoryId }),
      });
      navigate("/");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <CalendarClock className="h-5 w-5 text-muted-foreground" />
          {timeBlock ? "Time Block Details" : "New Time Block"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreateUpdate} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="Category title"
              defaultValue={timeBlock?.title || ""}
              required
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="startTime">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                Start Time
              </Label>
              <DatePickerTime
                date={startTime || new Date()}
                onDateChange={setStartTime}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="endTime">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                End Time
              </Label>
              <DatePickerTime
                date={endTime || new Date()}
                onDateChange={setEndTime}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="category">
              <Tag className="h-3.5 w-3.5 text-muted-foreground" />
              Category
            </Label>
            <SelectCategory
              {...(timeBlock?.categoryId && {
                defaultValue: timeBlock.categoryId,
              })}
              selectedCategoryId={setSelectedCategoryId}
            />
          </div>

          {timeBlock && (
            <div className="flex items-center justify-between rounded-lg border px-4 py-3">
              <Label htmlFor="isLocked" className="cursor-pointer">
                <Lock className="h-4 w-4 text-muted-foreground" />
                Lock this time block
              </Label>
              <Switch
                id="isLocked"
                name="isLocked"
                defaultChecked={timeBlock.isLocked}
              />
            </div>
          )}

          <Button type="submit" className="w-full">
            {timeBlock ? "Update" : "Create"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
