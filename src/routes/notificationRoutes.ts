import express from 'express';
import notificationController from '../controllers/notificationController'
import { cacheInterceptor } from '../interceptors';

const router = express.Router();

/**
 * @swagger
 * /api/notifications/users/${id}:
 *   get:
 *     tags: [Notification]
 *     description: Get a user's notfications
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *              type: string
 *       description: ID of the user to retrive notifications
 *        
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                   $ref: '#/components/schemas/NotificationResponse'
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
router.get('/users/:id', cacheInterceptor, notificationController.getNotification) //Get all notifications for a user: id is the ID of the user


/**
 * @swagger
 * /api/notifications/{id}:
 *   get:
 *     tags: [Notification]
 *     description: View notification details
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *              type: string
 *       description: ID of the notification to be viewed
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/NotificationResponse'
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
router.get('/:id', cacheInterceptor, notificationController.getOneNotification) //Get Notification by id

/**
 * @swagger
 * /api/notifications/:
 *   post:
 *     tags: [Notification]
 *     description: Create new notification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              user: 
 *                type: string
 *              status: 
 *                type: string
 *              message: 
 *                type: string
 *              
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/NotificationResponse'
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
router.post('/', notificationController.createNotification)

/**
 * @swagger
 * /api/notifications/{id}:
 *   patch:
 *     tags: [Notification]
 *     description: Update notification
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *              type: string
 *       description: ID of the notification to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              user: 
 *                type: string
 *              message: 
 *                type: string
 *              status: 
 *                type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                      data:
 *                          $ref: '#/components/schemas/LocationResponse'
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
router.patch('/:id', notificationController.updateNotification)



export default router;