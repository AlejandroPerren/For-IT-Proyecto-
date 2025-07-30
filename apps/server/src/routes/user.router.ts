import express from "express";
import { userController } from "../controllers/user.controller";


const router = express.Router();
const controller = userController();

router.get("/users/:id", controller.getUserById);
router.get("/users/email", controller.getUserByEmail); 
router.post("/users", controller.createUser);


export default router;
