import express from "express"
import UserAuth from "../controllers/userController"
import walletController from "../controllers/walletController"

const router = express.Router()


router.post("/register", UserAuth.createUser )
router.post("/login", UserAuth.loginUser)
router.get("/getWallet/:userId", walletController.getUserWallets)
router.delete('/product/unlike/:productId', UserAuth.unLikedProduct);
router.post("/product/like", UserAuth.createLikedProduct);
router.post('/product/:userId', UserAuth.getLikedProduct);

export default router