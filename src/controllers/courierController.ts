import axios from "axios";
import mongodb from "mongodb";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { CourierService } from "../services/courier.service";
dotenv.config();

// const mongoClient = mongodb.MongoClient;
import { MongoClient } from "mongodb";

/*
Endpoints to do
-getPossibleDestination
-place






*/

const courierService = new CourierService();

export class CourierController {
  userInfo = {
    UserName: "demo",
    MerchantID: "11200001",
  };

  getCourierTokenFunction = async () => {
    // console.log("debi");
    let client;
    if (process.env.MONGO_DB_CONNECTION_STRING) {
      client = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING);
      await client.connect();
    }

    const checkForAvailableToken = await client
      ?.db("mamihub")
      .collection("courier_token")
      .findOne({ courierName: "courierName" });
    // console.log(checkForAvailableToken, "there is token in the db");

    if (checkForAvailableToken) {
      // console.log(checkForAvailableToken.courierToken);
      const headers = {
        Authorization: `Bearer ${checkForAvailableToken.courierToken}`,
        "Content-Type": "application/json",
      };

      try {
        let response = await axios.get(
          "http://api.courierplus-ng.com/api/v1/GetOriginDestination",
          { headers }
        );
        // console.log(response.data);

        if (response.status >= 200 && response.status < 300) {
          return checkForAvailableToken.courierToken;
        }
      } catch (error) {
        // console.log("Place of error");
        const deleteAvailableInactiveToken = await client
          ?.db("mamihub")
          .collection("courier_token")
          .deleteMany({});

        return this.getNewToken();
      }
    } else {
      console.log("no token");
      // return "token value";
    }

    return this.getNewToken();
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
      // console.log(tokenRequest.data);

      let courierTokenInfo = {
        courierName: "courierName",
        courierToken: tokenRequest.data.data.Token,
        courierExpiryDate: tokenRequest.data.data.Expires,
      };
      let feedback = await client
        ?.db("mamihub")
        .collection("courier_token")
        .insertOne(courierTokenInfo);
      // console.log(feedback, "your papa");
      return tokenRequest.data.data.Token;
    }
    return "Error fetching new token";
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

    // await this.getCourierTokenFunction();

    const token = await this.getCourierTokenFunction();

    console.log(token, "ji");

    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
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
    }
  };

  gt3 = async (req: Request, res: Response) => {
    // this.getCourierTokenFunction();
    // this.getNewToken()
    console.log("hello");
    res.send("courier endpoints active");
  };

  getDeliveryTown = async (req: Request, res: Response) => {
    // console.log(req.body);
    let { originStation, originStationCode } = req.body;
    // console.log(originStation);
    // let token = await this.getCourierTokenFunction()
    // console.log(token)

    let newToken = await this.getNewToken();
    console.log(newToken);

    res.send("chai");
  };

  getOnforwardingTown = async (req: Request, res: Response) => {
    let { destinationTown } = req.body;
    const token = await this.getCourierTokenFunction();
    let headers = {};

    if (token) {
      headers = {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      };
    }

    const url = `http://api.courierplus-ng.com/api/v1/GetDeliveryTown/${destinationTown.station_code}`;

    try {
      const response = await axios.get(url, { headers: headers });
      console.log(response.data);
      res.send("onforwarding");
    } catch (error) {
      console.log(error);
      res.send("onfor");
    }
  };


  testGetNewToken = async (req: Request, res: Response) => {
    courierService.getNewToken()
    return res.send("test get new token active");

  }
}

export default new CourierController();
