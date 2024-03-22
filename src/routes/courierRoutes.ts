import express from "express";

const router = express.Router();

import CourierController from "../controllers/courierController";
import { cacheInterceptor } from "../interceptors";

/*
"get-destinations" endpoint is used to fetch origin and destination
which can be used to populate dropdowns in frontend 









*/

// router.get("/test", CourierController.gt3);


/**
 * @swagger
 * /api/couriers/get-destinations:
 *   get:
 *     tags: ['Courier']
 *     description: Get courier destinations
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
router.get("/get-destinations", cacheInterceptor, CourierController.getCourierDestinations);
// router.get("/get-courier-token", CourierController.getCourierToken);
// router.post("/get-delivery-town", CourierController.getDeliveryTown);
// router.post("/get-onforwarding-town", CourierController.getOnforwardingTown);
// router.post("/testNewToken", CourierController.testGetNewToken)

export default router;
