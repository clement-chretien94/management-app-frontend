import CategoryUpdateCreateForm from "@/components/CategoryUpdateCreateForm";
import { Link } from "react-router";

export default function CategoryCreate() {
  return (
    <div className="flex min-h-full flex-col items-stretch gap-6 bg-background px-6 py-6">
      <Link to="/categories" className="text-sm text-blue-500 hover:underline">
        &larr; Back to Categories
      </Link>
      <h1 className="text-3xl font-bold">Create Category</h1>

      <CategoryUpdateCreateForm />
    </div>
  );
}
