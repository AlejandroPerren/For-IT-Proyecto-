import { Request, Response } from "express";

import { createInternalServerError } from "domain/src/errors/error";
import { quizService } from "../services/quiz.service";

export function quizController() {
  const service = quizService();

  return {
    create: async (req: Request, res: Response) => {
      try {
        const quizData = req.body; 
        const newQuiz = await service.create(quizData);
        return res.status(201).json({ ok: true, data: newQuiz });
      } catch (error) {
        console.log(error)
        const err = createInternalServerError("Error al crear quiz") || error;
        return res.status(500).json({ ok: false, message: err.message });
      }
    },

    findById: async (req: Request, res: Response) => {
      try {
        const id = Number(req.params.id);
        const quiz = await service.findById(id);
        return res.status(200).json({ ok: true, data: quiz });
      } catch (error) {
        const err = createInternalServerError("Error al obtener quiz") || error;
        return res.status(500).json({ ok: false, message: err.message });
      }
    },

    findByLessonId: async (req: Request, res: Response) => {
      try {
        const lessonId = Number(req.params.lessonId);
        const quizzes = await service.findByLessonId(lessonId);
        return res.status(200).json({ ok: true, data: quizzes });
      } catch (error) {
        const err = createInternalServerError("Error al listar quizzes") || error;
        return res.status(500).json({ ok: false, message: err.message });
      }
    },
  };
}
