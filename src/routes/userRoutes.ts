import express from "express"
import UserAuth from "../controllers/userController"
const router = express.Router()


router.post("/register", UserAuth.createUser )
router.post("/login", UserAuth.loginUser)


export default router