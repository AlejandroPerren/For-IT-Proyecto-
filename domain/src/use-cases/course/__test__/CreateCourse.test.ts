import { describe, it, expect, vi, beforeEach } from "vitest";
import { CreateCourse } from "../CreateCourse";
import { Course } from "../../../entities/Course";
import { CourseRepository } from "../../../services/CourseRepository";

describe("Use Case: Create Course", () => {
  let mockCourseRepository: CourseRepository;

  beforeEach(() => {
    mockCourseRepository = {
      create: vi.fn((course: Course) => Promise.resolve({ ...course, id: 1 })),
      findById: vi.fn(),
      findPublished: vi.fn(),
      findByUserId: vi.fn(),
      publishCourse: vi.fn(),
    };
  });

  /* ------------------------------------------------------------------
   * ❌ Título vacío → debe lanzar error "Title is required"
   * ------------------------------------------------------------------ */
  it("should throw if title is empty", async () => {
    const createCourse = new CreateCourse(mockCourseRepository);

    await expect(createCourse.execute("", "desc", 1)).rejects.toThrow(
      "Title is required"
    );
  });

  /* ------------------------------------------------------------------
   * ❌ Descripción vacía → debe lanzar error "Description is required"
   * ------------------------------------------------------------------ */
  it("should throw if description is empty", async () => {
    const createCourse = new CreateCourse(mockCourseRepository);

    await expect(createCourse.execute("title", "", 1)).rejects.toThrow(
      "Description is required"
    );
  });

  /* ------------------------------------------------------------------
   * ✅ Curso válido → debe crearse correctamente con los datos dados
   * ------------------------------------------------------------------ */
  it("should create course with given data", async () => {
    const input = {
      title: "Curso de TypeScript",
      description: "Aprende TypeScript desde cero",
      createdBy: 10,
    };

    const createCourse = new CreateCourse(mockCourseRepository);
    const result = await createCourse.execute(
      input.title,
      input.description,
      input.createdBy
    );

    expect(mockCourseRepository.create).toHaveBeenCalled();

    expect(result).toEqual(
      expect.objectContaining({
        id: 1,
        title: input.title,
        description: input.description,
        createdBy: input.createdBy,
        isPublished: false,
      })
    );
  });
});
