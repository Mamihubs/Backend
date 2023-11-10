import express from 'express';
import notificationController from '../controllers/notificationController'

const router = express.Router();


router.get('/:id', notificationController.getNotification) //Get all notifications for a user: id is the ID of the user
router.get('/view/:id', notificationController.getOneNotification) //Get Notification by id
router.post('/', notificationController.createNotification)
router.patch('/:id', notificationController.updateNotification)



export default router;