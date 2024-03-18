import { NextFunction, Request, Response, Router } from "express";
import { DeliveryAddressRepository } from "../repository/DeliveryAddressRepository";
import { DeliveryAddressUpdateDto } from "../dto/DeliveryAddressDto";
import { UpdateWriteOpResult } from "mongoose";

 
 class DeliveryAddressController{
    private deliveryAddress:DeliveryAddressRepository = new DeliveryAddressRepository();
 
    createDeliveryAddress = async(req:Request, res:Response, next:NextFunction)=>{
        try {
             
            const deliverData = await this.deliveryAddress.createDeliveryAddress({...req.body});

            if(!deliverData){
                return res.status(400).json({
                    status:false,
                    message: "Delivery address could not save."
                })
            }

            return res.status(201).json({
                status:true,
                message:"Delivery address save successfully.",
                data:deliverData
            })
        } catch (error:any) {
            return res.status(400).json({
                status:false,
                message:error.message
            })
        }
    }

   fetchDeliveryAddress = async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const {id} = req.params

        const deliveryData = await this.deliveryAddress.fetchDeliveryAddress(id);
        return res.status(200).json({
            status:true,
            data: deliveryData
        })
    } catch (error:any) {
        return res.status(400).json({
            status:false,
            message:error.message
        })
    }
   }
   allDeliveryAddress = async(req:Request, res:Response, next:NextFunction)=>{
    try {
        
        const {id} = req.params
        const deliveryData = await this.deliveryAddress.allDeliveryAddress(id);
        return res.status(200).json({
            status:true,
            data: deliveryData
        })
    } catch (error:any) {
        return res.status(400).json({
            status:false,
            message:error.message
        })
    }
   }

   updateDeliveryAddress = async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const { id } = req.body;
      

        const updateDeliveryAddress:UpdateWriteOpResult | undefined = await this.deliveryAddress.updateDeliveryAddress({id, update:{...req.body}});

        

        return res.status(200).json({
            status:true,
            message: "Delivery address updated",
            data: updateDeliveryAddress
        })
    } catch (error:any) {
        return res.status(400).json({
            status:false,
            message:error.message
        })
    }
   }

   deleteDeliveryAddress = async(req:Request, res:Response) =>{
    try {
        const {id} = req.body
        const deliveryAddress = await this.deliveryAddress.deleteDeliveryAddress(id)
        if (!deliveryAddress){
            return res.status(400).json({
                status:false,
                message: "Could not delete delivery"
            })
        }

        return res.status(200).json({
            status:true,
            message: "Successfully deleted delivery"
        })
    } catch (error:any) {
        return res.status(400).json({
            status:false,
            message:error.message
        })
    }
   }

}

export default new DeliveryAddressController;