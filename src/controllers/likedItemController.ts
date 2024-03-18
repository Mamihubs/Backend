import { Request, Response } from "express";
import { LikedItemRepository } from "../repository/LikedItemRepository";

class LikedItemController{

    private likedItemRepo: LikedItemRepository = new LikedItemRepository();



    fetchLikeItem = async(req:Request, res:Response)=>{
        try {
            const { id } = req.params;

        const allItem = await this.likedItemRepo.fetchAllItems(id);

        if(!allItem){
            return res.status(400).json({
                status:false,
                message:"You don't have any liked items"
            })
        }

        return res.status(200).json({
            status:true,
            data: allItem
        })

        } catch (error:any) {
            return res.status(400).json({
                status:false,
                message: error.message
            })
        }
    }
    createLikeItem = async(req:Request, res:Response)=>{
        try {
            const { user, product} = req.body;

        const createdItem = await this.likedItemRepo.createLike({user, product});

        if(!createdItem){
            return res.status(400).json({
                status:false,
                message:"Could not liked this product"
            })
        }

        return res.status(201).json({
            status:true,
            data:createdItem
        })

        } catch (error:any) {
            return res.status(400).json({
                status:false,
                message: error.message
            })
        }
    }


    removeLikeItem = async(req:Request, res:Response)=>{
        try {
            const { id } = req.body;

        const removeItem = await this.likedItemRepo.removeLike(id);

        if(!removeItem){
            return res.status(400).json({
                status:false,
                message:"Could not unliked this product"
            })
        }

        return res.status(200).json({
            status:true,
            message:"Unliked product successfully."
        })

        } catch (error:any) {
            return res.status(400).json({
                status:false,
                message: error.message
            })
        }
    }

    
}

export default new LikedItemController