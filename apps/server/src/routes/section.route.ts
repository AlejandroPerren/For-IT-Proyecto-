import express from "express";
import { sectionController } from "../controllers/section.controller";
import { authorizeAccessToCourse } from "../middleware/accessCourse.middleware";
import { authorizeCourseAccess } from "../middleware/authorizeCourseCreation.middleware";

const router = express.Router()
const controller = sectionController()

router.get("/:id",authorizeAccessToCourse, controller.findByCourseId);
router.post("/",authorizeCourseAccess, controller.createSection)

export default router