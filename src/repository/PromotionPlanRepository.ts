
import { PromotionPlanDto } from "../dto/PromotionPlanDto"; 
import PromotionPlanModel from "../models/PromotionPlan";
import PromotionPlan from "../models/PromotionPlan";

export class PromotionPlanRepository{


    async createPlan(promotionDto: PromotionPlanDto){
        try{
            const newPlan = await PromotionPlan.create(promotionDto)
            return newPlan;
        }catch(error){
            console.error(error);
        }
    }
    async findPlan(){
        try{
            const fetchPlans = await PromotionPlan.find();
            return fetchPlans;
        }catch(error){
            console.error(error);
        }
    }
}