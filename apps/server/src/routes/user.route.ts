import express from "express";
import { userController } from "../controllers/user.controller";
import { authorizeUserOrAdmin } from "../middleware/user_admin.middleware";


const router = express.Router();
const controller = userController();

router.post("/", controller.createUser);
router.get("/",authorizeUserOrAdmin, controller.findAllUser);
router.get("/:id", authorizeUserOrAdmin, controller.getUserById);
router.put("/:id",authorizeUserOrAdmin, controller.updateUser);
router.delete("/:id",authorizeUserOrAdmin, controller.deleteUser);
router.get("/:email", authorizeUserOrAdmin, controller.getUserByEmail);
router.post("/login", controller.loginUser);

export default router;
