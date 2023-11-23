import express from "express"
import UserAuth from "../controllers/userController"
import walletController from "../controllers/walletController"

const router = express.Router()


router.post("/register", UserAuth.createUser)
router.post("/vendor-register", UserAuth.createVendor)
router.post("/login", UserAuth.loginUser)
router.get("/getWallet/:userId",walletController.getUserWallets)
 

export default router