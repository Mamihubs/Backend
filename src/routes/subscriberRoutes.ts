import express from "express"
import subscriberController from "../controllers/subscriberController"
import { cacheInterceptor } from "../interceptors";

const router = express.Router();

/**
 * @swagger
 * /api/subscribers/:
 *   post:
 *     tags: [Subscribers]
 *     description: Insert a new email subscriber
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSubscriberRequest'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubscriberResponse'
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
router.post("/", subscriberController.createSubscriber)


/**
 * @swagger
 * /api/subscribers/{id}:
 *   delete:
 *     tags: [Subscribers]
 *     description: Delete a subscriber
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *              type: string
 *       description: ID or Email of the subscriber to be deleted
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
 *                 data:
 *                   $ref: '#/components/schemas/SubscriberResponse'
 *                         
 *       400:
 *         description: Invalid user input
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
 *                 message:
 *                   type: string
 *                 status:
 *                   type: boolean
 */
router.delete('/:id', subscriberController.deleteSubscriber);

/**
 * @swagger
 * /api/subscribers:
 *   get:
 *     tags: [Subscribers]
 *     description: Get all subscribers
 *     parameters:
 *       - in: query
 *         name: pageSize
 *         required: true
 *         schema:
 *              type: integer
 *              minimum: 1
 *              default: 10
 *       - in: query
 *         name: pageNumber
 *         required: true
 *         schema:
 *              type: integer
 *              minimum: 1
 *              default: 1
 *         description: Page number
 *       - in: query
 *         name: sortBy
 *         schema:
 *              type: string
 *              default: createdAt:-1,email:-1
 *         description: Sort the result. e.g createdAt:-1 in desc or email:1 in asc
 * 
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
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ProductResponse'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/', cacheInterceptor, subscriberController.getAllSubscribers);

export default router
