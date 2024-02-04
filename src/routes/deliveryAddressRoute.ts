import { Router } from "express";
import deliveryAddressController from "../controllers/deliveryAddressController";
 

const deliveryAddressRouter = Router();

deliveryAddressRouter.post("/add", deliveryAddressController.createDeliveryAddress)
deliveryAddressRouter.get("/all/:id", deliveryAddressController.allDeliveryAddress)
deliveryAddressRouter.get("/:id", deliveryAddressController.fetchDeliveryAddress)
deliveryAddressRouter.put("/", deliveryAddressController.updateDeliveryAddress)
deliveryAddressRouter.delete("/:id", deliveryAddressController.deleteDeliveryAddress)


export default deliveryAddressRouter;