import express from "express";
import { userController } from "../controllers/user.controller";


const router = express.Router();
const controller = userController();

router.get("/:id", controller.getUserById);
router.get("/:email", controller.getUserByEmail); 
router.post("/", controller.createUser);


export default router;
