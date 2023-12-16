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
            const promotions = await Promotion.aggregate([{
                $lookup:{
                    from: "promotionplans",
                    localField:"plan_type",
                    foreignField:"_id",
                    as: "plan"
                }
            },
            {
                $lookup:{
                    from: "users",
                    localField:"user",
                    foreignField:"_id",
                    as: "user"
                }
            },
            {
                $lookup:{
                    from: "products",
                    localField:"product",
                    foreignField:"_id",
                    as: "product"
                }
            }]);
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