import express from 'express';
import promotionPlanController from '../controllers/promotionPlanController';
import { cacheInterceptor } from '../interceptors';


const route = express.Router();



/**
 * @swagger
 * /api/promotion-plans/:
 *   post:
 *     tags: ['Promotion Plan']
 *     description: Create a promotion plan
 * 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                 plan_type:
 *                   type: string
 *                 duration:
 *                   type: number
 *                 amount:
 *                   type: number
 * 
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
 *                   $ref: '#/components/schemas/PromotionPlanResponse'
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
route.post('/', promotionPlanController.createPromoPlan);


/**
 * @swagger
 * /api/promotion-plans/:
 *   get:
 *     tags: ['Promotion Plan']
 *     description: Get all promotion plans
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
 *                      $ref: '#/components/schemas/PromotionPlanResponse'
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
route.get("/", cacheInterceptor, promotionPlanController.findAllPromoPlan);


/**
 * @swagger
 * /api/promotion-plans/{id}:
 *   get:
 *     tags: ['Promotion Plan']
 *     description: Get a promotion plan
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *              type: string
 *       description: id of the promotion plan to fetch
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
 *                   $ref: '#/components/schemas/PromotionPlanResponse'
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
route.get("/:id", cacheInterceptor, promotionPlanController.findPromoPlanById);

/**
 * @swagger
 * /api/promotion-plans/{id}:
 *   put:
 *     tags: ['Promotion Plan']
 *     description: Update a promotion plan
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *           type: string
 *       description: id of the promotion plan to fetch
 * 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                 plan_type:
 *                   type: string
 *                 duration:
 *                   type: number
 *                 amount:
 *                   type: number
 * 
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
 *                   $ref: '#/components/schemas/PromotionPlanResponse'
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
route.put("/:id", promotionPlanController.updatePromoPlan);


/**
 * @swagger
 * /api/promotion-plans/{id}:
 *   delete:
 *     tags: ['Promotion Plan']
 *     description: delete a promotion plan
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *           type: string
 *       description: id of the promotion plan to delete
 * 
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
route.delete("/promotion-plans/:id", promotionPlanController.deletePromoPlan);


export default route;