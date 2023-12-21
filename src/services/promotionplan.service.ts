import mongoose, { mongo } from "mongoose";
import { PromotionPlanDto, UpdatePromotionPlanDto } from "../dto/PromotionPlanDto";
import { PromotionPlanRepository } from "../repository/PromotionPlanRepository";

export class PromotionPlanService{
    private promotionPlanRepo: PromotionPlanRepository;
    constructor(){
        this.promotionPlanRepo = new PromotionPlanRepository();
    }

    async createPromoPlan(promoPlanDto: PromotionPlanDto){
        return await this.promotionPlanRepo.createPlan(promoPlanDto);
    }

    async findAllPromoPlan(){
        return await this.promotionPlanRepo.findPlan();
    }
    async updatePromoPlan(updatePlan: UpdatePromotionPlanDto){
        return await this.promotionPlanRepo.updatePlan(updatePlan);
    }
    async findPromoPlanById(id:string){
        return await this.promotionPlanRepo.findPlanById(id);
    }
    async deletePlan(id:string){
        return await this.promotionPlanRepo.deletePlan(id);
    }
}