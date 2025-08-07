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
          role: "student",
        });
        return _mapToUser(newUser);
      } catch (error) {
        throw error;
      }
    },

    findAllUser: async function (): Promise<User[] | null> {
      try {
        const user = await UserModel.findAll();
        return user ? user.map(_mapToUser) : null;
      } catch (error) {
        throw error;
      }
    },

    updateUser: async function (
      id: number,
      updatedData: Partial<User>
    ): Promise<User> {
      try {
        const user = await UserModel.findByPk(id);
        if (!user) throw new Error("User not found");

        if (updatedData.password) {
          updatedData.password = await hashPassword(updatedData.password);
        }

        await user.update(updatedData);
        return _mapToUser(user);
      } catch (error) {
        throw error;
      }
    },

    deleteUser: async function (id: number): Promise<boolean> {
      try {
        const deletedCount = await UserModel.destroy({ where: { id } });
        return deletedCount > 0;
      } catch (error) {
        throw error;
      }
    },
  };
}
