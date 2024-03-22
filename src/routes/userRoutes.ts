import express from "express"
import UserAuth from "../controllers/userController"
import walletController from "../controllers/walletController"
import { cacheInterceptor } from "../interceptors"
import expressRateLimiter from "../middlewares/expressRateLimiter"

const router = express.Router()

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     tags: [User]
 *     description: register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequestBody'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserResponse'
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
router.post("/register", expressRateLimiter(), UserAuth.createUser)

/**
 * @swagger
 * /api/users/vendor-register:
 *   post:
 *     tags: [User]
 *     description: Create a new vendor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateVendorRequestBody'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateVendorResponse'
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
router.post("/vendor-register", expressRateLimiter(), UserAuth.createVendor)

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags: [User]
 *     description: Log in user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUserRequestBody'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginUserResponse'
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
router.post("/login", expressRateLimiter(), UserAuth.loginUser)

/**
 * @swagger
 * 
 * /api/users/{userId}/wallets:
 *   get:
 *     tags: [User]
 *     description: Get user wallets
 *     parameters:
 *        - in: path
 *          name: userId
 *          required: true
 *          schema:
 *              type: string
 *          description: ID of the user whose wallet information is to be retrieved
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
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.get("/:userId/wallets", cacheInterceptor, walletController.getUserWallets)
 

export default router