import { describe, it, expect, vi, beforeEach } from "vitest";
import { RegisterUser } from "../RegisterUser";
import { User } from "../../../entities/User";
import { UserRepository } from "../../../services/UserRepository";
import bcrypt from "bcrypt";

// 🧪 Mock de bcrypt con hash
vi.mock("bcrypt", async () => {
  return {
    default: {
      hash: vi.fn(() => Promise.resolve("hashed-password")),
    },
  };
});

describe("Use Case: Register User", () => {
  let mockUserRepository: UserRepository;

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: vi.fn().mockResolvedValue(null),
      create: vi.fn((user: User) => Promise.resolve({ ...user, id: 1 })),
      findById: vi.fn(),
      findAllPendingProfessors: vi.fn(),
      approveProfessor: vi.fn(),
    };
  });

  /* ------------------------------------------------------------------
   * ❌ Usuario ya existe → lanza error "User already exists"
   * ------------------------------------------------------------------ */
  it("should throw if user already exists", async () => {
    const existingUser = new User(42, "Ya Existe", "juan@test.com", "student", "xxx");
    (mockUserRepository.findByEmail as any).mockResolvedValue(existingUser);

    const registerUser = new RegisterUser(mockUserRepository);

    await expect(
      registerUser.execute("Juan", "juan@test.com", "123456")
    ).rejects.toThrow("User already exists");
  });

  /* ------------------------------------------------------------------
   * ✅ Email disponible → crea usuario correctamente
   * ------------------------------------------------------------------ */
  it("should create new user if email is not taken", async () => {
    const input = {
      name: "Juan Pérez",
      email: "juan@test.com",
      password: "123456",
    };

    const registerUser = new RegisterUser(mockUserRepository);

    const createdUser = await registerUser.execute(input.name, input.email, input.password);

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(input.email);

    const bcryptMock = await import("bcrypt");
    expect(bcryptMock.default.hash).toHaveBeenCalledWith(input.password, 10);

    expect(mockUserRepository.create).toHaveBeenCalled();

    expect(createdUser).toEqual(expect.objectContaining({
      id: 1,
      name: input.name,
      email: input.email,
      role: "student",
      password: "hashed-password",
    }));
  });
});
