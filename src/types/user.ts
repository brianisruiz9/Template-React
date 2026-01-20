export type UserRow = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: "Active" | "Inactive";
};

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: number;
  permissions: unknown[];
};

export type AuthState = {
  user: AuthUser | null;
  token: string | null;
};