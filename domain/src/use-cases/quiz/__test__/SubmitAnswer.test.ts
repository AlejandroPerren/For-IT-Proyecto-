import { describe, it, expect, vi, beforeEach } from "vitest";
import { SubmitAnswer } from "../SubmitAnswer";
import type { QuizRepository } from "../../../services/QuizRepository";
import type { AnswerRepository } from "../../../services/AnswerRepository";
import { Answer } from "../../../entities/Answer";
import { Quiz } from "../../../entities/Quiz";

/*
  Casos cubiertos:
  1) ❌ Quiz inexistente → lanza error
  2) ❌ Respuesta incorrecta → guarda isCorrect = false
  3) ✅ Respuesta correcta → guarda isCorrect = true
*/

describe("Use Case: SubmitAnswer", () => {
  let quizRepo: QuizRepository;
  let answerRepo: AnswerRepository;

  const userId = 7;
  const quizId = 99;
  const correctOption = "B";
  const wrongOption = "A";

  beforeEach(() => {
    quizRepo = {
      findByLessonId: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
    };

    answerRepo = {
      save: vi.fn(),
      findByUserAndQuiz: vi.fn(),
      findAllByUserAndLesson: vi.fn(),
    };
  });

  /* -----------------------------------------------------------------------
   * ❌ Quiz no existe → lanza Error("Quiz not found")
   * --------------------------------------------------------------------- */
  it("should throw if quiz does not exist", async () => {
    (quizRepo.findById as any).mockResolvedValue(null);

    const uc = new SubmitAnswer(quizRepo, answerRepo);

    await expect(uc.execute(userId, quizId, correctOption)).rejects.toThrow(
      "Quiz not found"
    );

    expect(answerRepo.save).not.toHaveBeenCalled();
  });

  /* -----------------------------------------------------------------------
   * ❌ Respuesta incorrecta → guarda isCorrect = false
   * --------------------------------------------------------------------- */
  it("should save answer marked incorrect when selectedAnswer != quiz.correctAnswer", async () => {
    const quiz = new Quiz(quizId, 123, "Pregunta?", ["A", "B", "C"], correctOption);
    (quizRepo.findById as any).mockResolvedValue(quiz);

    (answerRepo.save as any).mockImplementation(async (ans: Answer) => {
      return new Answer(1, ans.userId, ans.quizId, ans.selectedAnswer, ans.isCorrect);
    });

    const uc = new SubmitAnswer(quizRepo, answerRepo);
    const saved = await uc.execute(userId, quizId, wrongOption);

    expect(quizRepo.findById).toHaveBeenCalledWith(quizId);
    expect(answerRepo.save).toHaveBeenCalled();

    const arg = (answerRepo.save as any).mock.calls[0][0] as Answer;
    expect(arg.isCorrect).toBe(false);
    expect(arg.selectedAnswer).toBe(wrongOption);
    expect(saved.isCorrect).toBe(false);
  });

  /* -----------------------------------------------------------------------
   * ✅ Respuesta correcta → guarda isCorrect = true
   * --------------------------------------------------------------------- */
  it("should save answer marked correct when selectedAnswer == quiz.correctAnswer", async () => {
    const quiz = new Quiz(quizId, 123, "Pregunta?", ["A", "B", "C"], correctOption);
    (quizRepo.findById as any).mockResolvedValue(quiz);

    (answerRepo.save as any).mockImplementation(async (ans: Answer) => {
      return new Answer(2, ans.userId, ans.quizId, ans.selectedAnswer, ans.isCorrect);
    });

    const uc = new SubmitAnswer(quizRepo, answerRepo);
    const saved = await uc.execute(userId, quizId, correctOption);

    expect(quizRepo.findById).toHaveBeenCalledWith(quizId);
    expect(answerRepo.save).toHaveBeenCalled();

    const arg = (answerRepo.save as any).mock.calls[0][0] as Answer;
    expect(arg.isCorrect).toBe(true);
    expect(arg.selectedAnswer).toBe(correctOption);
    expect(saved.isCorrect).toBe(true);
  });
});
