import express from "express";

const router = express.Router();

import courseRoute from "./course.route";
import userRoute from "./user.route";
import sectionRoute from "./section.route";
import lessonRoute from "./lesson.route"
import enrollmentRoute from "./enrollment.route"
import quizzesRoute from "./quiz.route"
import anwserRoute from "./answer.route"
// Routes
router.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "API RESTful con TypeScript y Express",
  });
});

router.use("/users", userRoute);
router.use("/course", courseRoute);
router.use("/section", sectionRoute);
router.use("/lesson", lessonRoute);
router.use("/enrollment", enrollmentRoute);
router.use("/quiz", quizzesRoute);
// router.use("/anwser", anwserRoute);

// 404
router.use((req, res) => {
  res.status(404).json({
    ok: false,
    message: "Recurso no encontrado",
  });
});

export default router;
