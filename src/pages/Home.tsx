import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/hooks/auth/authContext";
import TimeBlocksPanel from "@/components/TimeBlocksPanel";
import MicroTasksPanel from "@/components/MicroTasksPanel";
import { toast } from "sonner";
import { getTimeBlocks, lockTimeBlocks } from "@/services/timeblock";
import type { TimeBlock } from "@/types";
import { Lock } from "lucide-react";
import EditTimeBlockAlert from "@/components/EditTimeBlockAlert";

export default function Home() {
  const authContext = useContext(AuthContext);
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([]);

  const loadTimeBlocks = async () => {
    try {
      const blocks = await getTimeBlocks();
      setTimeBlocks(blocks);
    } catch (error) {
      console.error("Error fetching time blocks:", error);
    }
  };

  useEffect(() => {
    (async () => {
      await loadTimeBlocks();
    })();
  }, []);

  const handleLockSchedule = async () => {
    try {
      await lockTimeBlocks();
      await loadTimeBlocks();
      toast.success("Tomorrow's schedule has been locked!");
    } catch (error) {
      console.error("Error locking schedule:", error);
      toast.error("Failed to lock tomorrow's schedule.");
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const isTomorrowLocked = timeBlocks
    .filter(
      (block) =>
        new Date(block.startTime).toDateString() === tomorrow.toDateString(),
    )
    .every((block) => block.isLocked);

  return (
    <div className="flex min-h-full flex-col items-stretch gap-6 bg-background px-6 py-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">
          Welcome, {authContext?.user?.firstName}!
        </h1>
        <div className="flex gap-3">
          <EditTimeBlockAlert created />
          <Button onClick={handleLockSchedule} disabled={isTomorrowLocked}>
            <Lock className="h-4 w-4" />
            Lock Tomorrow's Schedule
          </Button>
        </div>
      </header>
      <main className="flex w-full items-start gap-8">
        <TimeBlocksPanel timeBlocks={timeBlocks} />
        <MicroTasksPanel />
      </main>
    </div>
  );
}
