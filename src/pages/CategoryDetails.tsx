import DeleteCategoryAlert from "@/components/DeleteCategoryAlert";
import { Button } from "@/components/ui/button";
import { getCategoryById } from "@/services/categories";
import type { Category } from "@/types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

export default function CategoryDetails() {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      if (!id) return;
      try {
        const data = await getCategoryById(id);
        setCategory(data);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchCategory();
  }, [id]);

  if (!category) {
    return <div>Category not found.</div>;
  }

  return (
    <div className="flex min-h-full flex-col items-stretch gap-6 bg-background px-6 py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Category Details</h1>
        <div className="flex gap-2">
          <Button asChild>
            <Link to={`/categories/${category.id}/edit`}>Edit Category</Link>
          </Button>
          <DeleteCategoryAlert title={category.title} id={category.id} />
        </div>
      </div>
      <div className="bg-card text-card-foreground rounded-xl border overflow-hidden shadow-sm">
        <div
          className="h-24 w-full"
          style={{ backgroundColor: category.color }}
        />
        <div className="p-6 flex items-center gap-5">
          <div
            className="h-16 w-16 rounded-full shrink-0 border-4 border-card shadow-md -mt-14"
            style={{ backgroundColor: category.color }}
          />
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">{category.title}</h2>
            <p className="text-muted-foreground text-sm">{category.color}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
