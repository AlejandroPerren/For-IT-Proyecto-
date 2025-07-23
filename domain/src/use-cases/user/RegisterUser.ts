import { User } from "../../entities/User";
import { UserRepository } from "../../services/UserRepository";
import bcrypt from "bcrypt";

export interface RegisterUserDependencies {
  userRepo: UserRepository;
}

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

export async function RegisterUser(
  { userRepo }: RegisterUserDependencies,
  { name, email, password }: RegisterUserInput
): Promise<User> {
  const existing = await userRepo.findByEmail(email);
  if (existing) throw new Error("User already exists");

  const hashed = await bcrypt.hash(password, 10);

  const user: User = {
    id: 0,
    name,
    email,
    role: "student",
    password: hashed,
  };

  return userRepo.create(user);
}
