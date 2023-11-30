import { Request, Response } from "express";
import mongoose from "mongoose";
// import { Cart } from "../models new/Cart";
import cartModel from "../models new/Cart";




export class CartController{



  getCartData = async (req: Request, res: Response) => {
    console.log("getting user cart data...")
    // let userId = req.user;
    let userId = "655adcb6a18189d438dcb111";



    const userCartData = await cartModel.findOne({userId})
    if(userCartData){
      console.log("user cart data gotten successfuly.")
     return res.status(200).json({
        error: false,
        message: "user cart data gotten successfully",
        data: userCartData.cart
      })
    }

    if(!userCartData){
      console.log("user has no cart data")
      return res.status(200).json({
        error: true,
        message: "user has no cart data"
      })

    }

  }

  cartUpdater = async(req: Request, res: Response) => {

    // let userId = req.user;
    console.log("here at the moment")
    let userId = "655adcb6a18189d438dcb111"
    console.log("attempting to update user cart data...");


    let {cartData} = req.body;
    if(!cartData){
      console.log("empty cart data. Nothing to update")
      return res.status(400).json({
        error: true,
        message: "empty cart data. Nothing to update"
      })

    }


    

    try {

      let userCartData = await cartModel.findOne({ userId});
      // console.log(userCartData);

      if(!userCartData){

        try {
           const createUserCartData = await cartModel.create({
          userId, cart: cartData
        })

        if(createUserCartData){
          return res.status(200).json({
            error: false,
            message: "cart data saved successfully"
          })
        }

          
        } catch (error) {
          console.log(error)
          console.log("error updating first time cart data");
          return res.status(400).json({
            error: true,
            message: "error saving user cart data(first time)"
          })
          
        }
       
        

      }

      if(userCartData){
        userCartData.cart = cartData;

        try {

          let updatedCartData = await userCartData.save();
          console.log(updatedCartData)

           if (updatedCartData) {
             return res.status(200).json({
               error: false,
               message: "cart data updated successfully",
             });
           }
          
        } catch (error) {
          console.log("error updating user cart data")
          return res.status(200).json({
            error: true,
            message: "Error updating cart data"
          })
          
        }

  
       
      }

      


      
    } catch (error) {
      console.log("error updating cart data");
      return res.status(400).json({
        error: true,
        message: "error updating cart"
      })
      
    }

  }


}
export default new CartController






