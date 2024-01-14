import express from "express";
const router = express.Router();
import CartController from "../controllers/cartController";
import AuthenticateUser from "../middlewares/authCheck"




router.post("/update-cart", AuthenticateUser.deserialToken, CartController.cartUpdater);
router.get("/get-cart", CartController.getCartData)


export default router


