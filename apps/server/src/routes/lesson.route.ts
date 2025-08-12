import express from "express";
import { lessonController } from "../controllers/lesson.controller";
import { authorizeAccessToCourse } from "../middleware/accessCourse.middleware";
import { authorizeCourseAccess } from "../middleware/authorizeCourseCreation.middleware";

const router = express.Router();
const controller = lessonController();

router.get("/:id",authorizeAccessToCourse, controller.findById);
router.get("/section/:sectionId",authorizeAccessToCourse, controller.findBySectionId);
router.post("/",authorizeCourseAccess, controller.createLesson);

export default router