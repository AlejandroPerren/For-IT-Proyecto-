import { QuizRepository } from "../../services/QuizRepository";
import { AnswerRepository } from "../../services/AnswerRepository";
import { Answer } from "../../entities/Answer";

export interface SubmitAnswerDependencies {
  quizRepo: QuizRepository;
  answerRepo: AnswerRepository;
}

export interface SubmitAnswerInput {
  userId: number;
  quizId: number;
  selectedAnswer: string;
}

export async function SubmitAnswer(
  { quizRepo, answerRepo }: SubmitAnswerDependencies,
  { userId, quizId, selectedAnswer }: SubmitAnswerInput
): Promise<Answer> {
  const quiz = await quizRepo.findById(quizId);
  if (!quiz) throw new Error("Quiz not found");

  const isCorrect = quiz.correctAnswer === selectedAnswer;

  const answer: Answer = {
    id: 0, 
    userId,
    quizId,
    selectedAnswer,
    isCorrect,
  };

  return answerRepo.save(answer);
}
