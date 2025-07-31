import { Quiz as QuizModel } from "../database/models";
import { QuizRepository } from "domain/src/services/QuizRepository";
import { Quiz } from "domain/src/entities/Quiz";

export function quizService(): QuizRepository {
  const _mapToQuiz = (quiz: QuizModel): Quiz => ({
    id: quiz.id,
    lessonId: quiz.lessonId,
    question: quiz.question,
    options: quiz.options as string[],
    correctAnswer: quiz.correctAnswer,
  });

  return {
    async findByLessonId(lessonId: number): Promise<Quiz[]> {
      const quizzes = await QuizModel.findAll({ where: { lessonId } });
      return quizzes.map(_mapToQuiz);
    },

    async findById(id: number): Promise<Quiz | null> {
      const quiz = await QuizModel.findByPk(id);
      return quiz ? _mapToQuiz(quiz) : null;
    },

    async create(quiz: Quiz): Promise<Quiz> {
      const created = await QuizModel.create(quiz as any);
      return _mapToQuiz(created);
    },
  };
}
