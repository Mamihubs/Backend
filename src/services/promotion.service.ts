import mongoose from "mongoose";
import { PromotionDto } from "../dto/PromotionDto";
import { PromotionRepository } from "../repository/PromotionRepository";

export class PromotionService{
    private promotionRepo: PromotionRepository;
    constructor(){
        this.promotionRepo = new PromotionRepository();
    }


    async createPromotion(promoDto:PromotionDto){
        return await this.promotionRepo.createPromotion(promoDto);
    }
    async findAllPromotion(){
        return await this.promotionRepo.findAllPromotions();
    }

    async deletePromotion(promo_id: mongoose.Types.ObjectId){
        return await this.promotionRepo.deletePromotion(promo_id);
    }
}