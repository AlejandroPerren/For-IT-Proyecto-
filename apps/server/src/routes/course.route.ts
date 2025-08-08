import express from "express";
import { courseController } from "../controllers/course.controller";
import { authorizeAccessToCourse } from "../middleware/accessCourse.middleware";
import { authorizeCourseAccess } from "../middleware/authorizeCourseCreation.middleware";

const router = express.Router();
const controller = courseController();

router.get("/:id", authorizeAccessToCourse, controller.findById);
router.post("/", authorizeCourseAccess, controller.createCourse);
router.get("/", controller.findAllCourses);
router.get("/all/:id", controller.findAllCourses);
router.get("/createdBy/:id", controller.findCoursesByCreatorID);

export default router;
