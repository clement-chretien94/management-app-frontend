import TimeBlockUpdateCreateForm from "@/components/TimeBlockUpdateCreateForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export default function TimeBlockCreate() {
  return (
    <div className="flex min-h-full flex-col items-stretch gap-6 bg-background px-6 py-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Create Time Block</h1>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
      <TimeBlockUpdateCreateForm />
    </div>
  );
}
