import type { Category , CategoryCreate, CategoryUpdate } from "@/types";


const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${baseUrl}/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return await response.json();
};

export const getCategoryById = async (id: string): Promise<Category> => {
  const response = await fetch(`${baseUrl}/categories/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch category");
  }

  return await response.json();
};

export const createCategory = async (category: CategoryCreate): Promise<Category> => {
  const response = await fetch(`${baseUrl}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    throw new Error("Failed to create category");
  }

  return await response.json();
};

export const updateCategory = async (id: string, category: CategoryUpdate): Promise<Category> => {
  const response = await fetch(`${baseUrl}/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    throw new Error("Failed to update category");
  }

  return await response.json();
};

export const deleteCategory = async (id: string): Promise<void> => {
  const response = await fetch(`${baseUrl}/categories/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete category");
  }
};