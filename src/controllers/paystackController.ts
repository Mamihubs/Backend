import { Request, Response} from "express";
import paystackModel from "../models new/PaystackPayment";


export class PaystackController{

    savePaystackInfo = async (req: Request, res: Response) => {

      console.log("save paystack payment route...");
      let userId = "655adcb6a18189d438dcb111";
      let {paystackReference, payedCart, amountPayed} = req.body.data;
      let paymentInfoToBeStored = {
        paystackReference: paystackReference,
        paymentDate: new Date(),
        payedCart: payedCart,
        amountPayed: amountPayed 
      }





      const userPaystackData = await paystackModel.findOne({userId})
      if(userPaystackData){
        console.log("user has made payment using paystack before, now fetching data..");
        userPaystackData.payment = [...userPaystackData.payment, paymentInfoToBeStored];
        try{
          let updatedPaystackData = await userPaystackData.save();
          console.log(updatedPaystackData)

          if(updatedPaystackData){
            return res.status(200).json({
              error: false,
              message: "paystack payment confirmed and informations successfully stored 2"
            })
          }

        }catch(error){
          console.log("error updating paystack data");
          return res.status(200).json({
            error: true,
            message: "error updating paystack data"
          })

        }

      }else{
        console.log("user has not made any payment using paystack before. creating user data...")
        const createUserPaystackData = await paystackModel.create({
          userId, payment: [paymentInfoToBeStored]
        });
        if (createUserPaystackData){
          return res.status(200).json({
            error: false,
            message: "paystack payment confirmed and information successfully stored"
          })
        }
      } 

      console.log(req.body);
      return res.status(200).json({
        error: false,
        message: "still working on save paystack payment api"
      })

    }



}

export default new PaystackController


