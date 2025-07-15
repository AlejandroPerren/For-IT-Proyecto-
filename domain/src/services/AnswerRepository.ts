import { Answer } from '../entities/Answer';

export interface AnswerRepository {
  save(answer: Answer): Promise<Answer>;
  findByUserAndQuiz(userId: number, quizId: number): Promise<Answer | null>;
  findAllByUserAndLesson(userId: number, lessonId: number): Promise<Answer[]>;
}
