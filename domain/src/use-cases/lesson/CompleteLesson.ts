import { CompletedLessonRepository } from "../../services/CompleteLesson";
import { EnrollmentRepository } from "../../services/EnrollmentRepository";
import { LessonRepository } from "../../services/LessonRepository";

export interface CompleteLessonDependencies {
  completedLessonRepo: CompletedLessonRepository;
  enrollmentRepo: EnrollmentRepository;
  lessonRepo: LessonRepository;
}

export interface CompleteLessonInput {
  userId: number;
  courseId: number;
  lessonId: number;
}

export async function CompleteLesson(
  { completedLessonRepo, enrollmentRepo, lessonRepo }: CompleteLessonDependencies,
  { userId, courseId, lessonId }: CompleteLessonInput
): Promise<void> {
  if (!userId || !courseId || !lessonId) {
    throw new Error("Invalid parameters");
  }

  const enrollment = await enrollmentRepo.findByUserAndCourse(userId, courseId);
  if (!enrollment) {
    throw new Error("User is not enrolled in the course");
  }

  const alreadyCompleted = await completedLessonRepo.hasCompleted(userId, lessonId);
  if (alreadyCompleted) return;

  await completedLessonRepo.markAsCompleted(userId, lessonId);

  const totalLessons = await lessonRepo.countByCourse(courseId);
  const completedLessons = await completedLessonRepo.countCompletedLessons(userId, courseId);

  const percent = totalLessons > 0
    ? Math.round((completedLessons / totalLessons) * 100)
    : 0;

  await enrollmentRepo.updateProgress(userId, courseId, percent);
}
