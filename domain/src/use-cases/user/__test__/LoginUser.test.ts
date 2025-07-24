import { describe, it, expect, beforeEach, vi } from "vitest";

import { mockUserRepository } from "../../../mocks/UserRepository.mock";
import { User } from "../../../entities/User";

vi.mock("bcrypt", () => ({
  default: {
    compare: vi.fn(),
  },
}));

import bcrypt from "bcrypt";
import { LoginUser } from "../LoginUser";

describe("LoginUser Use Case", () => {
  let repo: ReturnType<typeof mockUserRepository>;
  const mockCompare = bcrypt.compare as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    const sampleUser: User = {
      id: 1,
      name: "Alice",
      email: "alice@example.com",
      password: "hashed-password",
      role: "student",
    };

    repo = mockUserRepository([sampleUser]);
    vi.clearAllMocks();
  });

  it("should return user if credentials are correct", async () => {
    mockCompare.mockResolvedValue(true);

    const user = await LoginUser(
      { userRepo: repo },
      { email: "alice@example.com", password: "password123" }
    );

    expect(user).toEqual(
      expect.objectContaining({
        id: 1,
        name: "Alice",
        email: "alice@example.com",
        role: "student",
      })
    );

    expect(bcrypt.compare).toHaveBeenCalledWith(
      "password123",
      "hashed-password"
    );
  });

  it("should throw if user is not found", async () => {
    await expect(
      LoginUser(
        { userRepo: repo },
        { email: "notfound@example.com", password: "password123" }
      )
    ).rejects.toThrow("Invalid credentials");

    expect(bcrypt.compare).not.toHaveBeenCalled();
  });

  it("should throw if password does not match", async () => {
    mockCompare.mockResolvedValue(false);

    await expect(
      LoginUser(
        { userRepo: repo },
        { email: "alice@example.com", password: "wrong-password" }
      )
    ).rejects.toThrow("Invalid credentials");

    expect(bcrypt.compare).toHaveBeenCalledWith(
      "wrong-password",
      "hashed-password"
    );
  });
});
