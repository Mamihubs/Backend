import express from "express"
import {createUser, loginUser} from "../controllers/userController"
import walletController from "../controllers/walletController"
const router = express.Router()


router.post("/register", createUser )
router.post("/login", loginUser)
router.get("/getWallet/:userId",walletController.getUserWallets)



export default router