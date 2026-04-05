import type { UserLogin, UserCreate } from "@/types";


const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const login = async (credentials: UserLogin): Promise<{ message: string }> => {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return await response.json();
};

export const logout = async (): Promise<void> => {
  const response = await fetch(`${baseUrl}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }
};

export const signup = async (userData: UserCreate): Promise<void> => {
  const response = await fetch(`${baseUrl}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Signup failed");
  }
  
  await response.json();
};

export const getCurrentUser = async () => {
  const response = await fetch(`${baseUrl}/users/me`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return await response.json();
};