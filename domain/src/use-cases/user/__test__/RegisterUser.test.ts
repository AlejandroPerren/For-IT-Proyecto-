import { describe, it, expect, vi, beforeEach } from "vitest";
import { RegisterUser } from "../RegisterUser";
import bcrypt from "bcrypt";
import { mockUserRepository } from "../../../mocks/UserRepository.mock";

vi.mock("bcrypt", () => ({
  default: {
    hash: vi.fn(),
  },
}));

describe("Given a new user to register", () => {
  let userRepo: ReturnType<typeof mockUserRepository>;
  const mockHash = bcrypt.hash as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    userRepo = mockUserRepository();
    vi.resetAllMocks();
  });

  describe("When email is already in use", () => {
    it("Then it should throw 'User already exists'", async () => {
      userRepo.findByEmail = vi
        .fn()
        .mockResolvedValue({ id: 1, email: "test@example.com" });

      await expect(
        RegisterUser(
          { userRepo },
          { name: "Test", email: "test@example.com", password: "123" }
        )
      ).rejects.toThrow("User already exists");
    });
  });

  describe("When email is new", () => {
    it("Then it should hash the password and create the user", async () => {
      userRepo.findByEmail = vi.fn().mockResolvedValue(null);
      mockHash.mockResolvedValue("hashed123");

      userRepo.create = vi
        .fn()
        .mockImplementation(async (u) => ({ ...u, id: 1 }));

      const input = {
        name: "Test",
        email: "test@example.com",
        password: "123",
      };
      const result = await RegisterUser({ userRepo }, input);

      expect(mockHash).toHaveBeenCalledWith("123", 10);
      expect(userRepo.create).toHaveBeenCalled();
      expect(result).toEqual({
        id: 1,
        name: "Test",
        email: "test@example.com",
        role: "student",
        password: "hashed123",
      });
    });
  });
});
