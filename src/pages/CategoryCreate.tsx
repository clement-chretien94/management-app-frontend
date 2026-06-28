import CategoryUpdateCreateForm from "@/components/CategoryUpdateCreateForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export default function CategoryCreate() {
  return (
    <div className="flex min-h-full flex-col items-stretch gap-6 bg-background px-6 py-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Create Category</h1>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/categories">
            <ArrowLeft className="h-4 w-4" />
            Back to Categories
          </Link>
        </Button>
      </div>
      <CategoryUpdateCreateForm />
    </div>
  );
}
