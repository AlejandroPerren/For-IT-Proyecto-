import { Request, Response } from "express";
import { enrollmentService } from "../services/enrollment.service";
import { createInternalServerError } from "domain/src/errors/error";

export function enrollmentController() {
  const service = enrollmentService();

  return {
    createEnrollment: async (req: Request, res: Response) => {
      try {
        const enrollmentData = req.body;
        const newEnrollment = await service.createEnrollment(enrollmentData);
        return res.status(201).json({ ok: true, data: newEnrollment });
      } catch (error) {
        const err =
          createInternalServerError("Error al crear la inscripción") || error;
        return res.status(500).json({ ok: false, message: err.message });
      }
    },

    findByUserAndCourse: async (req: Request, res: Response) => {
      try {
        const userId = Number(req.params.userId);
        const courseId = Number(req.params.courseId);

        const enrollment = await service.findByUserAndCourse(userId, courseId);
        return res.status(200).json({ ok: true, data: enrollment });
      } catch (error) {
        const err =
          createInternalServerError("Error al buscar inscripción") || error;
        return res.status(500).json({ ok: false, message: err.message });
      }
    },

    approve: async (req: Request, res: Response) => {
      try {
        const userId = Number(req.params.userId);
        const courseId = Number(req.params.courseId);

        await service.approve(userId, courseId);
        return res
          .status(200)
          .json({ ok: true, message: "Inscripción aprobada" });
      } catch (error) {
        const err =
          createInternalServerError("Error al aprobar inscripción") || error;
        return res.status(500).json({ ok: false, message: err.message });
      }
    },

    updateProgress: async (req: Request, res: Response) => {
      try {
        const userId = Number(req.params.userId);
        const courseId = Number(req.params.courseId);
        const { progress } = req.body;

        await service.updateProgress(userId, courseId, progress);
        return res
          .status(200)
          .json({ ok: true, message: "Progreso actualizado" });
      } catch (error) {
        const err =
          createInternalServerError("Error al actualizar progreso") || error;
        return res.status(500).json({ ok: false, message: err.message });
      }
    },

    getProgress: async (req: Request, res: Response) => {
      try {
        const userId = Number(req.params.userId);
        const courseId = Number(req.params.courseId);

        const progress = await service.getProgress(userId, courseId);
        return res.status(200).json({ ok: true, data: progress });
      } catch (error) {
        const err =
          createInternalServerError("Error al obtener progreso") || error;
        return res.status(500).json({ ok: false, message: err.message });
      }
    },

    findEnrolledUsers: async (req: Request, res: Response) => {
      try {
        const courseId = Number(req.params.courseId);

        const enrollments = await service.findEnrolledUsers(courseId);
        return res.status(200).json({ ok: true, data: enrollments });
      } catch (error) {
        const err =
          createInternalServerError("Error al listar usuarios inscritos") ||
          error;
        return res.status(500).json({ ok: false, message: err.message });
      }
    },
  };
}
