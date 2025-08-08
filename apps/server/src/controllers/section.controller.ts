import { Request, Response } from "express";
import { sectionService } from "../services/section.service";
import {
  createBadRequestError,
  createInternalServerError,
} from "domain/src/errors/error";

export function sectionController() {
  const service = sectionService();

  return {
    findByCourseId: async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const idCourse = Number(id);
        const section = await service.findByCourseId(idCourse);
        return res.status(200).json({
          ok: true,
          data: section,
        });
      } catch (e) {
        const error =
          createInternalServerError(
            "Ocurrio un error al encontrar el usuario"
          ) || e;
        return res.status(error.httpStatus).json({
          ok: false,
          message: error.message,
        });
      }
    },

    createSection: async (req: Request, res: Response) => {
      try {
        const sectionData = req.body;
        const newSection = await service.createSection(sectionData);
        return res.status(200).json({ ok: true, data: newSection });
      } catch (error) {
          console.log(error)
        const err =
          createInternalServerError("Error al crear usuario") || error;
        return res.status(500).json({ ok: false, message: err.message });
      }
    },
  };
}
