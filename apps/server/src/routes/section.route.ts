import express from "express";
import { sectionController } from "../controllers/section.controller";
import { authorizeAccessToCourse } from "src/middleware/auth.middleware";

const router = express.Router()
const controller = sectionController()

router.get("/:id",authorizeAccessToCourse, controller.findByCourseId);
router.post("/",authorizeAccessToCourse, controller.createSection)

export default router