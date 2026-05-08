import type { MicroTask, MicroTaskCreate, MicroTaskUpdate } from "@/types";


const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const getMicroTasks = async (): Promise<MicroTask[]> => {
  const response = await fetch(`${baseUrl}/microtasks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch micro tasks");
  }

  return await response.json();
};

export const createMicroTask = async (task: MicroTaskCreate): Promise<MicroTask> => {
  const response = await fetch(`${baseUrl}/microtasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to create micro task");
  }

  return await response.json();
};

export const updateMicroTask = async ({id, task}: {id: string, task: MicroTaskUpdate}): Promise<MicroTask> => {
  const response = await fetch(`${baseUrl}/microtasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to update micro task");
  }

  return await response.json();
};