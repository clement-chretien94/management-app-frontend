import type { AuthState } from "@/types";
import { createContext } from "react";

export const AuthContext = createContext<AuthState | undefined>(undefined);