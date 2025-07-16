import { describe, it, expect, vi, beforeEach } from "vitest";
import { LoginUser } from "../LoginUser";
import { User } from "../../../entities/User";
import { UserRepository } from "../../../services/UserRepository";
import bcrypt from "bcrypt";

// 🧪 Complete bcrypt mock with default export
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

    // 🔄 reset mock entre tests
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

  /**
   * 🚫 TEST 1: Should throw error if user does not exist
   * Escenario: No existe un usuario con el email ingresado
   * Resultado esperado: lanza error "Invalid credentials"
   */
  it("should throw if user does not exist", async () => {
    (mockUserRepository.findByEmail as any).mockResolvedValue(null);

    await expect(
      loginUser.execute("no@existe.com", "123456")
    ).rejects.toThrow("Invalid credentials");
  });

  /**
   * 🚫 TEST 2: Should throw error if password is incorrect
   * Escenario: El usuario existe, pero la contraseña es incorrecta
   * Resultado esperado: lanza error "Invalid credentials"
   */
  it("should throw if password is incorrect", async () => {
    bcryptMock.compare.mockResolvedValue(false);

    await expect(
      loginUser.execute("juan@test.com", "wrongpass")
    ).rejects.toThrow("Invalid credentials");
  });

  /**
   * ✅ TEST 3: Should login successfully if credentials are valid
   * Escenario: El usuario existe y la contraseña es correcta
   * Resultado esperado: devuelve el usuario correctamente
   */
  it("should login successfully with correct credentials", async () => {
    bcryptMock.compare.mockResolvedValue(true);

    const result = await loginUser.execute("juan@test.com", "123456");

    expect(result).toBeInstanceOf(User);
    expect(result.email).toBe("juan@test.com");
    expect(result.role).toBe("student");
  });
});
