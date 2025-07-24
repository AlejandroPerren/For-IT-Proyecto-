import { describe, it, expect, vi, beforeEach } from "vitest";
import { SubmitAnswer } from "../SubmitAnswer";
import { mockQuizRepository } from "../../../mocks/QuizRepository.mock";
import { mockAnswerRepository } from "../../../mocks/AnswerRepository.mock";

describe("Given a user submitting an answer to a quiz", () => {
  let quizRepo: ReturnType<typeof mockQuizRepository>;
  let answerRepo: ReturnType<typeof mockAnswerRepository>;

  beforeEach(() => {
    quizRepo = mockQuizRepository();
    answerRepo = mockAnswerRepository();
  });

  describe("When the quiz does not exist", () => {
    it("Then it should throw 'Quiz not found'", async () => {
      quizRepo.findById = vi.fn().mockResolvedValue(null);

      await expect(
        SubmitAnswer({ quizRepo, answerRepo }, { userId: 1, quizId: 99, selectedAnswer: "A" })
      ).rejects.toThrow("Quiz not found");
    });
  });

  describe("When the quiz exists", () => {
    it("Then it should save and return the answer with isCorrect = true if correct", async () => {
      const quiz = { id: 1, question: "Q?", correctAnswer: "A" };
      quizRepo.findById = vi.fn().mockResolvedValue(quiz);
      answerRepo.save = vi.fn().mockImplementation(async (answer) => ({ ...answer, id: 5 }));

      const result = await SubmitAnswer(
        { quizRepo, answerRepo },
        { userId: 2, quizId: 1, selectedAnswer: "A" }
      );

      expect(quizRepo.findById).toHaveBeenCalledWith(1);
      expect(answerRepo.save).toHaveBeenCalled();
      expect(result).toEqual({
        id: 5,
        userId: 2,
        quizId: 1,
        selectedAnswer: "A",
        isCorrect: true,
      });
    });

    it("Then it should save and return the answer with isCorrect = false if incorrect", async () => {
      const quiz = { id: 1, question: "Q?", correctAnswer: "A" };
      quizRepo.findById = vi.fn().mockResolvedValue(quiz);
      answerRepo.save = vi.fn().mockImplementation(async (answer) => ({ ...answer, id: 6 }));

      const result = await SubmitAnswer(
        { quizRepo, answerRepo },
        { userId: 3, quizId: 1, selectedAnswer: "B" }
      );

      expect(result.isCorrect).toBe(false);
      expect(result.selectedAnswer).toBe("B");
    });
  });
});
