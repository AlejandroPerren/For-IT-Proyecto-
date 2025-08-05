import express from "express";
import { userController } from "../controllers/user.controller";
import { authorizeAccessToCourse } from "src/middleware/auth.middleware";


const router = express.Router();
const controller = userController();

router.get("/:id",authorizeAccessToCourse, controller.getUserById);
router.get("/:email",authorizeAccessToCourse, controller.getUserByEmail); 
router.post("/", controller.createUser);
router.post("/login", controller.loginUser)


export default router;
