import express from "express";
const router = express.Router();
import  CategoryController from "../controllers/categoryController";

router.post("/", CategoryController.createCategories);
router.get('/', CategoryController.getCategories);
router.get('/subcategories', CategoryController.getSubCategories);
router.put("/:id", CategoryController.updateCategories);
router.delete("/:id", CategoryController.deleteCategry);

export default router;