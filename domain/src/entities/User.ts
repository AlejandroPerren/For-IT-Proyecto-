export type UserRole = 'admin' | 'prof' | 'student';
export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  password: string;
}
