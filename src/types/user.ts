export type UserRow = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: "Active" | "Inactive";
};
