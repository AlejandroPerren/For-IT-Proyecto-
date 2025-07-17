import { CompletedLessonRepository } from "../../services/CompleteLesson";
import { EnrollmentRepository } from "../../services/EnrollmentRepository";
import { LessonRepository } from "../../services/LessonRepository";
export class CompleteLesson {
  constructor(
    private completedLessonRepo: CompletedLessonRepository,
    private enrollmentRepo: EnrollmentRepository,
    private lessonRepo: LessonRepository
  ) {}

  async execute(userId: number, courseId: number, lessonId: number) {
    const enrollment = await this.enrollmentRepo.findByUserAndCourse(
      userId,
      courseId
    );
    if (!enrollment) {
      throw new Error("User is not enrolled in the course");
    }

    // Si ya está completada, nada
    const already = await this.completedLessonRepo.hasCompleted(
      userId,
      lessonId
    );
    if (already) return;

    // Marcar como completada
    await this.completedLessonRepo.markAsCompleted(userId, lessonId);

    // Recalcular progreso
    const totalLessons = await this.lessonRepo.countByCourse(courseId);
    const completed = await this.completedLessonRepo.countCompletedLessons(
      userId,
      courseId
    );
    const percent =
      totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;

    await this.enrollmentRepo.updateProgress(userId, courseId, percent);
  }
}
