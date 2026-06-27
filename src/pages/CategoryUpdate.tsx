import CategoryUpdateCreateForm from "@/components/CategoryUpdateCreateForm";
import { getCategoryById } from "@/services/categories";
import type { Category } from "@/types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

export default function CategoryUpdate() {
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
      <Link
        to={`/categories/${category.id}`}
        className="text-sm text-blue-500 hover:underline"
      >
        &larr; Back to Category Details
      </Link>
      <h1 className="text-3xl font-bold">Update Category</h1>

      <CategoryUpdateCreateForm category={category} />
    </div>
  );
}
