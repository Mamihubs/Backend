import axios from "axios";
import { CourierTokenRepository } from "../repository/CourierTokenRepository";

export class CourierService {
  private courierTokenRepository: CourierTokenRepository;

  constructor() {
    this.courierTokenRepository = new CourierTokenRepository();
  }

  async getDestinations() {
    try {
      let token = await this.getCourierToken();
      // console.log(token, "alpha");
      if(token){
         const headers = {
           Authorization: `Bearer ${token}`,
           "Content-type": "application/json",
         };

         try {
           let response = await axios.get(
             "http://api.courierplus-ng.com/api/v1/GetOriginDestination",
             { headers }
           );
           if(response.data.status){
            return response.data.data
           }
           return "Error fecthing destinations"
         } catch (error) {
           console.log(error);
           return "Error fetching destinations"
         }

      }
      return "Error fetching destinations"
    } catch (error) {
      console.log(error);
      return "Error fetching destinations"
    }
  }

  async getCourierToken() {
    try {
      const tokenData = await this.courierTokenRepository.findCompany(
        "courierPlus"
      );
      // console.log(tokenData[0].token, "charlie");
      if (tokenData[0].token) {
        let tokenValidityStatus = await this.checkForTokenValidity(
          tokenData[0].token
        ); 
        if (tokenValidityStatus === "Valid token") {
          return tokenData[0].token;
        }
        return this.getNewToken();
      } else {
        return this.getNewToken();
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

    try {
      let response = await axios.get(
        "http://api.courierplus-ng.com/api/v1/GetOriginDestination",
        { headers }
      );
      if (response.status >= 200 && response.status < 300) {
        return "Valid token";
      }
      return "Invalid token";
    } catch (error) {
      console.log("Network error or CourierPlus API not functional");
      
    }
  }

  async getNewToken() {
    // console.log("gnt");
    const courierPlusMerchantInfo = {
      UserName: "demo",
      MerchantID: "11200001",
    };
    try {
      const tokenRequest = await axios.post(
        "http://api.courierplus-ng.com/api/authentication/GetToken",
        courierPlusMerchantInfo
      );
      // console.log(tokenRequest.data.data);
      // await this.courierTokenRepository.removeToken("65e5b812575a26a177a19782");
      if (tokenRequest.data.data) {
        let response = tokenRequest.data.data;
        let companyDataResponse = await this.courierTokenRepository.findCompany(
          "courierPlus"
        );
        // console.log(companyDataResponse, "bravo");
        if (companyDataResponse.length == 0) {
          console.log("No documents found with the given company name");
          // console.log(tokenRequest.data.Expires)

          let modifiedDate = await this.removeMicroSeconds(response.Expires);
          let createTokenResponse =
            await this.courierTokenRepository.createToken({
              courierName: "courierPlus",
              token: response.Token,
              expiry: new Date(response.Expires),
            });
          console.log(createTokenResponse);
          return response.token;
        } else {
          let updateToken = await this.courierTokenRepository.updateToken(
            companyDataResponse[0]._id,
            response.token
          );
          return response.token
        }
      }else{
        console.log("Error getting new token. Kindly check Merchant info")
        return undefined

      }
    } catch (error) {
      console.log(error, "Error getting new token");
    }
  }

  async removeMicroSeconds(timestamp: string) {
    const [datePart, timePart] = timestamp.split("T");
    const timePartWithoutSeconds = timePart.split(".")[0];
    const newTime = `${datePart}T${timePartWithoutSeconds}Z`;
    return newTime;
  }
}
