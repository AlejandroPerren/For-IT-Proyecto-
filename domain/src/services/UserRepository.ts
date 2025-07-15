import { User } from '../entities/User';

export interface UserRepository {
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
  findAllPendingProfessors(): Promise<User[]>;
  approveProfessor(id: number): Promise<void>;
}
