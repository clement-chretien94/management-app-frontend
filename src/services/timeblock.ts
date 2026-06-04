import type { TimeBlock } from "@/types";


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