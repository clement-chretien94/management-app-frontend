import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCategory, updateCategory } from "@/services/categories";
import type { Category } from "@/types";
import { Tag } from "lucide-react";
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Tag className="h-5 w-5 text-muted-foreground" />
          {category ? "Category Details" : "New Category"}
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
              defaultValue={category?.title || ""}
              required
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="color">Color</Label>
            <div className="flex items-center gap-4">
              <input
                id="color"
                name="color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                required
                className="h-10 w-10 cursor-pointer rounded-md border border-input bg-transparent p-0.5 shadow-xs transition-colors"
              />
              <div className="flex items-center gap-2">
                <div
                  className="h-6 w-6 rounded-full shrink-0 shadow-xs border border-border"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm text-muted-foreground font-mono">
                  {color}
                </span>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">
            {category ? "Update" : "Create"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
