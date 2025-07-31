import express from "express";

const router = express.Router();

import courseRoute from "./course.route";
import userRoute from "./user.route";

// Routes
router.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "API RESTful con TypeScript y Express",
  });
});

router.use("/users", userRoute);
router.use("/course", courseRoute)

// 404
router.use((req, res) => {
  res.status(404).json({
    ok: false,
    message: "Recurso no encontrado",
  });
});



export default router