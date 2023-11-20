import mongoose, {Document, Schema, Model} from 'mongoose'


export interface iNotification extends Document{
    user:mongoose.Types.ObjectId;
    message:string;
    status:string;
}

const NotificationSchema = new Schema<iNotification>({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    message:{
        type: String,
        required:true
    },
    status:{type:String, default:'Unread'}
},{timestamps:true})

const NotificationModel:Model<iNotification> = mongoose.model('notification', NotificationSchema)
export default NotificationModel