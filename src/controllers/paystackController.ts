import { Request, Response} from "express";

import paystackPaymentModel from "../models new/PaystackPayment";


export class PaystackController{

    savePaystackInfo = async (req: Request, res: Response) => {

      console.log("save paystack payment route...")
      let {paystackInfo} = req.body;
      console.log(paystackInfo);
      return res.status(200).json({
        error: false,
        message: "still working on save paystack payment api"
      })

    }



}

export default new PaystackController


