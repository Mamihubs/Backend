import { PromotionPlanDto } from "../dto/PromotionPlanDto";
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
}