import { Request, Response } from "express";
import { PromotionPlanRepository } from "../repository/PromotionPlanRepository";
import { PromotionPlanService } from "../services/promotionplan.service";
import { UpdateProductDto } from "../dto/ProductDto";
import { UpdatePromotionPlanDto } from "../dto/PromotionPlanDto";

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
        findPromoPlanById = async(req:Request, res:Response) =>{
            try{
                const {id} = req.params;
                const promo = await this.promoService.findPromoPlanById(id);
                return res.status(200).json({
                    status:true,
                   data:promo
                })
            }catch(e){
                return res.status(500).json({
                    status:false,
                    message: "An error occurred while fetching the promotions"
                });
            }
        }

        updatePromoPlan = async(req:Request, res:Response) =>{
            try{
                const {id} = req.params;
                const updatePromo: UpdatePromotionPlanDto = {
                    id,
                    update:{...req.body}
                }                
                const promo = await this.promoService.updatePromoPlan(updatePromo);
               
                if(!promo){
                    return res.status(200).json({
                        status:true,
                       message:"Plan could not updated."
                    })
                }
                return res.status(200).json({
                    status:true,
                    data:promo,
                   message:"Plan updated successfully."
                })
            }catch(e){
                return res.status(500).json({
                    status:false,
                    message: "An error occurred while updating the promotions"
                });
            }
        }

        deletePromoPlan = async(req:Request, res:Response) =>{
            try{
                const {id} = req.params;
                const promo = await this.promoService.deletePlan(id);
               if(!promo){
                return res.status(200).json({
                    status:false,
                   message:"Promo plan could not be deleted."
                })
               }
               return res.status(200).json({
                status:true,
               message:"Promo plan could be deleted successfully."
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