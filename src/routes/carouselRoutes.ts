import express from "express";
const router = express.Router();
import AuthenticateUser from "../middlewares/authCheck"
import  CaroController from "../controllers/caroController";

router.post("/", AuthenticateUser.deserialToken, CaroController.createCarousel);
router.get('/',  CaroController.getCarousel);
router.delete("/:id", CaroController.deleteCarousel);

export default router;