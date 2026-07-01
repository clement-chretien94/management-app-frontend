import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategories } from "@/services/categories";
import type { Category } from "@/types";
import { useEffect, useState } from "react";

interface SelectCategoryProps {
  defaultValue?: string;
  selectedCategoryId: (value: string) => void;
}

export function SelectCategory({
  defaultValue,
  selectedCategoryId,
}: Readonly<SelectCategoryProps>) {
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
    <Select defaultValue={defaultValue} onValueChange={selectedCategoryId}>
      <SelectTrigger>
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent position="item-aligned">
        <SelectGroup>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
