import express from "express";
const router = express.Router();
import CartController from "../controllers/cartController";




router.post("/cart-update", CartController.cartUpdater);
router.post("/get-cart", CartController.cartQuantityUpdater )


export default router


