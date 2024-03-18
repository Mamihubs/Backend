import express from "express";
import adminController from "../controllers/adminController";
const router = express.Router();

/**
 * @swagger
 * /api/admin/:
 *   get:
 *     tags: [Admin]
 *     description: Get admin dashboard data
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminDashboardResponse'
 */
router.get("/", adminController.getDashboard);
/**
 * @swagger
 * /api/admin/analytics:
 *   get:
 *     tags: [Admin]
 *     description: Get analytics data
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminDashboardResponse'
 */
router.get("/analytics", adminController.getAnalytics);
/**
 * @swagger
 * /api/admin/products:
 *   get:
 *     tags: [Admin]
 *     description: Get products data
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminProductsResponse'
 */
router.get("/products", adminController.getProducts);
/**
 * @swagger
 * /api/admin/vendor-details/{id}:
 *   get:
 *     tags: [Admin]
 *     description: Get products data
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *              type: string
 *       description: ID of the vendor to be retrieved
 *        
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminVendorDetailsResponse'
 */
router.get("/vendor-details/:id", adminController.getAllVendorDetails);

/**
 * @swagger
 * /api/admin/vendors:
 *   get:
 *     tags: [Admin]
 *     description: Get vendors data
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminVendorsResponse'
 */
router.get("/vendors", adminController.getVendors);

/**
 * @swagger
 * /api/admin/customers:
 *   get:
 *     tags: [Admin]
 *     description: Get customers data
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminCustomersResponse'
 */
router.get("/customers", adminController.getCustomers);

/**
 * @swagger
 * /api/admin/orders:
 *   get:
 *     tags: [Admin]
 *     description: Get orders data
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminOrdersResponse'
 */
router.get("/orders", adminController.getOrders);

/**
 * @swagger
 * /api/admin/integration:
 *   get:
 *     tags: [Admin]
 *     description: Get integration data
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminIntegrationResponse'
 */
router.get("/integration", adminController.getIntegration);

/**
 * @swagger
 * /api/admin/settings:
 *   get:
 *     tags: [Admin]
 *     description: Get settings data
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminSettingsResponse'
 */
router.get("/settings", adminController.getSettings);

/**
 * @swagger
 * /api/admin/add-vendor:
 *   post:
 *     tags: [Admin]
 *     description: Create a new vendor
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
router.post("/add-vendor", adminController.addVendor);

/**
 * @swagger
 * /api/admin/vendor/{id}:
 *   get:
 *     tags: [Admin]
 *     description: Get single vendor data
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *              type: string
 *       description: ID of the vendor to be retrieved
 *        
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminVendorDataResponse'
 */
router.get("/vendor/:id", adminController.getVendorId);

/**
 * @swagger
 * /api/admin/account-update/{id}:
 *   patch:
 *     tags: [Admin]
 *     description: Get single vendor data
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *              type: string
 *       description: ID of the vendor to be retrieved
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
 *               $ref: '#/components/schemas/UpdateUserResponse'
 */
router.patch("/account-update/:id", adminController.updateAccount);

/**
 * @swagger
 * /api/admin/order/{id}:
 *   get:
 *     tags: [Admin]
 *     description: Get order data
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *              type: string
 *       description: ID of the order to be retrieved
 *        
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SingleOrderResponse'
 */
router.get("/order/:id", adminController.getOrder);

/**
 * @swagger
 * /api/admin/transaction/{id}:
 *   get:
 *     tags: [Admin]
 *     description: Get transaction data
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *              type: string
 *       description: ID of the transaction to be retrieved
 *        
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SingleOrderResponse'
 */
router.get("/transaction/:id", adminController.getTransaction);

/**
 * @swagger
 * /api/admin/product/{id}:
 *   get:
 *     tags: [Admin]
 *     description: Get product data
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *              type: string
 *       description: ID of the product to be retrieved
 *        
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SingleProductResponse'
 */
router.get("/product/:id", adminController.getProduct);

export default router;
