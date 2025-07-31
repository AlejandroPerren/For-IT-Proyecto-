import { Request, Response } from "express";
import { createInternalServerError } from "domain/src/errors/error";
import { answerService } from "../services/anwser.service";

export function answerController() {
  const service = answerService();

  return {
    save: async (req: Request, res: Response) => {
      try {
        const data = req.body; 
        const saved = await service.save(data);
        return res.status(201).json({ ok: true, data: saved });
      } catch (error) {
        const err = createInternalServerError("Error al guardar respuesta") || error;
        return res.status(500).json({ ok: false, message: err.message });
      }
    },

    findByUserAndQuiz: async (req: Request, res: Response) => {
      try {
        const userId = Number(req.params.userId);
        const quizId = Number(req.params.quizId);

        const answer = await service.findByUserAndQuiz(userId, quizId);
        return res.status(200).json({ ok: true, data: answer });
      } catch (error) {
        const err = createInternalServerError("Error al buscar respuesta") || error;
        return res.status(500).json({ ok: false, message: err.message });
      }
    },

    findAllByUserAndLesson: async (req: Request, res: Response) => {
      try {
        const userId = Number(req.params.userId);
        const lessonId = Number(req.params.lessonId);

        const answers = await service.findAllByUserAndLesson(userId, lessonId);
        return res.status(200).json({ ok: true, data: answers });
      } catch (error) {
        const err = createInternalServerError("Error al buscar respuestas") || error;
        return res.status(500).json({ ok: false, message: err.message });
      }
    },
  };
}
