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
        let tokenValidityStatus = await this.checkForTokenValidity(
          tokenData.token
        );
        if (tokenValidityStatus === "Valid token") {
          return tokenData.token;
        }
        return this.getNewToken();
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
      console.log(error);
    }
  }

  async getNewToken() {
    console.log("gnt")
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
      // await this.courierTokenRepository.removeToken("65e59b00ddf8361e66b21f3a");
      if (tokenRequest.data.data) {
        let response = tokenRequest.data.data;
        let companyDataResponse = await this.courierTokenRepository.findCompany(
          "courierPlus"
        );
        console.log(companyDataResponse)
        if (companyDataResponse.length == 0) {
          console.log("No documents found with the given company name");
          // console.log(tokenRequest.data.Expires)

          let modifiedDate = await this.removeMicroSeconds(
            response.Expires
          );
          let createTokenResponse =
            await this.courierTokenRepository.createToken({
              courierName: "courierPlus",
              token: response.Token,
              expiry: new Date(response.Expires),
            });
          console.log(createTokenResponse);
            // let time = await this.removeMicroSeconds(
            //   "2024-04-04T03:28:03.4239754Z"
            // );
            //  console.log(
            //    new Date(
            //      await this.removeMicroSeconds("2024-04-04T03:28:03.4239754Z")
            //    )
            //  );
        } else {
        }
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
