import axios from "axios"
import {Request, Response} from 'express'





export class CourierController {
  userInfo = {
    UserName: "demo",
    MerchantID: "11200001"
  };

  getCourierToken = async (req: Request, res: Response) => {
    const tokenRequest = await axios.post(
      "http://api.courierplus-ng.com/api/authentication/GetToken", this.userInfo
    );
    if(tokenRequest){
      console.log(tokenRequest);

    }
    
    res.send("I see you my bro")
  };

  getDestinations = async (req: Request, res: Response) => {};
}




export default new CourierController