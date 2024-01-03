import express from "express";
const router = express.Router();
import CartController from "../controllers/cartController";




router.post("/update-cart", CartController.cartUpdater);
router.get("/get-cart", CartController.getCartData )


export default router


