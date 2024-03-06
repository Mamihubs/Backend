import express from "express";
const router = express.Router();
import SalesController from "../controllers/salesController";

// router.post("/", SalesController.c);
router.get("/", SalesController.getSales);
router.get("/user", SalesController.getUserSales);
router.post("/delivery-status", SalesController.getDeliveryStats);
router.post("/top-sales_product", SalesController.topProductSales);
router.post("/top-sales-categories", SalesController.topSellingCategories);
router.put("/:id", SalesController.updateSalesOrder);
router.delete("/:id", SalesController.deleteSales);
router.get("/stats", SalesController.getMonthlySales);

export default router;
