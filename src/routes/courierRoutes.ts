import express from "express";



const router = express.Router();

import CourierController from "../controllers/courierController";







router.post("/getDestinations", CourierController.getDestinations)
router.get("/getCourierToken", CourierController.getCourierToken);

export default router
