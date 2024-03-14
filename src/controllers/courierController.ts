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
  getCourierDestinations = async (req: Request, res: Response) => {
    let response = await courierService.getDestinations();
    if (response === "Error fetching destinations") {
      return res.status(500).json({
        status: false,
        message: "An error occured while trying to fetch destinations",
      });
    }
    // console.log(response)
    return res.status(200).json({
      status: true,
      message: "Possible destinations fetched successfully",
      data: response,
    });
  };

  getCourierShippingFee = async (req: Request, res: Response) => {
    let stationDetails = req.body;

    let response = await courierService.getShippingFee();
    console.log(req.body)
    res.status(200).json({
      message: "Working on courier shipping fee"
    })
  };

  getCourierOnforwardingTown = async (req: Request, res : Response) => {
    let stationDetails = req.body;
    let onForwardingTowns = await courierService.getOnforwardingTown(stationDetails);
    if(onForwardingTowns){
       res.status(200).json({
      message: "Successfully fetched onforwarding town",
      data: onForwardingTowns
    })

    }else{
      res.status(404).json({
        message: "Error fetching onforwarding towns",
        data: null
      })

    }
   

  }

}

export default new CourierController();
