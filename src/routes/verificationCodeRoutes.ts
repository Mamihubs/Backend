import express from "express"
import {generateCode, verifyUser} from "../controllers/verificationController"
const router = express.Router()

router.post("/resend", generateCode )
router.post("/verify", verifyUser)

export default router