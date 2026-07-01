import type { TimeBlock, TimeBlockCreate, TimeBlockUpdate } from "@/types";


const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const getTimeBlocks = async (): Promise<TimeBlock[]> => {
  const response = await fetch(`${baseUrl}/timeblocks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch time blocks");
  }

  return await response.json();
};

export const getTimeBlockById = async (id: string): Promise<TimeBlock> => {
  const response = await fetch(`${baseUrl}/timeblocks/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch time block");
  }

  return await response.json();
};

export const createTimeBlock = async (timeBlock: TimeBlockCreate): Promise<TimeBlock> => {
  const response = await fetch(`${baseUrl}/timeblocks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(timeBlock),
  });

  if (!response.ok) {
    throw new Error("Failed to create time block");
  }

  return await response.json();
};

export const updateTimeBlock = async (id: string, timeBlock: TimeBlockUpdate): Promise<TimeBlock> => {
  const response = await fetch(`${baseUrl}/timeblocks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(timeBlock),
  });

  if (!response.ok) {
    throw new Error("Failed to update time block");
  }

  return await response.json();
};

export const deleteTimeBlock = async (id: string): Promise<void> => {
  const response = await fetch(`${baseUrl}/timeblocks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete time block");
  }
};

export const lockTimeBlocks = async (): Promise<void> => {
  const response = await fetch(`${baseUrl}/timeblocks/lock`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  console.log(response);

  if (!response.ok) {
    throw new Error("Failed to lock time blocks");
  }
};