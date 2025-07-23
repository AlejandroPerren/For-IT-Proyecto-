import { Quiz } from "../entities/Quiz";
import { QuizRepository } from "../services/QuizRepository";

export interface MockedQuizRepository extends QuizRepository {
  quizzes: Quiz[];
}

export function mockQuizRepository(quizzes: Quiz[] = []): MockedQuizRepository {
  return {
    quizzes,

    findByLessonId: async (lessonId: number): Promise<Quiz[]> => {
      return quizzes
        .filter((q) => q.lessonId === lessonId)
        .map((q) => ({ ...q }));
    },

    findById: async (id: number): Promise<Quiz | null> => {
      const quiz = quizzes.find((q) => q.id === id);
      return quiz ? { ...quiz } : null;
    },

    create: async (quiz: Quiz): Promise<Quiz> => {
      const newQuiz = { ...quiz, id: quizzes.length + 1 };
      quizzes.push(newQuiz);
      return newQuiz;
    },
  };
}
