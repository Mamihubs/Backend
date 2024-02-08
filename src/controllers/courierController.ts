import axios from "axios";
import mongodb from "mongodb";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

// const mongoClient = mongodb.MongoClient;
import { MongoClient } from "mongodb";

export class CourierController {
  userInfo = {
    UserName: "demo",
    MerchantID: "11200001",
  };
  

  getCourierTokenFunction = async () => {
    let client;
    if (process.env.MONGO_DB_CONNECTION_STRING) {
      client = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING);
      await client.connect();
    }

    const checkForAvailableToken = await client
      ?.db("mamihub")
      .collection("courier_token")
      .findOne({ courierName: "courierName" });
    // console.log(checkForAvailableToken);

    if (checkForAvailableToken) {
      const headers = {
        Authorization: `Bearer ${checkForAvailableToken.courierToken}`,
        "Content-Type": "application/json",
      };

      try {
        let response = await axios.get(
          "http://api.courierplus-ng.com/api/v1/GetOriginDestination",
          { headers }
        );
        if(response.status >= 200 && response.status < 300){
          return checkForAvailableToken 
        }
        // console.log(response);
      } catch (error) {
        // console.log(error);
        return "token unavailable"
      }
    }
  };


  getNewToken = async () => {
     let client;

     if (process.env.MONGO_DB_CONNECTION_STRING) {
       client = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING);
       await client.connect();
     }
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
      let feedback = await client
        ?.db("mamihub")
        .collection("courier_token")
        .updateOne({courierName : "courierName"}, {$set: {courierToken: tokenRequest.data.data.Token}});


        return tokenRequest.data.data.Token
        
        
    }
    return "Error fetching new token"

  }

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
    console.log("here");
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
            data: response.data.data,
          });
        })
        .catch((error) => {
          console.error(
            "Error:",
            error.response ? error.response.data : error.message
          );
          res.send({
            status: false,
            message: "Error fetching available data",
            data: null,
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

  getDestinationsTwo = async (req: Request, res: Response) => {
      let client;

      if (process.env.MONGO_DB_CONNECTION_STRING) {
        client = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING);
        await client.connect();
      }

      const token = await this.getCourierTokenFunction();
      console.log(token)
      res.send("two")


  }




  getDeliveryTown = async (req: Request, res: Response) => {
    // console.log(req.body);
    let { originStation, originStationCode } = req.body;
    // console.log(originStation);
    // let token = await this.getCourierTokenFunction()
    // console.log(token)


    let newToken = await this.getNewToken()
    console.log(newToken)



    res.send("chai");
  };
}

export default new CourierController();
