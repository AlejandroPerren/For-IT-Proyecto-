import type { User } from "../interface/user.interface";
import * as yup from "yup";
import type { updateSchema } from "../schemas/Auth.schema";

export type TLogin = Pick<User, "email" | "password">;

export type TRegister = Omit<User, "id" | "role">;

export type TUser = Omit<User, "id" | "role">;

export type UserRole = "admin" | "student" | "prof"; 

export type TEditUser = Omit<User,"password">;

export type TUpdate = yup.InferType<typeof updateSchema>;
