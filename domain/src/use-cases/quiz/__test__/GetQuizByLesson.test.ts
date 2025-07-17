import { describe, it, expect, vi, beforeEach } from "vitest";
import { GetQuizByLesson } from "../GetQuizByLesson";
import type { QuizRepository } from "../../../services/QuizRepository";
import { Quiz } from "../../../entities/Quiz";

/*
  Escenarios que cubrimos:
  1) 🚫 Lección sin quizzes -> devuelve [] (no error; comportamiento esperado).
  2) 💥 Repo lanza error interno -> propagamos error.
  3) ✅ Devuelve quizzes cuando existen.
*/

describe("Use Case: GetQuizByLesson", () => {
  let quizRepo: QuizRepository;

  const lessonId = 42;

  beforeEach(() => {
    quizRepo = {
      findByLessonId: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
    } as unknown as QuizRepository; // casteo forzado porque es un objeto literal
  });

  /**
   * 🚫 TEST 1: Lección sin quizzes
   * Escenario: el repo devuelve []
   * Resultado esperado: el use case devuelve [] sin error
   */
  it("should return an empty array when lesson has no quizzes", async () => {
    (quizRepo.findByLessonId as any).mockResolvedValue([]);

    const useCase = new GetQuizByLesson(quizRepo);
    const result = await useCase.execute(lessonId);

    expect(quizRepo.findByLessonId).toHaveBeenCalledWith(lessonId);
    expect(result).toEqual([]);
  });

  /**
   * 💥 TEST 2: Error en el repositorio
   * Escenario: el repo lanza excepción (DB caída, error de conexión, etc.)
   * Resultado esperado: el use case propaga el error.
   */
  it("should throw if repository fails", async () => {
    (quizRepo.findByLessonId as any).mockRejectedValue(new Error("DB error"));

    const useCase = new GetQuizByLesson(quizRepo);

    await expect(useCase.execute(lessonId)).rejects.toThrow("DB error");
    expect(quizRepo.findByLessonId).toHaveBeenCalledWith(lessonId);
  });

  /**
   * ✅ TEST 3: Devuelve quizzes correctamente
   * Escenario: hay quizzes asociados a la lección
   * Resultado esperado: el use case devuelve el arreglo tal cual.
   */
  it("should return quizzes when found", async () => {
    const quizzes: Quiz[] = [
      new Quiz(1, lessonId, "¿Capital de Francia?", ["París", "Roma"], "París"),
      new Quiz(2, lessonId, "2+2?", ["3", "4"], "4"),
    ];

    (quizRepo.findByLessonId as any).mockResolvedValue(quizzes);

    const useCase = new GetQuizByLesson(quizRepo);
    const result = await useCase.execute(lessonId);

    expect(quizRepo.findByLessonId).toHaveBeenCalledWith(lessonId);
    expect(result).toEqual(quizzes);
  });
});
