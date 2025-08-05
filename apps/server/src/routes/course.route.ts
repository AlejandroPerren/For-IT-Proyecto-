import express from "express";
import { courseController } from "../controllers/course.controller";
import { authorizeAccessToCourse } from "src/middleware/auth.middleware";

const router = express.Router();
const controller = courseController();

router.get("/:id",authorizeAccessToCourse, controller.findById);
router.post("/", authorizeAccessToCourse,controller.createCourse)
router.get("/", controller.findAllCourses)

export default router