import express from 'express';
import walletController from '../controllers/walletController';


const router = express.Router();

/**
 * @swagger
 * /api/wallets/{userId}:
 *   get:
 *     tags: ['Wallet']
 *     description: Get user wallet
 *     parameters:
 *     - in: path
 *       name: userId
 *       required: true
 *       schema:
 *              type: string
 *       description: id of the order
 * 
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                    type: array
 *                    items:
 *                       $ref: '#/components/schemas/WalletResponse'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 message:
 *                   type: string
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
 *                   type: string
 */
router.get("/:userId", walletController.getUserWallets);


/**
 * @swagger
 * /api/wallets/get-wallet/{id}:
 *   get:
 *     tags: ['Wallet']
 *     description: Get a wallet details
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *              type: string
 *       description: id of the order
 * 
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                    $ref: '#/components/schemas/WalletResponse'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 message:
 *                   type: string
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
 *                   type: string
 */
router.get("/get-wallet/:id", walletController.getWalletById);

/**
 * @swagger
 * /api/wallets/fund:
 *   post:
 *     tags: [Wallet]
 *     description: Fund a wallet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: string
 *                 name:
 *                   type: string
 *                 amount:
 *                   type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                      status:
 *                          type: boolean
 *                      message:
 *                          type: string
 *                      data:
 *                          $ref: '#/components/schemas/WalletResponse'
 *       201:
 *         description: OK Created
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                      status:
 *                          type: boolean
 *                      message:
 *                          type: string
 *                      data:
 *                          $ref: '#/components/schemas/WalletResponse'
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
 *       401:
 *         description: Unauthenticated
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
router.post("/fund", walletController.fundUserWallet);


/**
 * @swagger
 * /api/wallets/deduct-fund:
 *   post:
 *     tags: [Wallet]
 *     description: Deduct a wallet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: string
 *                 name:
 *                   type: string
 *                 amount:
 *                   type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                      status:
 *                          type: boolean
 *                      message:
 *                          type: string
 *                      data:
 *                          $ref: '#/components/schemas/WalletResponse'
 *       201:
 *         description: OK Created
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                      status:
 *                          type: boolean
 *                      message:
 *                          type: string
 *                      data:
 *                          $ref: '#/components/schemas/WalletResponse'
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
 *       401:
 *         description: Unauthenticated
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
router.post("/deduct-fund", walletController.deductFund);




export default router;