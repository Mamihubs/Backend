import express from "express"
const router = express.Router()
import ProductController from "../controllers/productController"

router.get('/get_products', ProductController.getAllProducts);
router.get('/:product_id', ProductController.getProductById);
router.get('/vendor/:vendorId', ProductController.getProductsByVendor);
router.patch('/update/:id', ProductController.updateProduct);
router.post('/create', ProductController.createProduct);
router.patch('/update_quantity', ProductController.updateQuantity);
router.delete('/delete-image', ProductController.removeImage);




export default router