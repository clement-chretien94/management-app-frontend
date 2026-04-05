import { useState, useEffect } from "react";
import { login, signup, logout, getCurrentUser } from "@/services/auth";
import { AuthContext } from "./authContext";
import { useNavigate } from "react-router";

import type { User, UserLogin, UserCreate } from "@/types";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const logIn = async (credentials: UserLogin) => {
    try {
      await login(credentials);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      navigate("/login");
    }
  };

  const signUp = async (userData: UserCreate) => {
    try {
      await signup(userData);
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  useEffect(() => {
    const getAuthenticatedUser = async () => {
      try {
        const user = await getCurrentUser();
        setIsAuthenticated(true);
        setUser(user);
      } catch (error) {
        console.error("Error fetching authenticated user:", error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    getAuthenticatedUser();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        logIn,
        logOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
