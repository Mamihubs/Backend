import express from "express"
const router = express.Router()
import { userRegistration } from "../controllers/authController"
import { UserController } from "../controllers/user.controller"

const userController = new UserController();
router.post("/register", userRegistration)
router.post("/signup",userController.createUser);


export default router