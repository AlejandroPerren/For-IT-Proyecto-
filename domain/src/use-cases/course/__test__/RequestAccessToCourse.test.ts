import { describe, it, expect, beforeEach, vi } from "vitest";
import { RequestAccessToCourse } from "../RequestAccessToCourse";
import { mockEnrollmentRepository } from "../../../mocks/EnrollmentRepository.mock";

describe("Given a user requesting course access", () => {
  let repo: ReturnType<typeof mockEnrollmentRepository>;

  beforeEach(() => {
    repo = mockEnrollmentRepository();
  });

  describe("When executing RequestAccessToCourse use case", () => {
    it("Then it should throw if user is already enrolled or has a pending request", async () => {
      const existingEnrollment = {
        id: 1,
        userId: 5,
        courseId: 2,
        status: "pending",
        progress: 0,
      };

      repo.findByUserAndCourse = vi.fn().mockResolvedValue(existingEnrollment);

      await expect(
        RequestAccessToCourse({ enrollmentRepo: repo }, { userId: 5, courseId: 2 })
      ).rejects.toThrow("Already requested or enrolled");
    });

    it("Then it should create a new pending enrollment if user is not enrolled", async () => {
      repo.findByUserAndCourse = vi.fn().mockResolvedValue(null);
      repo.create = vi.fn().mockImplementation(async (e) => ({ ...e, id: 1 }));

      const input = { userId: 5, courseId: 2 };

      const result = await RequestAccessToCourse({ enrollmentRepo: repo }, input);

      expect(repo.findByUserAndCourse).toHaveBeenCalledWith(5, 2);
      expect(repo.create).toHaveBeenCalled();

      expect(result).toEqual({
        id: 1,
        userId: 5,
        courseId: 2,
        status: "pending",
        progress: 0,
      });
    });
  });
});
