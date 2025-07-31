import { User } from "../entities/User";
import { UserRepository } from "../services/UserRepository";

export interface MockedUserRepository extends UserRepository {
  users: User[];
}

export function mockUserRepository(initialUsers: User[] = []): MockedUserRepository {
  const users: User[] = [...initialUsers];

  return {
    users,

    async findByEmail(email: string): Promise<User | null> {
      const user = users.find((u) => u.email === email);
      return user ? { ...user } : null;
    },

    async createUser(user: User): Promise<User> {
      const newUser = { ...user, id: users.length + 1 };
      users.push(newUser);
      return { ...newUser };
    },
    async findById(id: number): Promise<User | null> {
      const user = users.find((u) => u.id === id);
      return user ? { ...user } : null;
    },


  };
}
