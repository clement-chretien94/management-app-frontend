import CategoryItem from "@/components/CategoryItem";
import { getCategories } from "@/services/categories";
import type { Category } from "@/types";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <div className="flex min-h-full flex-col items-stretch gap-6 bg-background px-6 py-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Link
          to="/categories/create"
          className="rounded-lg bg-primary px-2 py-2 text-primary-foreground"
        >
          <Plus />
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}

        {categories.length === 0 && (
          <div className="text-muted-foreground">No categories found.</div>
        )}
      </div>
    </div>
  );
}
