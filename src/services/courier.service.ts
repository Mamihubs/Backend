import axios from "axios";
import { CourierTokenRepository } from "../repository/CourierTokenRepository";

export class CourierService {
  private courierTokenRepository: CourierTokenRepository;

  constructor() {
    this.courierTokenRepository = new CourierTokenRepository();
  }

  async getDestinations() {
    try {
    } catch (error) {}
  }

  async getCourierToken() {
    try {
      const tokenData = await this.courierTokenRepository.findCompany(
        "courierPlus"
      );
      console.log(tokenData.token);
      if (tokenData.token) {
        const headers = {
          Authorization: `Bearer ${tokenData.token}`,
          "Content-type": "application/json",
        };
        let tokenValidityStatus = await this.checkForTokenValidity(tokenData.token);
        if(tokenValidityStatus === "Valid token"){
          return tokenData.token

        }
        return this.getNewToken()
      } else {
        this.getNewToken();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async checkForTokenValidity(token: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    };

    try{
       let response = await axios.get(
         "http://api.courierplus-ng.com/api/v1/GetOriginDestination",
         { headers }
       );
        if (response.status >= 200 && response.status < 300) {
          return "Valid token";
        }
        return "Invalid token"

    }catch(error){
      console.log(error);

    }

  }


  async getNewToken(){
   const courierPlusMerchantInfo = {
      UserName: "demo",
      MerchantID: "11200001",
    };
    try {
      const tokenRequest = await axios.post(
        "http://api.courierplus-ng.com/api/authentication/GetToken",
        courierPlusMerchantInfo
      );
      if(tokenRequest.data){
        let companyData = await this.courierTokenRepository.findCompany("courierPlus");
        if(companyData){
          console.log(companyData)

        }else{
          console.log("nothing found")
        }
        
      }

      
    } catch (error) {
      console.log(error, "Error getting new token")
      
    }

  }
}
