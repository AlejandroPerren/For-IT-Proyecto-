import { describe, it, expect, vi, beforeEach } from "vitest";
import { GetQuizByLesson } from "../GetQuizByLesson";
import { mockQuizRepository } from "../../../mocks/QuizRepository.mock";

describe("Given a lesson to retrieve its quiz", () => {
  let quizRepo: ReturnType<typeof mockQuizRepository>;

  beforeEach(() => {
    quizRepo = mockQuizRepository();
  });

  describe("When calling GetQuizByLesson", () => {
    it("Then it should return the quiz associated with the lesson", async () => {
      const quizData = { id: 1, lessonId: 10, question: "Sample question", correctAnswer: "A" };
      quizRepo.findByLessonId = vi.fn().mockResolvedValue(quizData);

      const result = await GetQuizByLesson({ quizRepo }, { lessonId: 10 });

      expect(quizRepo.findByLessonId).toHaveBeenCalledWith(10);
      expect(result).toEqual(quizData);
    });
  });
});
