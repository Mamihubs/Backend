import express from 'express';
import promotionPlanController from '../controllers/promotionPlanController';


const route = express.Router();



/**
 * @swagger
 * /api/promotion-plans/add:
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
route.post('/add', promotionPlanController.createPromoPlan);


/**
 * @swagger
 * /api/promotion-plans/all-plans:
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
route.get("/all-plans", promotionPlanController.findAllPromoPlan);


/**
 * @swagger
 * /api/promotion-plans/get-plan/{id}:
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
route.get("/get-plan/:id", promotionPlanController.findPromoPlanById);

/**
 * @swagger
 * /api/update-plan/{id}:
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
route.put("/update-plan/:id", promotionPlanController.updatePromoPlan);


/**
 * @swagger
 * /api/delete-plan/{id}:
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
route.delete("/delete-plan/:id", promotionPlanController.deletePromoPlan);


export default route;