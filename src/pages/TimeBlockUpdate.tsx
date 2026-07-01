import TimeBlockUpdateCreateForm from "@/components/TimeBlockUpdateCreateForm";
import { Button } from "@/components/ui/button";
import { getTimeBlockById } from "@/services/timeblock";
import type { TimeBlock } from "@/types";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

export default function TimeBlockUpdate() {
  const { id } = useParams<{ id: string }>();
  const [timeBlock, setTimeBlock] = useState<TimeBlock | null>(null);

  useEffect(() => {
    const fetchTimeBlock = async () => {
      if (!id) return;
      try {
        const data = await getTimeBlockById(id);
        setTimeBlock(data);
      } catch (error) {
        console.error("Error fetching time block:", error);
      }
    };

    fetchTimeBlock();
  }, [id]);

  if (!timeBlock) {
    return <div>Time block not found.</div>;
  }

  return (
    <div className="flex min-h-full flex-col items-stretch gap-6 bg-background px-6 py-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Update Time Block</h1>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
      <TimeBlockUpdateCreateForm timeBlock={timeBlock} />
    </div>
  );
}
