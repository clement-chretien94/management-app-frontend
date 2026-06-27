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
      <div>
        <h1 className="text-3xl font-bold">Category Details</h1>
        <div className="flex gap-2 mt-2">
          <Button asChild>
            <Link to={`/categories/${category.id}/edit`}>Edit Category</Link>
          </Button>
          <DeleteCategoryAlert title={category.title} id={category.id} />
        </div>
      </div>
      <div className="bg-card text-card-foreground rounded-xl border p-6 shadow-sm max-w-lg">
        <p>
          <strong>Title:</strong> {category.title}
        </p>
        <p>
          <strong>Color:</strong>{" "}
          <span
            className="inline-block w-4 h-4 rounded-full"
            style={{ backgroundColor: category.color }}
          ></span>{" "}
          {category.color}
        </p>
      </div>
    </div>
  );
}
