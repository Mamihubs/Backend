import express from "express"
const router = express.Router();
import PaystackController from "../controllers/paystackController";



router.post("/save-paystack-info", PaystackController.savePaystackInfo);

export default router
