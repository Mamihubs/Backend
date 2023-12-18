import express from 'express';
import promotionController from '../controllers/promotionController';
 


const route = express.Router();


route.post("/add", promotionController.createPromotion);
route.get("/all-promotions", promotionController.findAllPromotions);
route.delete("/delete-promo/:id", promotionController.deletePromotion);


export default route;