import type { Category } from "@/types";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";

export default function CategoryItem({
  category,
}: Readonly<{ category: Category }>) {
  const navigate = useNavigate();
  return (
    <div
      key={category.id}
      className="bg-card text-card-foreground rounded-xl border cursor-pointer hover:bg-accent/50 transition-all duration-150 flex items-center overflow-hidden"
      onClick={() => navigate(`/categories/${category.id}`)}
    >
      <div className="flex items-center gap-4 p-5 flex-1 min-w-0">
        <div
          className="h-10 w-10 rounded-full shrink-0 shadow-sm"
          style={{ backgroundColor: category.color }}
        />
        <div className="min-w-0">
          <h2 className="text-lg font-semibold leading-tight">
            {category.title}
          </h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            {category.color}
          </p>
        </div>
        <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground shrink-0" />
      </div>
    </div>
  );
}
