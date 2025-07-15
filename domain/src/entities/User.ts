export type UserRole = 'admin' | 'professor' | 'student';

export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public role: UserRole,
    public password: string
  ) {}
}
