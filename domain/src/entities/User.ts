export type UserRole = 'admin' | 'professor' | 'student'| "pending";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  password: string;
}
