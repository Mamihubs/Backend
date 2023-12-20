import express from 'express';
import walletController from '../controllers/walletController';


const router = express.Router();

router.get("/:userid", walletController.getUserWallets);
router.get("/get-wallet/:id", walletController.getWalletById);

router.post("/fund", walletController.fundUserWallet);
router.post("/deduct-fund", walletController.deductFund);




export default router;