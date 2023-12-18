import express from 'express';
import promotionPlanController from '../controllers/promotionPlanController';


const route = express.Router();



route.post('/add', promotionPlanController.createPromoPlan);

route.get("/all-plans", promotionPlanController.findAllPromoPlan);
route.get("/get-plan/:id", promotionPlanController.findPromoPlanById);
route.put("/update-plan/:id", promotionPlanController.updatePromoPlan);
route.delete("/delete-plan/:id", promotionPlanController.deletePromoPlan);


export default route;