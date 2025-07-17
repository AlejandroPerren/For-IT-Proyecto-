import { describe, it, expect, vi, beforeEach } from "vitest";
import { CompleteLesson } from "../CompleteLesson";
import { EnrollmentRepository } from "../../../services/EnrollmentRepository";
import { LessonRepository } from "../../../services/LessonRepository";
import { CompletedLessonRepository } from "../../../services/CompleteLesson";

/*
  Orden de casos:
  1) ❌ Usuario NO inscripto -> error.
  2) ❌ Lección YA completada -> NO vuelve a marcar ni actualiza progreso.
  3) ✅ Lección NO completada -> se marca y se actualiza progreso.
*/

describe("Use Case: Complete Lesson", () => {
  let mockCompletedLessonRepo: CompletedLessonRepository;
  let mockEnrollmentRepo: EnrollmentRepository;
  let mockLessonRepo: LessonRepository;

  const userId = 1;
  const courseId = 10;
  const lessonId = 100;

  beforeEach(() => {
    // --- EnrollmentRepo Mock ---
    mockEnrollmentRepo = {
      create: vi.fn(),
      findByUserAndCourse: vi.fn(),
      approve: vi.fn(),
      updateProgress: vi.fn(),
      getProgress: vi.fn(),
      findEnrolledUsers: vi.fn(),
    } as unknown as EnrollmentRepository;

    // --- LessonRepo Mock ---
    mockLessonRepo = {
      create: vi.fn(),
      findBySectionId: vi.fn(),
      findByCourseId: vi.fn(),
      findById: vi.fn(),
      countByCourse: vi.fn(),
    } as unknown as LessonRepository;

    // --- CompletedLessonRepo Mock ---
    mockCompletedLessonRepo = {
      hasCompleted: vi.fn(),
      markAsCompleted: vi.fn(),
      countCompletedLessons: vi.fn(),
    } as unknown as CompletedLessonRepository;
  });

  /* ------------------------------------------------------------------
   * 1) ❌ Usuario NO inscripto -> debería tirar error
   * ------------------------------------------------------------------ */
  it("throws if user is not enrolled in the course", async () => {
    // Simulamos que el usuario NO está inscripto
    (mockEnrollmentRepo.findByUserAndCourse as any).mockResolvedValue(null);

    const completeLesson = new CompleteLesson(
      mockCompletedLessonRepo,
      mockEnrollmentRepo,
      mockLessonRepo
    );

    await expect(
      completeLesson.execute(userId, courseId, lessonId)
    ).rejects.toThrow("User is not enrolled in the course");

    // Aseguramos que NO se intentó nada más
    expect(mockCompletedLessonRepo.hasCompleted).not.toHaveBeenCalled();
    expect(mockCompletedLessonRepo.markAsCompleted).not.toHaveBeenCalled();
    expect(mockEnrollmentRepo.updateProgress).not.toHaveBeenCalled();
  });

  /* ------------------------------------------------------------------
   * 2) ❌ Lección YA completada -> NO actualizar progreso
   * ------------------------------------------------------------------ */
  it("skips when lesson already completed (no double mark, no progress update)", async () => {
    // Usuario sí está inscripto
    (mockEnrollmentRepo.findByUserAndCourse as any).mockResolvedValue({
      id: 123,
      userId,
      courseId,
      status: "approved",
      progress: 25,
    });

    // Lección ya completada
    (mockCompletedLessonRepo.hasCompleted as any).mockResolvedValue(true);

    const completeLesson = new CompleteLesson(
      mockCompletedLessonRepo,
      mockEnrollmentRepo,
      mockLessonRepo
    );

    await completeLesson.execute(userId, courseId, lessonId);

    // Debe haber chequeado si estaba completada
    expect(mockCompletedLessonRepo.hasCompleted).toHaveBeenCalledWith(userId, lessonId);

    // NO debe volver a marcar ni recalcular progreso
    expect(mockCompletedLessonRepo.markAsCompleted).not.toHaveBeenCalled();
    expect(mockLessonRepo.countByCourse).not.toHaveBeenCalled();
    expect(mockCompletedLessonRepo.countCompletedLessons).not.toHaveBeenCalled();
    expect(mockEnrollmentRepo.updateProgress).not.toHaveBeenCalled();
  });

  /* ------------------------------------------------------------------
   * 3) ✅ Lección nueva -> marcar y actualizar progreso
   * ------------------------------------------------------------------ */
  it("marks lesson as completed and updates progress", async () => {
    // Usuario inscripto
    (mockEnrollmentRepo.findByUserAndCourse as any).mockResolvedValue({
      id: 456,
      userId,
      courseId,
      status: "approved",
      progress: 0,
    });

    // Aún no completada
    (mockCompletedLessonRepo.hasCompleted as any).mockResolvedValue(false);
    (mockCompletedLessonRepo.markAsCompleted as any).mockResolvedValue(undefined);

    // Progreso: 5/10 -> 50%
    (mockCompletedLessonRepo.countCompletedLessons as any).mockResolvedValue(5);
    (mockLessonRepo.countByCourse as any).mockResolvedValue(10);

    const completeLesson = new CompleteLesson(
      mockCompletedLessonRepo,
      mockEnrollmentRepo,
      mockLessonRepo
    );

    await completeLesson.execute(userId, courseId, lessonId);

    // 1) Verifica completitud
    expect(mockCompletedLessonRepo.hasCompleted).toHaveBeenCalledWith(userId, lessonId);

    // 2) Marca como completada
    expect(mockCompletedLessonRepo.markAsCompleted).toHaveBeenCalledWith(userId, lessonId);

    // 3) Recalcula progreso
    expect(mockLessonRepo.countByCourse).toHaveBeenCalledWith(courseId);
    expect(mockCompletedLessonRepo.countCompletedLessons).toHaveBeenCalledWith(userId, courseId);

    // 4) Actualiza progreso en EnrollmentRepo -> 50
    expect(mockEnrollmentRepo.updateProgress).toHaveBeenCalledWith(userId, courseId, 50);
  });
});
