import { Quiz } from '../entities/Quiz';

export interface QuizRepository {
  findByLessonId(lessonId: number): Promise<Quiz[]>;
  findById(id: number): Promise<Quiz | null>;
  create(quiz: Quiz): Promise<Quiz>;
}
