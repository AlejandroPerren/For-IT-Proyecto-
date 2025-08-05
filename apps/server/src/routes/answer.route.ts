import express from "express";
import { answerController } from "../controllers/answer.controller";
import { authorizeAccessToCourse } from "src/middleware/auth.middleware";

const router = express.Router();
const controller = answerController();

router.post("/", authorizeAccessToCourse, controller.save);
router.get(
  "/:userId/quiz/:quizId",
  authorizeAccessToCourse,
  controller.findByUserAndQuiz
);
router.get(
  "/:userId/lesson/:lessonId",
  authorizeAccessToCourse,
  controller.findAllByUserAndLesson
);

export default router;
