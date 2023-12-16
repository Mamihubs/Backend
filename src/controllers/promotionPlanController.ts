import { Request, Response } from "express";
import { PromotionPlanRepository } from "../repository/PromotionPlanRepository";
import { PromotionPlanService } from "../services/promotionplan.service";

class PromotionPlanController{
        private promoService: PromotionPlanService;
        constructor(){
            this.promoService = new PromotionPlanService();
        }


        createPromoPlan = async(req:Request, res:Response) => {
            try{
              const newPromo = await this.promoService.createPromoPlan({
                    ...req.body
                });

                if (!newPromo) {
                    return res.status(500).json({
                      status: false,
                      message: "Something went wrong while creating the promotion",
                    });
                  }
            
                  return res.status(200).json({
                    status: true,
                    message: "Promotion plan created successfully",
                    data: newPromo,
                  });

            }catch(e){
                return res.status(500).json({
                    status: false,
                    message: "An error occurred while creating the promo: ",
                  });
            }
        }

        findAllPromoPlan = async(req:Request, res:Response) =>{
            try{
                const allPromotions = await this.promoService.findAllPromoPlan();
                return res.status(200).json({
                    status:true,
                   data:allPromotions
                })
            }catch(e){
                return res.status(500).json({
                    status:false,
                    message: "An error occurred while fetching the promotions"
                });
            }
        }

        
}

export default new PromotionPlanController();