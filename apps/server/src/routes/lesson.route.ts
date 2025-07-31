import express from "express";
import { lessonController } from "../controllers/lesson.controller";

const router = express.Router();
const controller = lessonController();

router.get("/:id", controller.findById);
router.get("/section/:id", controller.findBySectionId);
router.post("/", controller.createLesson);

export default router