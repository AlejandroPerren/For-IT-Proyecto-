import { Answer } from "../entities/Answer";
import { Quiz } from "../entities/Quiz";
import { AnswerRepository } from "../services/AnswerRepository";

export interface MockedAnswerRepository extends AnswerRepository {
  answers: Answer[];
}

export function mockAnswerRepository(
  answers: Answer[] = [],
  quizzes: Quiz[] = []
): MockedAnswerRepository {
  return {
    answers,

    save: async (answer: Answer): Promise<Answer> => {
      const newAnswer = { ...answer, id: answers.length + 1 };
      answers.push(newAnswer);
      return newAnswer;
    },

    findByUserAndQuiz: async (
      userId: number,
      quizId: number
    ): Promise<Answer | null> => {
      const answer = answers.find(
        (a) => a.userId === userId && a.quizId === quizId
      );
      return answer ? { ...answer } : null;
    },

    findAllByUserAndLesson: async (
      userId: number,
      lessonId: number
    ): Promise<Answer[]> => {
      const quizzesForLesson = quizzes
        .filter((q) => q.lessonId === lessonId)
        .map((q) => q.id);
      return answers
        .filter(
          (a) => a.userId === userId && quizzesForLesson.includes(a.quizId)
        )
        .map((a) => ({ ...a }));
    },
  };
}
