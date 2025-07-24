import { describe, it, expect, beforeEach, vi } from "vitest";
import { CreateCourse } from "../CreateCourse";
import { mockCourseRepository } from "../../../mocks/CourseRepository.mock";

describe("Given various course data", () => {
  let repo: ReturnType<typeof mockCourseRepository>;

  beforeEach(() => {
    repo = mockCourseRepository();
  });

  describe("When title is null or empty", () => {
    it("Then it should throw 'Title is required' if title is null", async () => {
      await expect(
        CreateCourse(
          { courseRepo: repo },
          { title: null as any, description: "desc", createdBy: 1 }
        )
      ).rejects.toThrow("Title is required");
    });

    it("Then it should throw 'Title is required' if title is an empty string", async () => {
      await expect(
        CreateCourse(
          { courseRepo: repo },
          { title: "   ", description: "desc", createdBy: 1 }
        )
      ).rejects.toThrow("Title is required");
    });
  });

  describe("When description is empty", () => {
    it("Then it should throw 'Description is required'", async () => {
      await expect(
        CreateCourse(
          { courseRepo: repo },
          { title: "Course Title", description: "   ", createdBy: 1 }
        )
      ).rejects.toThrow("Description is required");
    });
  });

  describe("When executing CreateCourse use case", () => {
    it("Then it should create a course if the input data is valid", async () => {
      const input = {
        title: "Test Course",
        description: "This is a course",
        createdBy: 1,
      };

     
      repo.create = vi.fn(repo.create);

      const result = await CreateCourse({ courseRepo: repo }, input);

      expect(repo.create).toHaveBeenCalled();
      expect(result).toEqual({
        id: 1,
        ...input,
        isPublished: false,
      });
    });
  });
});
