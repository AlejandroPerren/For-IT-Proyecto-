import express from "express";
import { quizController } from "../controllers/quiz.controller";
import { authorizeAccessToCourse } from "../middleware/accessCourse.middleware";
import { authorizeCourseAccess } from "../middleware/authorizeCourseCreation.middleware";

const router = express.Router();
const controller = quizController();

router.post("/", authorizeCourseAccess, controller.create);
router.get("/:id", authorizeAccessToCourse, controller.findById);
router.get(
  "/lessons/:lessonId",
  authorizeAccessToCourse,
  controller.findByLessonId
);

export default router;
