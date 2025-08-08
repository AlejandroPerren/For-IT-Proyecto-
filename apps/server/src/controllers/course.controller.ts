import { Request, Response } from "express";
import { courseService } from "../services/course.service";
import { createInternalServerError } from "domain/src/errors/error";
import { enrollmentService } from "../services/enrollment.service";

export function courseController() {
  const service = courseService();
  const enrollService = enrollmentService();

  return {
    findById: async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const idCourse = Number(id);
        const course = await service.findById(idCourse);
        return res.status(200).json({
          ok: true,
          data: course,
        });
      } catch (e) {
        const err =
          createInternalServerError(
            "Ocurrio un error al encontrar el usuario"
          ) || e;
        return res.status(500).json({ ok: false, message: err.message });
      }
    },

    createCourse: async (req: Request, res: Response) => {
      try {
        const courseData = req.body;
        const newCourse = await service.createCourse(courseData);
        return res.status(201).json({ ok: true, data: newCourse });
      } catch (error) {
        const err =
          createInternalServerError("Error al crear el Curso") || error;
        return res.status(500).json({ ok: false, message: err.message });
      }
    },

    findAllCourses: async (req: Request, res: Response) => {
      try {
        const id = req.params.id ? req.params.id : null;
        const userId = Number(id);
        const coursesData = await service.findAllCourses();

        if (!coursesData) {
          return res
            .status(404)
            .json({ ok: false, message: "No se encontraron cursos" });
        }

        const coursesWithEnrollment = await Promise.all(
          coursesData.map(async (course: any) => {
            const enrollment = await enrollService.findByUserAndCourse(
              userId,
              course.id
            );
            return {
              ...course,
              isEnrolled: !!enrollment,
            };
          })
        );
        return res.status(200).json({ ok: true, data: coursesWithEnrollment });
      } catch (error) {
        const err =
          createInternalServerError("Error al buscar los Cursos") || error;
        return res.status(500).json({ ok: false, message: err.message });
      }
    },

    findCoursesByCreatorID: async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const idCourse = Number(id);
        const corusesData = await service.findCoursesByCreatorID(idCourse);
        return res.status(200).json({ ok: true, data: corusesData });
      } catch (error) {
        const err =
          createInternalServerError("Error al buscar los Cursos") || error;
        return res.status(500).json({ ok: false, message: err.message });
      }
    },
  };
}
