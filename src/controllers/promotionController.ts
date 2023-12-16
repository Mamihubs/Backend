import { Request, Response } from "express";
import { PromotionService } from "../services/promotion.service";

class PromotionController{
    private promoService:PromotionService;

    constructor(){
        this.promoService = new PromotionService();
    }


    createPromotion = async(req:Request, res:Response) =>{
        try{
            const promotion = this.promoService.createPromotion({
                ...req.body
            });

            if(!promotion){
                return res.status(500).json({
                    status:false,
                    message:"An error occurred while creating promotion."
                })
            }

            return res.status(200).json({
                status:true,
                message:"Promotion created successfully."
            });
        }catch(e){
            return res.status(500).json({
                status:false,
                message:"Error creating promotion"
            })
        }
    }

    findAllPromotions = async(req: Request, res: Response) =>{
        try{
            const allpromotion = await this.promoService.findAllPromotion();

            if(!allpromotion){
                 return res.status(500).json({
                    status:false,
                    message:"An error occurred while fetching the promotion"
                 })
            }

            return res.status(200).json({
                status:true,
                data:allpromotion
            });
        }catch(e){
            return res.status(500).json({
                status:false,
                message: "An error occurred while fetching all promotion"
            })
        }
    }

    deletePromotion = async(req:Request, res:Response)=>{
        try{
            const promo = await this.promoService.deletePromotion({
                ...req.body
            });

            if(!promo){
                 return res.status(500).json({
                    status:false,
                    message:"An error occurred while deleting the promotion"
                 })
            }

            return res.status(200).json({
                status:true,
                message:"Promotion plan deleted successfully."
            });
        }catch(e){
            return res.status(500).json({
                status:false,
                message: "An error occurred while deleting promotion"
            })
        }
    }
}


export default new PromotionController();