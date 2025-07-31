import express from "express";
import { quizController } from "../controllers/quiz.controller";

const router = express.Router();
const controller = quizController();

router.post("/", controller.create);
router.get("/:id", controller.findById);
router.get("/lessons/:lessonId", controller.findByLessonId);

export default router;
