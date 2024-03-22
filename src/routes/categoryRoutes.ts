import express from "express";
const router = express.Router();
import AuthenticateUser from "../middlewares/authCheck";
import CategoryController from "../controllers/categoryController";

// create an auth route object

router.post(
  "/",
  AuthenticateUser.deserialToken,
  CategoryController.createCategories
);
// router.post("/", AuthenticateUser.deserialToken, CategoryController.createCategories);
router.get("/", CategoryController.getCategories);
router.get("/find/:id", CategoryController.getCategory);
router.get("/subcategories", CategoryController.getSubCategories);
router.put("/:id", CategoryController.updateCategories);
router.delete("/:id", CategoryController.deleteCategry);

export default router;
