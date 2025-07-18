import { describe, it, expect, vi, beforeEach } from "vitest";
import { LoginUser } from "../LoginUser";
import { User } from "../../../entities/User";
import { UserRepository } from "../../../services/UserRepository";
import bcrypt from "bcrypt";

// 🧪 Mock de bcrypt con compare
vi.mock("bcrypt", async () => {
  return {
    default: {
      compare: vi.fn(),
    },
  };
});

describe("Use Case: Login User", () => {
  let mockUserRepository: Partial<UserRepository>;
  let loginUser: LoginUser;
  let bcryptMock: any;

  beforeEach(async () => {
    const bcryptImport = await import("bcrypt");
    bcryptMock = bcryptImport.default;

    // 🔄 Resetear mocks antes de cada test
    vi.resetAllMocks();

    mockUserRepository = {
      findByEmail: vi
        .fn()
        .mockResolvedValue(
          new User(1, "Juan", "juan@test.com", "student", "hashed-password")
        ),
    };

    loginUser = new LoginUser(mockUserRepository as UserRepository);
  });

  /* ------------------------------------------------------------------
   * ❌ Usuario inexistente → lanza error "Invalid credentials"
   * ------------------------------------------------------------------ */
  it("should throw if user does not exist", async () => {
    (mockUserRepository.findByEmail as any).mockResolvedValue(null);

    await expect(
      loginUser.execute("no@existe.com", "123456")
    ).rejects.toThrow("Invalid credentials");
  });

  /* ------------------------------------------------------------------
   * ❌ Contraseña incorrecta → lanza error "Invalid credentials"
   * ------------------------------------------------------------------ */
  it("should throw if password is incorrect", async () => {
    bcryptMock.compare.mockResolvedValue(false);

    await expect(
      loginUser.execute("juan@test.com", "wrongpass")
    ).rejects.toThrow("Invalid credentials");
  });

  /* ------------------------------------------------------------------
   * ✅ Credenciales válidas → devuelve el usuario correctamente
   * ------------------------------------------------------------------ */
  it("should login successfully with correct credentials", async () => {
    bcryptMock.compare.mockResolvedValue(true);

    const result = await loginUser.execute("juan@test.com", "123456");

    expect(result).toBeInstanceOf(User);
    expect(result.email).toBe("juan@test.com");
    expect(result.role).toBe("student");
  });
});
