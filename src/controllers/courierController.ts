import mongoose from "mongoose"
import {Request, Response} from 'express'
import dotenv from 'dotenv'
import axios from "axios";
import CourierToken from "../models/CourierToken";
import { CourierTokenRepository } from "../repository/CourierTokenRepository";
 
// import axios from "axios";
dotenv.config()

// const mongoClient = mongodb.MongoClient;
 



export class CourierController {
 

  private courierTokenRepo = new CourierTokenRepository()

  userInfo = {
    UserName: "demo",
    MerchantID: "11200001",
  };

  getCourierToken = async (req: Request, res: Response) => {
    

    const checkForAvailableToken = await this.courierTokenRepo.findCompany({...req.body})
    console.log(checkForAvailableToken);

    if (checkForAvailableToken) {
      const headers = {
        Authorization: `Bearer ${checkForAvailableToken.courierToken}`,
        "Content-Type": "application/json",
      };

      let response = axios
        .get("http://api.courierplus-ng.com/api/v1/GetOriginDestination", {
          headers,
        })
        .then((response:any) => {
          console.log("Response:", response.data);
        })
        .catch((error:any) => {
          console.error(
            "Error:",
            error.response ? error.response.data : error.message
          );
        });
    } else {
      const tokenRequest = await axios.post(
        "http://api.courierplus-ng.com/api/authentication/GetToken",
        this.userInfo
      );
      if (tokenRequest.data) {
        console.log(tokenRequest.data);

        let courierTokenInfo = {
          courierName: "courierName",
          courierToken: tokenRequest.data.data.Token,
          courierExpiryDate: tokenRequest.data.data.Expires,
        };

        const item = { 
          courierName: "courierName",
          token:tokenRequest.data.data.Token,
          expiry:tokenRequest.data.data.Expires,
        }
        const feedback = await this.courierTokenRepo.createToken({...item});
      }

      res.send("I see you my bro");
    }
  };

  getDestinations = async (req: Request, res: Response) => {
    console.log("here")
     

    const checkForAvailableToken = await this.courierTokenRepo.findCompany("courierName");
    console.log(checkForAvailableToken);

    if (checkForAvailableToken) {
      const headers = {
        Authorization: `Bearer ${checkForAvailableToken.courierToken}`,
        "Content-Type": "application/json",
      };

      let response = axios
        .get("http://api.courierplus-ng.com/api/v1/GetOriginDestination", {
          headers,
        })
        .then((response:any) => {
          console.log("Response:", response.data.data);
          res.send({
            status: true,
            message: "Available location gotten successfully",
            data: response.data.data
          })
        })
        .catch((error:any) => {
          console.error(
            "Error:",
            error.response ? error.response.data : error.message
          );
          res.send({
            status: false,
            message: "Error fetching available data",
            data: null
          });
        });
    } else {
      const tokenRequest = await axios.post(
        "http://api.courierplus-ng.com/api/authentication/GetToken",
        this.userInfo
      );
      if (tokenRequest.data) {
        console.log(tokenRequest.data);

        let courierTokenInfo = {
          courierName: "courierName",
          courierToken: tokenRequest.data.data.Token,
          courierExpiryDate: tokenRequest.data.data.Expires,
        };

        const item = {
          courierName:"courierName",
          token:tokenRequest.data.data.Token,
          expiry:tokenRequest.data.data.Expires
        }
        const feedback = await this.courierTokenRepo.createToken({...item})
      }

      res.send("I see you my bro");
    }
  };
}




export default new CourierController