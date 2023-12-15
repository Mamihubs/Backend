import mongoose from "mongoose";
import { PromotionDto } from "../dto/PromotionDto";
import Promotion from "../models/Promotion";

export class PromotionRepository{

    async createPromotion(promotionDto:PromotionDto){
        try{
            const promotion = await Promotion.create(promotionDto);
            return promotion;
        }catch(error){
            console.log(error);
        }
    }


    async findAllPromotions( ){
        try{
            const promotions = await Promotion.find();
            return promotions;
        }catch(error){
            console.log(error);
        }
    }
    async deletePromotion(id: mongoose.Types.ObjectId){
        try{
            return await Promotion.deleteOne({_id:id});
        }catch(error){
            console.log(error);
        }
    }
}