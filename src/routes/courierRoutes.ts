import express from "express";



const router = express.Router();

import CourierController from "../controllers/courierController";







router.get("/get-destinations", CourierController.getDestinations)
router.get("/get-courier-token", CourierController.getCourierToken)
router.post("/get-delivery-town", CourierController.getDeliveryTown)

export default router
