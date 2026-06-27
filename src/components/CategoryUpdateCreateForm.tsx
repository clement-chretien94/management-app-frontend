import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCategory, updateCategory } from "@/services/categories";
import type { Category } from "@/types";
import { useState } from "react";
import { useNavigate } from "react-router";

interface CategoryUpdateCreateFormProps {
  category?: Category;
}

export default function CategoryUpdateCreateForm({
  category,
}: Readonly<CategoryUpdateCreateFormProps>) {
  const navigate = useNavigate();
  const [color, setColor] = useState(category?.color || "#3b82f6");

  const handleCreateUpdate = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const selectedColor = formData.get("color") as string;

    if (category?.id) {
      console.log(
        `Updating category ${category.id} with title: ${title} and color: ${selectedColor}`,
      );
      await updateCategory(category.id, { title, color: selectedColor });
      navigate(`/categories/${category.id}`);
    } else {
      console.log(
        `Creating category with title: ${title} and color: ${selectedColor}`,
      );
      const { id } = await createCategory({ title, color: selectedColor });
      navigate(`/categories/${id}`);
    }
  };

  return (
    <div className="bg-card text-card-foreground rounded-xl border p-6 shadow-sm max-w-lg">
      <form onSubmit={handleCreateUpdate} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="Category title"
            defaultValue={category?.title || ""}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="color">Color</Label>
          <input
            id="color"
            name="color"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
            className="h-10 w-10 cursor-pointer rounded-md border border-input bg-transparent p-0.5 shadow-sm transition-colors"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" className="flex-1">
            {category ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
}
