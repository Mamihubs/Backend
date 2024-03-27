import express from "express"
const router = express.Router()
import ProductController from "../controllers/productController"
import { cacheInterceptor } from "../interceptors";

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags: [Products]
 *     description: Get all products
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
 *              default: 10
 *         description: Page number
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
router.get('/', cacheInterceptor, ProductController.getAllProducts);

/**
 * @swagger
 * /api/products/${id}:
 *   get:
 *     tags: [Products]
 *     description: Get a single product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *              type: string
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
 *                   $ref: '#/components/schemas/ProductResponse'
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
 *                 message:
 *                   type: string
 *                 status:
 *                   type: boolean
 */
router.get('/:id', cacheInterceptor, ProductController.getProductById);


/**
 * @swagger
 * /api/products/vendor/{vendorId}:
 *   get:
 *     tags: [Products]
 *     description: Get all vendor products
 *     parameters:
 *       - in: path
 *         name: vendorId
 *         required: true
 *         schema:
 *              type: string
 *          
 *       - in: query
 *         name: pageSize
 *         required: true
 *         schema:
 *              type: integer
 *              minimum: 1
 *              default: 10
 * 
 *       - in: query
 *         name: pageNumber
 *         required: true
 *         schema:
 *              type: integer
 *              minimum: 1
 *              default: 10
 *         description: Page number
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
router.get('/vendor/:vendorId', cacheInterceptor, ProductController.getProductsByVendor);

/**
 * @swagger
 * /api/products/update/{id}:
 *   patch:
 *     tags: [Products]
 *     description: Update a single product
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *              type: string
 *       description: ID of the product to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BaseProductRequest'
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
 *                     $ref: '#/components/schemas/ProductResponse'
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
router.patch('/update/:id', ProductController.updateProduct);

/**
 * @swagger
 * /api/products/create:
 *   post:
 *     tags: [Products]
 *     description: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BaseProductRequest'
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
 *                     $ref: '#/components/schemas/ProductResponse'
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
router.post('/create', ProductController.createProduct);

/**
 * @swagger
 * /api/products/update_quantity/{id}:
 *   patch:
 *     tags: [Products]
 *     description: Update a single product's quantity
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *              type: string
 *       description: ID of the product to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                 product_id:
 *                   type: string
 *                 variation_id:
 *                   type: string
 *                 quantity:
 *                   type: number
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product_id:
 *                   type: string
 *                 variation_id:
 *                   type: string
 *                 quantity:
 *                   type: number
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
router.patch('/update_quantity', ProductController.updateQuantity);

/**
 * @swagger
 * /api/products/delete-image/{id}:
 *   delete:
 *     tags: [Products]
 *     description: Delete a product's image
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *              type: string
 *       description: ID of the product's image to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                 product_id:
 *                   type: string
 *                 image:
 *                   type: string
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
 *                   $ref: '#/components/schemas/ProductResponse'
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
router.delete('/delete-image', ProductController.removeImage);

/**
 * @swagger
 * /api/products/search:
 *   get:
 *     tags: [Products]
 *     description: Search all products
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
 *              default: 10
 *         description: Page number
 *       - in: query
 *         name: searchQuery
 *         required: true
 *         schema:
 *              type: string
 *         description: search query
 *       - in: query
 *         name: filters
 *         schema:
 *              type: string
 *         description: additional filters
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
router.get('/search', cacheInterceptor, ProductController.getSearchProducts);



export default router