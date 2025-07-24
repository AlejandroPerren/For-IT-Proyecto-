import { describe, it, expect, vi, beforeEach } from "vitest";
import { CompleteLesson } from "../CompleteLesson";
import { mockEnrollmentRepository } from "../../../mocks/EnrollmentRepository.mock";
import { mockCompletedLessonRepository } from "../../../mocks/CompletedLessonRepository.mock";
import { mockLessonRepository } from "../../../mocks/LessonRepository.mock";

describe("Given a user completing a lesson", () => {
  let enrollmentRepo: ReturnType<typeof mockEnrollmentRepository>;
  let completedLessonRepo: ReturnType<typeof mockCompletedLessonRepository>;
  let lessonRepo: ReturnType<typeof mockLessonRepository>;

  beforeEach(() => {
    enrollmentRepo = mockEnrollmentRepository();
    completedLessonRepo = mockCompletedLessonRepository();
    lessonRepo = mockLessonRepository();
  });

  describe("When parameters are invalid", () => {
    it("Then it should throw an error if userId, courseId or lessonId is null", async () => {
      await expect(
        CompleteLesson(
          { enrollmentRepo, completedLessonRepo, lessonRepo },
          { userId: null as any, courseId: 2, lessonId: 3 }
        )
      ).rejects.toThrow("Invalid parameters");

      await expect(
        CompleteLesson(
          { enrollmentRepo, completedLessonRepo, lessonRepo },
          { userId: 5, courseId: 0, lessonId: 3 }
        )
      ).rejects.toThrow("Invalid parameters");
    });
  });

  describe("When user is not enrolled in the course", () => {
    it("Then it should throw 'User is not enrolled in the course'", async () => {
      enrollmentRepo.findByUserAndCourse = vi.fn().mockResolvedValue(null);

      await expect(
        CompleteLesson(
          { enrollmentRepo, completedLessonRepo, lessonRepo },
          { userId: 5, courseId: 2, lessonId: 3 }
        )
      ).rejects.toThrow("User is not enrolled in the course");
    });
  });

  describe("When lesson is already completed", () => {
    it("Then it should not call markAsCompleted again", async () => {
      enrollmentRepo.findByUserAndCourse = vi
        .fn()
        .mockResolvedValue({ userId: 5, courseId: 2 });
      completedLessonRepo.hasCompleted = vi.fn().mockResolvedValue(true);
      completedLessonRepo.markAsCompleted = vi.fn();

      await CompleteLesson(
        { enrollmentRepo, completedLessonRepo, lessonRepo },
        { userId: 5, courseId: 2, lessonId: 3 }
      );

      expect(completedLessonRepo.markAsCompleted).not.toHaveBeenCalled();
    });
  });

  describe("When lesson is valid and not completed", () => {
    it("Then it should mark as completed and update progress", async () => {
      enrollmentRepo.findByUserAndCourse = vi
        .fn()
        .mockResolvedValue({ userId: 5, courseId: 2 });
      completedLessonRepo.hasCompleted = vi.fn().mockResolvedValue(false);
      completedLessonRepo.markAsCompleted = vi
        .fn()
        .mockResolvedValue(undefined);
      lessonRepo.countByCourse = vi.fn().mockResolvedValue(10);
      completedLessonRepo.countCompletedLessons = vi.fn().mockResolvedValue(5);
      enrollmentRepo.updateProgress = vi.fn().mockResolvedValue(undefined);

      await CompleteLesson(
        { enrollmentRepo, completedLessonRepo, lessonRepo },
        { userId: 5, courseId: 2, lessonId: 3 }
      );

      expect(completedLessonRepo.markAsCompleted).toHaveBeenCalledWith(5, 3);
      expect(enrollmentRepo.updateProgress).toHaveBeenCalledWith(5, 2, 50);
    });
  });
});
