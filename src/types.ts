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

export type TimeBlock = {
  id: string;
  title: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  isLocked: boolean;
};

export type TimeBlockCreate = {
  title: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
};

export type MicroTask = {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: string; // ISO string
};

export type MicroTaskCreate = {
  title: string;
};

export type MicroTaskUpdate = {
  title: string;
  isCompleted: boolean;
};

/* Types related to calendar layout */

export type LayoutBlock = {
  block: TimeBlock;
  startMinutes: number;
  endMinutes: number;
  top: number;
  height: number;
  column: number;
  columnCount: number;
};

export type CalendarProps = {
  date: Date;
  blocks: TimeBlock[];
  startHour?: number;
  endHour?: number;
  onBlockClick?: (block: TimeBlock) => void;
};