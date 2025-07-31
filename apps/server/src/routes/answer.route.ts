import express from "express";
import { answerController } from "../controllers/answer.controller";

const router = express.Router();
const controller = answerController();

router.post("/", controller.save);
router.get("/:userId/quiz/:quizId", controller.findByUserAndQuiz);
router.get("/:userId/lesson/:lessonId", controller.findAllByUserAndLesson);

export default router;
