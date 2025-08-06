import express from "express";
import { lessonController } from "../controllers/lesson.controller";
import { authorizeAccessToCourse } from "../middleware/auth.middleware";

const router = express.Router();
const controller = lessonController();

router.get("/:id",authorizeAccessToCourse, controller.findById);
router.get("/section/:id",authorizeAccessToCourse, controller.findBySectionId);
router.post("/",authorizeAccessToCourse, controller.createLesson);

export default router