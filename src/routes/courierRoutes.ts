import express from "express";

const router = express.Router();

import CourierController from "../controllers/courierController";

/*
"get-destinations" endpoint is used to fetch origin and destination
which can be used to populate dropdowns in frontend 









*/

// router.get("/test", CourierController.gt3);
router.get("/get-destinations", CourierController.getCourierDestinations);
router.get("/get-shipping-fee", CourierController.getCourierShippingFee)
// router.get("/get-courier-token", CourierController.getCourierToken);
// router.post("/get-delivery-town", CourierController.getDeliveryTown);
// router.post("/get-onforwarding-town", CourierController.getOnforwardingTown);
// router.post("/testNewToken", CourierController.testGetNewToken)

export default router;
