
import mongoose from "mongoose";
import { PromotionPlanDto, UpdatePromotionPlanDto } from "../dto/PromotionPlanDto"; 
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
    async updatePlan(promotionDto: UpdatePromotionPlanDto){
        try{
            const updatePlan = await PromotionPlan.updateOne({_id: promotionDto.id}, promotionDto.update)
            return updatePlan;
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
    async findPlanById(id:string){
        try{
            const fetchPlan = await PromotionPlan.findById({_id:id});
            return fetchPlan;
        }catch(error){
            console.error(error);
        }
    }
    async deletePlan(id:string){
        try{
            const deletePlan = await PromotionPlan.deleteOne({_id:id});
            return deletePlan;
        }catch(error){
            console.error(error);
        }
    }
}