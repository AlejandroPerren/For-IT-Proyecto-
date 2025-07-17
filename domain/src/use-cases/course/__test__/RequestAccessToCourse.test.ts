import { describe, it, expect, vi, beforeEach } from "vitest";
import { RequestAccessToCourse } from "../RequestAccessToCourse";
import { Enrollment } from "../../../entities/Enrollment";
import { EnrollmentRepository } from "../../../services/EnrollmentRepository";

describe("Use Case: Request Access To Course", () => {
  let mockEnrollmentRepo: EnrollmentRepository;

  beforeEach(() => {
    mockEnrollmentRepo = {
      create: vi.fn((enrollment: Enrollment) =>
        Promise.resolve(
          new Enrollment(
            1, // id asignado por persistencia
            enrollment.userId,
            enrollment.courseId,
            enrollment.status,
            enrollment.progress
          )
        )
      ),
      findByUserAndCourse: vi.fn(),
      approve: vi.fn(),
      updateProgress: vi.fn(),
      getProgress: vi.fn(),
      findEnrolledUsers: vi.fn(),
    } as unknown as EnrollmentRepository;
  });

  /**
   * 🚫 TEST: Should throw if already requested or enrolled
   * Escenario: Ya existe un enrollment para ese usuario y curso
   * Resultado esperado: lanza error "Already requested or enrolled"
   */
  it("should throw if already requested or enrolled", async () => {
    const existingEnrollment = new Enrollment(1, 5, 2, "pending", 0);
    (mockEnrollmentRepo.findByUserAndCourse as any).mockResolvedValue(
      existingEnrollment
    );

    const requestAccess = new RequestAccessToCourse(mockEnrollmentRepo);

    await expect(requestAccess.execute(5, 2)).rejects.toThrow(
      "Already requested or enrolled"
    );
  });

  /**
   * ✅ TEST: Should create new pending enrollment
   * Escenario: No existe un enrollment previo
   * Resultado esperado: se crea un nuevo enrollment en estado "pending"
   */
  it("should create new pending enrollment", async () => {
    (mockEnrollmentRepo.findByUserAndCourse as any).mockResolvedValue(null);

    const input = { userId: 5, courseId: 2 };

    const requestAccess = new RequestAccessToCourse(mockEnrollmentRepo);

    const result = await requestAccess.execute(input.userId, input.courseId);

    expect(mockEnrollmentRepo.findByUserAndCourse).toHaveBeenCalledWith(
      input.userId,
      input.courseId
    );
    expect(mockEnrollmentRepo.create).toHaveBeenCalled();

    expect(result).toEqual(
      expect.objectContaining({
        id: 1,
        userId: input.userId,
        courseId: input.courseId,
        status: "pending",
        progress: 0,
      })
    );
  });
});
