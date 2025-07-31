    import { Router } from "express";
import { enrollmentController } from "../controllers/enrollment.controller";

const controller = enrollmentController();
const router = Router();

router.post("/", controller.createEnrollment);
router.get("/:userId/:courseId", controller.findByUserAndCourse);
router.put("/:userId/:courseId/approve", controller.approve);
router.put("/:userId/:courseId/progress", controller.updateProgress);
router.get("/:userId/:courseId/progress", controller.getProgress);
router.get("/course/:courseId", controller.findEnrolledUsers);

export default router;
