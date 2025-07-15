import { QuizRepository } from "../../services/QuizRepository";

export class GetQuizByLesson {
  constructor(private quizRepo: QuizRepository) {}

  async execute(lessonId: number) {
    return this.quizRepo.findByLessonId(lessonId);
  }
}
