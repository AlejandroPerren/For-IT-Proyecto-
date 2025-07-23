import { QuizRepository } from "../../services/QuizRepository";

export interface GetQuizByLessonDependencies {
  quizRepo: QuizRepository;
}

export interface GetQuizByLessonInput {
  lessonId: number;
}

export async function GetQuizByLesson(
  { quizRepo }: GetQuizByLessonDependencies,
  { lessonId }: GetQuizByLessonInput
) {
  return quizRepo.findByLessonId(lessonId);
}
