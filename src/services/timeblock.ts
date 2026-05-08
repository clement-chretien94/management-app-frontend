import type { TimeBlock, TimeBlockCreate } from "@/types";


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