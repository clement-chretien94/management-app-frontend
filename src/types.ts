export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  logIn: (credentials: UserLogin) => Promise<void>;
  logOut: () => void;
  signUp: (userData: UserCreate) => Promise<void>;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type UserCreate = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};