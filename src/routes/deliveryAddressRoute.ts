import { Router } from "express";
import deliveryAddressController from "../controllers/deliveryAddressController";
import { cacheInterceptor } from "../interceptors";
 

const deliveryAddressRouter = Router();

/**
 * @swagger
 * /api/delivery-address:
 *   post:
 *     tags: [DeliveryAddress]
 *     description: Add a new address
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddAddressRequestBody'
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
 *                   $ref: '#/components/schemas/AddressResponse'
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
deliveryAddressRouter.post("/add", deliveryAddressController.createDeliveryAddress)

/**
 * @swagger
 * /api/delivery-address/{userId}/all:
 *   get:
 *     tags: [DeliveryAddress]
 *     description: Get a user all addresses
 *     parameters:
 *     - in: path
 *       name: userId
 *       required: true
 *       schema:
 *              type: string
 *       description: ID of the user to retrieve addresses
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
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/AddressResponse'
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
 */
deliveryAddressRouter.get("/all/:id", cacheInterceptor, deliveryAddressController.allDeliveryAddress)

/**
 * @swagger
 * /api/delivery-address/{id}:
 *   get:
 *     tags: [DeliveryAddress]
 *     description: Get an address
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *              type: string
 *       description: ID of the address to be retrieved
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
 *                 data:
 *                   $ref: '#/components/schemas/AddressResponse'
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
 */
deliveryAddressRouter.get("/:id", cacheInterceptor, deliveryAddressController.fetchDeliveryAddress)


/**
 * @swagger
 * /api/delivery-address/{id}:
 *   put:
 *     tags: [DeliveryAddress]
 *     description: Update delivery address
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *              type: string
 *       description: ID of the address to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddAddressRequestBody' 
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
 *                          $ref: '#/components/schemas/AddressResponse'
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
deliveryAddressRouter.put("/:id", deliveryAddressController.updateDeliveryAddress)

/**
 * @swagger
 * /api/delivery-address/{id}:
 *   delete:
 *     tags: [DeliveryAddress]
 *     description: Delete a delivery address
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *              type: string
 *       description: ID of the address to be deleted
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
 */
deliveryAddressRouter.delete("/:id", deliveryAddressController.deleteDeliveryAddress)


export default deliveryAddressRouter;