import express from 'express'
import adminController from '../controllers/adminController';
const router = express.Router();


router.get('/', adminController.getDashboard)
router.get('/analytics', adminController.getAnalytics)
router.get('/products', adminController.getProducts)
router.get('/vendor-details/:id', adminController.getAllVendorDetails)
router.get('/vendors', adminController.getVendors)
router.get('/customers', adminController.getCustomers)
router.get('/orders', adminController.getOrders)
router.get('/integration', adminController.getIntegration)
router.get('/settings', adminController.getSettings)

router.post('/add-vendor',adminController.addVendor)
router.get('/vendor/:id',adminController.getVendorId)

// update account
router.patch('/account-update/:id', adminController.updateAccount);

router.get("/order/:id", adminController.getOrder);

router.get("/transaction/:id", adminController.getTransaction);
router.get("/product/:id", adminController.getProduct);




export default router;