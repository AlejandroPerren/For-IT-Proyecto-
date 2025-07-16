import { describe, it, expect, vi, beforeEach } from "vitest";
import { LoginUser } from "../LoginUser";
import { User } from "../../../entities/User";
import { UserRepository } from "../../../services/UserRepository";

const compareMock = vi.fn((raw: string, hashed: string) => {
  return Promise.resolve(raw === "123456" && hashed === "hashed-password");
});

vi.mock("bcrypt", () => ({
  compare: compareMock,
}));

describe("Use Case: Login User", () => {
  let mockUserRepository: Partial<UserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: vi.fn().mockResolvedValue(
        new User(1, "Juan", "juan@test.com", "student", "hashed-password")
      ),
    };
  });

  /**
   * 🚫 TEST 1: Usuario no existe
   */
  it("debería lanzar error si el usuario no existe", async () => {
    (mockUserRepository.findByEmail as any).mockResolvedValue(null);

    const loginUser = new LoginUser(mockUserRepository as UserRepository);

    await expect(
      loginUser.execute("no@existe.com", "123456")
    ).rejects.toThrow("Invalid credentials");
  });

  /**
   * 🚫 TEST 2: Contraseña incorrecta
   */
  it("debería lanzar error si la contraseña es incorrecta", async () => {
    compareMock.mockResolvedValue(false); 

    const loginUser = new LoginUser(mockUserRepository as UserRepository);

    await expect(
      loginUser.execute("juan@test.com", "wrongpass")
    ).rejects.toThrow("Invalid credentials");
  });

  /**
   * ✅ TEST 3: Login exitoso
   */
  it("debería loguear exitosamente si las credenciales son correctas", async () => {
    compareMock.mockResolvedValue(true); 

    const loginUser = new LoginUser(mockUserRepository as UserRepository);

    const result = await loginUser.execute("juan@test.com", "123456");

    expect(result).toBeInstanceOf(User);
    expect(result.email).toBe("juan@test.com");
    expect(result.role).toBe("student");
  });
});
