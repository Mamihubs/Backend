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
