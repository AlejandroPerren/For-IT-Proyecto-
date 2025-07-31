import express from "express";
import { sectionController } from "../controllers/section.controller";

const router = express.Router()
const controller = sectionController()

router.get("/:id", controller.findByCourseId);
router.post("/", controller.createSection)

export default router