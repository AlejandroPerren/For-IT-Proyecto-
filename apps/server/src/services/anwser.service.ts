import { Answer as AnswerModel, Quiz as QuizModel } from "../database/models";
import { AnswerRepository } from "domain/src/services/AnswerRepository";
import { Answer } from "domain/src/entities/Answer";

export function answerService(): AnswerRepository {
  const _mapToAnswer = (answer: AnswerModel): Answer => ({
    id: answer.id,
    userId: answer.userId,
    quizId: answer.quizId,
    selectedAnswer: answer.selectedAnswer,
    isCorrect: answer.isCorrect,
  });

  return {
    async save(answer: Answer): Promise<Answer> {
      const quiz = await QuizModel.findByPk(answer.quizId);
      if (!quiz) throw new Error("Quiz no encontrado");

      const isCorrect = quiz.correctAnswer === answer.selectedAnswer;

      const saved = await AnswerModel.create({
        ...answer,
        isCorrect,
      });

      return _mapToAnswer(saved);
    },

    async findByUserAndQuiz(userId: number, quizId: number): Promise<Answer | null> {
      const found = await AnswerModel.findOne({ where: { userId, quizId } });
      return found ? _mapToAnswer(found) : null;
    },

    async findAllByUserAndLesson(userId: number, lessonId: number): Promise<Answer[]> {
      const quizzes = await QuizModel.findAll({ where: { lessonId } });
      const quizIds = quizzes.map(q => q.id);

      const answers = await AnswerModel.findAll({
        where: {
          userId,
          quizId: quizIds,
        },
      });

      return answers.map(_mapToAnswer);
    },
  };
}
