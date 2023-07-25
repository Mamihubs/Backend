import express from "express"
import User from "../models/User"
import { UserService } from "../services/user.service"
import {createUser, loginUser} from "../controllers/userController"
import { UserRepository } from "../repository/UserRepository"
import { ProfileRepository } from "../repository/ProfileRepository"
import { GeneralUtils } from "../utils/general"
const router = express.Router()


// const userRepo = new UserRepository()
// const profileRepo = new ProfileRepository()
// const userService = new UserService(userRepo, profileRepo)
// const general = new GeneralUtils
// const userController = new UserController(userService, general)

router.post("/register", createUser )
router.post("/login", loginUser)




export default router