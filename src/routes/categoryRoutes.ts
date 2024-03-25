import express from "express";
const router = express.Router();
import AuthenticateUser from "../middlewares/authCheck"
import  CategoryController from "../controllers/categoryController";
import { cacheInterceptor } from "../interceptors";


/**
 * @swagger
 * /api/categories:
 *   post:
 *     tags: [Categories]
 *     description: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategoryRequestBody'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateCategoryResponse'
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
router.post("/", AuthenticateUser.deserialToken, CategoryController.createCategories);

/**
 * @swagger
 * /api/categories/:
 *   get:
 *     tags: [Categories]
 *     description: Get categories data
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriesResponse'
 */
router.get('/', cacheInterceptor, CategoryController.getCategories);

/**
 * @swagger
 * /api/categories/{categoryId}/subcategories/:
 *   get:
 *     tags: [Categories]
 *     description: Get subcategories data
 *     parameters:
 *     - in: path
 *       name: categoryId
 *       required: true
 *       schema:
 *              type: string
 *       description: ID of the Categories to retrieve its subcategories
 *        
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriesResponse'
 */
router.get('/categories/:categoryId/subcategories', cacheInterceptor, CategoryController.getSubCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     tags: [Categories]
 *     description: Get categories data
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *              type: string
 *       description: ID of the category to be retrieved
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategoryRequestBody' 
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/updateCategoryResponse'
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
router.put("/:id", CategoryController.updateCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     tags: [Categories]
 *     description: Get categories data
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *              type: string
 *       description: ID of the category to be deleted
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
router.delete("/:id", CategoryController.deleteCategry);

export default router;
