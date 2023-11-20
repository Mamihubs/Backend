export interface NotificationDto{
    user:string;
    message:string;
    status:string; 
}
export interface UpdateNotificationDto{
    _id:string;
   update:object;
}