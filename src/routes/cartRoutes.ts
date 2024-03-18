import express from "express";
const router = express.Router();
import CartController from "../controllers/cartController";
import AuthenticateUser from "../middlewares/authCheck"


/**
 * @swagger
 * /api/auth/update-cart:
 *   post:
 *     tags: [Cart]
 *     description: Update cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartData:
 *                 type: array
 *                 properties:
 *                   items: 
 *                      type: object
 *                 description: An Array object of products
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request, missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.post("/update-cart", AuthenticateUser.deserialToken, CartController.cartUpdater);

/**
 * @swagger
 * /api/admin/get-cart:
 *   get:
 *     tags: [Cart]
 *     description: Get user cart
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
*              schema:
 *               type: object
 *               properties:
 *                 cart:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID of the item
 *                       name:
 *                         type: string
 *                         description: Name of the item
 *                       price:
 *                         type: number
 *                         description: Price of the item
 *                       quantity:
 *                         type: integer
 *                         description: Quantity of the item in the cart
 */
router.get("/get-cart", AuthenticateUser.deserialToken, CartController.getCartData)


export default router


