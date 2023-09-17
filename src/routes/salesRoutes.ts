import express from "express";
const router = express.Router();
import  SalesController from "../controllers/salesController";

// router.post("/", SalesController.c);
router.get('/', SalesController.getSales);
router.get("/user", SalesController.getUserSales)
router.post('/delivery-status', SalesController.getDeliveryStats);
router.put("/:id", SalesController.updateSalesOrder);
router.delete("/:id", SalesController.deleteSales);

export default router;