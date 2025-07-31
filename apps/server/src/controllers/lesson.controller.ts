import {
  createBadRequestError,
  createInternalServerError,
} from "domain/src/errors/error";
import { Request, Response } from "express";
import { lessonService } from "../services/lesson.service";

export function lessonController() {
  const service = lessonService();

  return {
    findById: async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const idLesson = Number(id);
        const lesson = await service.findById(idLesson);
        return res.status(200).json({
          ok: true,
          data: lesson,
        });
      } catch (e) {
        const err =
          createInternalServerError(
            "Ocurrio un error al encontrar la Leccion"
          ) || e;
        return res.status(500).json({ ok: false, message: err.message });
      }
    },

    createLesson: async (req: Request, res: Response) => {
      try {
        const lessonData = req.body;
        const newLesson = await service.createLesson(lessonData);
        return res.status(200).json({ ok: true, data: newLesson });
      } catch (e) {
        const err =
          createInternalServerError("Ocurrio un error al crear la leccion") ||
          e;
        return res.status(500).json({ ok: false, message: err.message });
      }
    },

    findBySectionId: async (req:Request, res: Response) => {
        try {
            const {id} = req.params;
            const idSection = Number(id);
            const lessons = await service.findBySectionId(idSection);
            return res.status(200).json({
                ok: true,
                data: lessons
            })
        } catch (e) {
            const error =
          createInternalServerError(
            "Ocurrio un error al encontrar las lecciones"
          ) || e;
        return res.status(error.httpStatus).json({
          ok: false,
          message: error.message,
        });
        }
    }
  };
}
