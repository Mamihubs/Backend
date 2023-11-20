import { Request, Response } from "express";
import mongoose from "mongoose";
// import { Cart } from "../models new/Cart";
import cartModel from "../models new/Cart";




export class CartController{



  getCartData = async (req: Request, res: Response) => {
    let userId = req.user;


    const userCartData = await cartModel.findOne({_id: userId})
    if(userCartData){
     return res.status(200).json({
        error: false,
        message: "user cart data gotten successfully",
        data: userCartData
      })
    }

    if(!userCartData){
      return res.status(200).json({
        error: true,
        message: "user has no cart data"
      })

    }

  }

  cartUpdater = async(req: Request, res: Response) => {

    let userId = req.user;


    let {cartData} = req.body;
    if(!cartData){
      return res.status(400).json({
        error: true,
        message: "empty cart data. Nothing to update"
      })

    }


    

    try {
      let userCartData = await cartModel.findOne({ _id: userId})
      if(userCartData){
        userCartData.cart = cartData;

        let updatedCartData = 
      }
      


      
    } catch (error) {
      
    }

  }


  cartQuantityUpdater = async(req: Request, res: Response) => {

  }

}
export default new CartController






