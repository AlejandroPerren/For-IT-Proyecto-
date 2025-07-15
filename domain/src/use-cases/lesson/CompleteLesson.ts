import { LessonRepository } from "../../services/LessonRepository";
import { EnrollmentRepository } from "../../services/EnrollmentRepository";

export class CompleteLesson {
  constructor(
    private lessonRepo: LessonRepository,
    private enrollmentRepo: EnrollmentRepository
  ) {}

  async execute(userId: number, courseId: number, lessonId: number) {
    const lessons = await this.lessonRepo.findByCourseId(courseId);
    const total = lessons.length;
    if (total === 0) throw new Error("No lessons in course");

    // Este paso deberías mejorar: guardar un registro de las lecciones completadas.
    // Suponiendo que ya se cuenta cuántas completó:
    const completed = 1; // Agregar Calculo Real
    const progress = Math.round((completed / total) * 100);

    await this.enrollmentRepo.updateProgress(userId, courseId, progress);
    return progress;
  }
}
