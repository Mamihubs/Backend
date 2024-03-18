import express from "express"
const router = express.Router();
import PaystackController from "../controllers/paystackController";


/**
 * @swagger
 * /api/paystack/save-paystack-info:
 *   post:
 *     tags: [Paystack]
 *     description: create new business account
 * 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: '#/components/schemas/PaystackBaseRequest'
 *                  
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                     type: boolean
 *                 message:
 *                     type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                 message:
 *                    type: string
 */
router.post("/save-paystack-info", PaystackController.savePaystackInfo);

export default router
