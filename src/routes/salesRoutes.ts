import express from "express";
const router = express.Router();
import  SalesController from "../controllers/salesController";
import AuthenticateUser from "../middlewares/authCheck"
// router.post("/", SalesController.c);
router.get('/', SalesController.getSales);
router.get("/user",  AuthenticateUser.deserialToken, SalesController.getUserSales)
router.post('/delivery-status/:id', SalesController.getDeliveryStats);
router.post('/top-sales_product', SalesController.topProductSales);
router.post('/top-sales-categories', SalesController.topSellingCategories);
router.put("/:id", SalesController.updateSalesOrder);
router.delete("/:id", SalesController.deleteSales);

export default router;