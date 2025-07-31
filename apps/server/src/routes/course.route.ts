import express from "express";
import { courseController } from "../controllers/course.controller";

const router = express.Router();
const controller = courseController();

router.get("/:id", controller.findById);
router.post("/", controller.createCourse)

export default router