import mongoose,{Document, Model, Schema} from "mongoose"

export interface IDeliveryAddress extends Document{
    address:string;
    contact:string;
    default: boolean;
    user: mongoose.Types.ObjectId
}

const DeliveryAddressSchema = new Schema<IDeliveryAddress>({
    address:{type:String, required:true},
    contact:{type:String, required:true},
    default:{type:Boolean, default:false},
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

});



export const DeliveryAddressModel:Model<IDeliveryAddress> = mongoose.model<IDeliveryAddress>("DeliveryAddress", DeliveryAddressSchema);