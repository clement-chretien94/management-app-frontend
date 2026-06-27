import type { Category } from "@/types";
import { useNavigate } from "react-router";

export default function CategoryItem({
  category,
}: Readonly<{ category: Category }>) {
  const navigate = useNavigate();
  return (
    <div
      key={category.id}
      className="bg-card text-card-foreground p-4 rounded-lg shadow cursor-pointer"
      onClick={() => {
        navigate(`/categories/${category.id}`);
      }}
    >
      <h2 className="text-xl font-semibold">{category.title}</h2>
      <div className="flex items-center gap-2 mt-1">
        <div
          className="h-4 w-4 rounded-full shrink-0"
          style={{ backgroundColor: category.color }}
        />
        <p className="text-muted-foreground">{category.color}</p>
      </div>
    </div>
  );
}
