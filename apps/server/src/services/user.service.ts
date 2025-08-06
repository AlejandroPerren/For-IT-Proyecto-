import { User as UserModel } from "../database/models";
import { UserRepository } from "domain/src/services/UserRepository";
import { User } from "domain/src/entities/User";
import { hashPassword } from "../utils/auth.util";

export function userService(): UserRepository {
  const _mapToUser = (user: UserModel): User => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      password: user.password,
    };
  };

  return {
    findById: async function (id: number): Promise<User | null> {
      try {
        const user = await UserModel.findByPk(id);
        return user ? _mapToUser(user) : null;
      } catch (error) {
        throw error;
      }
    },

    findByEmail: async function (email: string): Promise<User | null> {
      try {
        const user = await UserModel.findOne({ where: { email } });
        return user ? _mapToUser(user) : null;
      } catch (error) {
        throw error;
      }
    },

    createUser: async function (userData: User): Promise<User> {
      try {
        const hashedPassword = await hashPassword(userData.password);
        const newUser = await UserModel.create({
          ...userData,
          password: hashedPassword,
        });
        return _mapToUser(newUser);
      } catch (error) {
        throw error;
      }
    },
  };
}
