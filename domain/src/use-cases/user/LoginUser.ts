import { UserRepository } from "../../services/UserRepository";
import bcrypt from "bcrypt";

export interface LoginUserDependencies {
  userRepo: UserRepository;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export async function LoginUser(
  { userRepo }: LoginUserDependencies,
  { email, password }: LoginUserInput
) {
  const user = await userRepo.findByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  return user;
}
