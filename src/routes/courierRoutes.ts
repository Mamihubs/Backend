import express from "express";



const router = express.Router();

import CourierController from "../controllers/courierController";







router.post("/get-destinations", CourierController.getDestinations)
router.get("/get-courier-token", CourierController.getCourierToken);

export default router
