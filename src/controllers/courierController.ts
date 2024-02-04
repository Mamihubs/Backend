import axios from "axios"
import mongodb from "mongodb"
import {Request, Response} from 'express'
import dotenv from 'dotenv'
dotenv.config()

// const mongoClient = mongodb.MongoClient;
import { MongoClient } from "mongodb";



export class CourierController {
  userInfo = {
    UserName: "demo",
    MerchantID: "11200001",
  };

  getCourierToken = async (req: Request, res: Response) => {
    let client;

    if (process.env.MONGO_DB_CONNECTION_STRING) {
      client = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING);
      await client.connect();
    }

    const checkForAvailableToken = await client
      ?.db("mamihub")
      .collection("courier_token")
      .findOne({ courierName: "courierName" });
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
        .then((response) => {
          console.log("Response:", response.data);
        })
        .catch((error) => {
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
        const feedback = await client
          ?.db("mamihub")
          .collection("courier_token")
          .insertOne(courierTokenInfo);
      }

      res.send("I see you my bro");
    }
  };

  getDestinations = async (req: Request, res: Response) => {
    console.log("here")
    let client;

    if (process.env.MONGO_DB_CONNECTION_STRING) {
      client = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING);
      await client.connect();
    }

    const checkForAvailableToken = await client
      ?.db("mamihub")
      .collection("courier_token")
      .findOne({ courierName: "courierName" });
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
        .then((response) => {
          console.log("Response:", response.data.data);
          res.send({
            status: true,
            message: "Available location gotten successfully",
            data: response.data.data
          })
        })
        .catch((error) => {
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
        const feedback = await client
          ?.db("mamihub")
          .collection("courier_token")
          .insertOne(courierTokenInfo);
      }

      res.send("I see you my bro");
    }
  };
}




export default new CourierController