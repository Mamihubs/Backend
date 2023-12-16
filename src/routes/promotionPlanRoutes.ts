import express from 'express';
import promotionPlanController from '../controllers/promotionPlanController';


const route = express.Router();



route.post('/add', promotionPlanController.createPromoPlan);

route.get("/all-plans", promotionPlanController.findAllPromoPlan);


export default route;