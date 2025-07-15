import { QuizRepository } from "../../services/QuizRepository";
import { AnswerRepository } from "../../services/AnswerRepository";
import { Answer } from "../../entities/Answer";

export class SubmitAnswer {
  constructor(
    private quizRepo: QuizRepository,
    private answerRepo: AnswerRepository
  ) {}

  async execute(userId: number, quizId: number, selectedAnswer: string) {
    const quiz = await this.quizRepo.findById(quizId);
    if (!quiz) throw new Error("Quiz not found");

    const isCorrect = quiz.correctAnswer === selectedAnswer;
    const answer = new Answer(0, userId, quizId, selectedAnswer, isCorrect);

    return this.answerRepo.save(answer);
  }
}
