import express from "express"
const router = express.Router()
import { userRegistration } from "../controllers/authController"

router.post("/register", userRegistration)


export default router