import express from "express"
const router = express.Router()
import { userRegistration } from "../controllers/authController"

router.post("/register", userRegistration)
// router.post("/signup",UserController.createUser)


export default router