import { Request, Response } from "express";
import { Course as CourseModel } from "../database/models";
import { CourseRepository } from "domain/src/services/CourseRepository";
import { Course } from "domain/src/entities/Course";
import { courseService } from "../services/course.service";
import {
  createBadRequestError,
  createInternalServerError,
} from "domain/src/errors/error";


export function courseController() {
  const service = courseService();

  return {
    findById: async (req: Request, res: Response) => {
      try {
        //TODO:MEjorar este metodo
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
        const corusesData = await service.findAllCourses();
        return res.status(200).json({ ok: true, data: corusesData });
      } catch (error) {
        const err =
          createInternalServerError("Error al buscar los Cursos") || error;
        return res.status(500).json({ ok: false, message: err.message });
      }
    },
  };
}
