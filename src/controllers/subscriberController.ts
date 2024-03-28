import { Request, Response } from "express";
import { SubscriberService } from "../services/subscriber.service";
import { subscriberValidation } from "../validations/subscriberValidation";
import { isValidObjectId } from "mongoose";
import { isValidEmailAddress } from "../utils/helpers";
import { storeDataInCacheMemory } from "../interceptors";

class SubscribersController{

    private subscriberService: SubscriberService = new SubscriberService();

    createSubscriber = async(req: Request, res: Response)=>{
        try {
            const {error, value} = subscriberValidation(req.body)
        if(error){
            return res.status(400).json({
                status: false,
                message: error.details[0].message.toUpperCase(),
            })
        }
        const data = await this.subscriberService.getSubscriber("email", value?.email)
        if(data){
            return res.status(400).json({
                status: false,
                message: "Email already exists.",
            }) 
        }
        const result = await this.subscriberService.insertSubscriber({email: value?.email})
        return res.status(201).json({message: "You're subscribed successfully", data: result})
        } catch (error) {
            res.status(500).json({message: "Error inserting subscriber, please try again later"})
        }
    }

    deleteSubscriber = async(req: Request, res: Response)=>{
        const param = req.params?.id
        try {
        if(isValidObjectId(param)){
            const sub = await this.subscriberService.getSubscriber("_id", param)
            if(!sub){
                return res.status(400).json({
                    status: false,
                    message: "Invalid subscriber ID or email.",
                }) 
            }
            const data = await this.subscriberService.deleteSubscriber("_id", param)
            return res.status(200).json({message: "You're unsubscribed successfully", data})
        }

        if(isValidEmailAddress(param)){
            const sub = await this.subscriberService.getSubscriber("email", param)
            if(!sub){
                return res.status(400).json({
                    status: false,
                    message: "Invalid subscriber ID or email.",
                }) 
            }
            const data = await this.subscriberService.deleteSubscriber("email", param)
            return res.status(200).json({message: "You're unsubscribed successfully", data})
        }
        
        return res.status(400).json({message: "Invalid subscriber ID or email"})
        } catch (error) {
            res.status(500).json({message: "Error removing subscriber, please try again later"})
        }
    }

    getAllSubscribers = async (req: Request, res: Response) => {
        const pageSize = parseInt(req.query.pageSize as string) || 10;
        const pageNumber = parseInt(req.query.pageNumber as string) || 1;
        const sortBy = req.query?.sortBy as string
        try {
          const result = await this.subscriberService.getAllSubscribers(
            {
              pageSize,
              pageNumber,
              sortBy,
            }
          );
          if (!result || result.length === 0) {
            return res.status(404).json({ message: "No subscribers found" });
          }
          const data = { data: result, message: "Successfully fetched subscribers" }
          // store cache in memory
          storeDataInCacheMemory(req, data, 10)
          return res.status(200).json(data);
        } catch (error:any) {
          return res.status(500).json({ message: "An error occurred", error });
        }
      };


}

export default new SubscribersController();