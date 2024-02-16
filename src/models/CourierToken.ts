import mongoose, {Document, Model, Schema} from "mongoose"


export interface ICourierToken extends Document{
    courierName:string;
    token:string;
    expiry: Date;
}



const CourierToken = new Schema<ICourierToken>({
    courierName:{type:String, unique:true},
    token:{type:String},
    expiry:{type:Date}
},{
    timestamps:true
})


 

export default mongoose.model<ICourierToken>('CourierToken', CourierToken)