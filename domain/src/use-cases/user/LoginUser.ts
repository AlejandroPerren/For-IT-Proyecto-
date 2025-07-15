import { User } from "../../entities/User";
import { UserRepository } from "../../services/UserRepository";
import bcrypt from "bcrypt";

export class RegisterUser {
  constructor(private userRepo: UserRepository) {}

  async execute(name: string, email: string, password: string) {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) throw new Error("User already exists");

    const hashed = await bcrypt.hash(password, 10);
    const user = new User(0, name, email, 'student', hashed);

    return this.userRepo.create(user);
  }
}
