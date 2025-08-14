import express from "express";
import { courseController } from "../controllers/course.controller";
import { authorizeAccessToCourse } from "../middleware/accessCourse.middleware";
import { authorizeCourseAccess } from "../middleware/authorizeCourseCreation.middleware";
import { courseFullController } from "../controllers/AlldataOfCourse.controller";

const router = express.Router();
const controller = courseController();

const courseFullCtrl = courseFullController();

router.get("/:courseId", authorizeAccessToCourse, controller.findById);
router.post("/", authorizeCourseAccess, controller.createCourse);
router.get("/", controller.findAllCourses);
router.get("/all/:id", controller.findAllCourses);
router.get("/createdBy/:id", controller.findCoursesByCreatorID);
router.get(
  "/all/course/:courseId/user/:userId",
  authorizeAccessToCourse,
  courseFullCtrl.getFullCourse
);

export default router;
