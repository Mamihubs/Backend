import express from "express"
import User from "../models/User"
import { UserService } from "../services/user.service"
import { UserRepository } from "../repository/UserRepository"
import { ProfileRepository } from "../repository/ProfileRepository"
import { GeneralUtils } from "../utils/general"
import UserController from "../controllers/user.controller"
const router = express.Router()


const userRepo = new UserRepository()
const profileRepo = new ProfileRepository()
const userService = new UserService()
const general = new GeneralUtils
const userController = new UserController(userService, general)

router.post("/register", userController.createUser )
router.post("/login", userController.loginUser)




export default router