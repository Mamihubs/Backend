import express from "express"
const router = express.Router()
import ProductController from "../controllers/productController"

// router.patch("/:email", ProfileController.updateUserProfile);
// router.get("/:email", ProfileController.getUserProfile);
// router.get("/all", ProfileController.getUsersProfile);
// router.delete("/:email", ProfileController.deleteUserProfile);

router.post("/create", ProductController.createProduct)
router.post("/update", ProductController.updateProduct)


export default router