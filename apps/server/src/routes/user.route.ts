import express from "express";
import { userController } from "../controllers/user.controller";
import { authorizeAccessToCourse } from "../middleware/auth.middleware";

const router = express.Router();
const controller = userController();

router.post("/", controller.createUser);
router.get("/", controller.findAllUser);
router.get("/:id", authorizeAccessToCourse, controller.getUserById);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);
router.get("/:email", authorizeAccessToCourse, controller.getUserByEmail);
router.post("/login", controller.loginUser);

export default router;
