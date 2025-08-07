import type { User } from "../interface/user.interface";

export type TLogin = Pick<User, "email" | "password">;

export type TRegister = Omit<User, "id" | "role">;

export type TUser = Omit<User, "id" | "role">;
