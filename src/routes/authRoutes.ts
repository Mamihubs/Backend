import express from "express"
const router = express.Router()
import AuthController from "../controllers/authController"

router.post("/register", AuthController.userRegistration);
router.post("/reset-token", AuthController.sendResetPasswordToken);
router.post('/reset', AuthController.resetPassword)
// router.post("/signup",UserController.createUser)


export default router