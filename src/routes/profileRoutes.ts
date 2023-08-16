import express from "express"
const router = express.Router()
import ProfileController from "../controllers/profileController"

router.patch("/:email", ProfileController.updateUserProfile);
router.get("/:email", ProfileController.getUserProfile);
router.get("/all", ProfileController.getUsersProfile);
router.delete("/:email", ProfileController.deleteUserProfile);



export default router