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
 

  
  // getDeliveryTown = async (req: Request, res: Response) => {
  //   // console.log(req.body);
  //   let { originStation, originStationCode } = req.body;
  //   // console.log(originStation);
  //   // let token = await this.getCourierTokenFunction()
  //   // console.log(token)

  //   let newToken = await this.getNewToken();
  //   console.log(newToken);

  //   res.send("chai");
  // };

  // getOnforwardingTown = async (req: Request, res: Response) => {
  //   let { destinationTown } = req.body;
  //   const token = await this.getCourierTokenFunction();
  //   let headers = {};

  //   if (token) {
  //     headers = {
  //       Authorization: `Bearer ${token}`,
  //       "Content-type": "application/json",
  //     };
  //   }

  //   const url = `http://api.courierplus-ng.com/api/v1/GetDeliveryTown/${destinationTown.station_code}`;

  //   try {
  //     const response = await axios.get(url, { headers: headers });
  //     console.log(response.data);
  //     res.send("onforwarding");
  //   } catch (error) {
  //     console.log(error);
  //     res.send("onfor");
  //   }
  // };


  getCourierDestinations = async (req: Request, res: Response) => {
    let response = await courierService.getDestinations();
    if(response === "Error fetching destinations"){
      return res.status(500).json({
        status: false,
        message: "An error occured while trying to fetch destinations"
      })
    }
    // console.log(response)
    return res.status(200).json({
      status: true,
      message: "Possible destinations fetched successfully",
      data: response
    });

  }
}

export default new CourierController();
