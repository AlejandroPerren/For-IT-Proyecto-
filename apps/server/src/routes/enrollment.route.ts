    import { Router } from "express";
import { enrollmentController } from "../controllers/enrollment.controller";
import { authorizeAccessToCourse } from "../middleware/auth.middleware";

const controller = enrollmentController();
const router = Router();

router.post("/",authorizeAccessToCourse, controller.createEnrollment);
router.get("/:userId/:courseId",authorizeAccessToCourse, controller.findByUserAndCourse);
router.put("/:userId/:courseId/approve",authorizeAccessToCourse, controller.approve);
router.put("/:userId/:courseId/progress",authorizeAccessToCourse, controller.updateProgress);
router.get("/:userId/:courseId/progress",authorizeAccessToCourse, controller.getProgress);
router.get("/course/:courseId",authorizeAccessToCourse, controller.findEnrolledUsers);

export default router;
