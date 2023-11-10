import { Request, Response } from "express";
import { NotificationDto, UpdateNotificationDto } from "../dto/NotificationDto";
import NotificationModel from "../models/Notification";

class NotificationController{

    getNotification = async(req:Request, res:Response)=>{
        const {id} = req.params;
         

        // create Notification
        const notification = await NotificationModel.find({'user':id});

        return res.status(201).json({notification});
    }
    getOneNotification = async(req:Request, res:Response)=>{
        const {id} = req.params;
         

        // create Notification
        const notification = await NotificationModel.find({_id:id});

        return res.status(201).json({notification});
    }
    createNotification = async(req:Request, res:Response)=>{
        const {user_id, message, status} = req.body;
        const notificationDto:NotificationDto = {
            user:user_id,
            message:message,
            status:status
        }

        // create Notification
        const notification = await NotificationModel.create(notificationDto);

        return res.status(201).json({notification});
    }


    updateNotification = async(req:Request, res:Response)=>{
        const {id}= req.params;
        const  notificationUpdateDto: UpdateNotificationDto = {
            _id:id,
            update:req.body
        }

        const notification = await NotificationModel.updateOne({_id:notificationUpdateDto._id}, notificationUpdateDto.update)

        return res.status(201).json({notification});
    }
}


export default new NotificationController;