import { Request, Response } from "express";
import { createInternalServerError } from "domain/src/errors/error";
import { courseService } from "../services/course.service";
import { enrollmentService } from "../services/enrollment.service";
import { sectionService } from "../services/section.service";
import { lessonService } from "../services/lesson.service";
import { quizService } from "../services/quiz.service";

export function courseFullController() {
  const courses = courseService();
  const enrollments = enrollmentService();
  const sectionsSrv = sectionService();
  const lessonsSrv = lessonService();
  const quizzesSrv = quizService();

  return {
    getFullCourse: async (req: Request, res: Response) => {
      try {
        const userId = Number(req.params.userId);
        const courseId = Number(req.params.courseId);

        const course = await courses.findById(courseId);

        const enrollment = await enrollments.findByUserAndCourse(
          userId,
          courseId
        );

        const sections = (await sectionsSrv.findByCourseId(courseId)) || [];

        const lessonsBySection: Record<number, any[]> = {};
        for (const section of sections) {
          try {
            const lessons = await lessonsSrv.findBySectionId(section.id);
            lessonsBySection[section.id] = lessons || [];
          } catch {
            lessonsBySection[section.id] = [];
          }
        }

        const quizzesByLesson: Record<number, any[]> = {};
        const allLessons = Object.values(lessonsBySection).flat();
        for (const lesson of allLessons) {
          try {
            const quizzes = await quizzesSrv.findByLessonId(lesson.id);
            quizzesByLesson[lesson.id] = quizzes || [];
          } catch {
            quizzesByLesson[lesson.id] = [];
          }
        }

        return res.status(200).json({
          ok: true,
          data: {
            course,
            enrollment,
            sections,
            lessons: lessonsBySection,
            quizzes: quizzesByLesson,
          },
        });
      } catch (error: any) {
        const err =
          createInternalServerError("Error al obtener curso completo") || error;
        return res
          .status(500)
          .json({ ok: false, message: err.message || "Error desconocido" });
      }
    },
  };
}
