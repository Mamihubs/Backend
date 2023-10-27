import mongoose, {Document, Model, Schema} from 'mongoose';


export interface IBusiness extends Document{
    user:mongoose.Types.ObjectId;
    account_type:string;
    firstname:string;
    lastname:string;
    middlename:string;
    zip:string;
    referral_code?:string;
    business_registered:boolean;
    registered_date:string;
    document:string;

}


const BusinessSchema = new Schema<IBusiness>({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    account_type:{type: String},
    firstname:{type:String},
    lastname:{type:String},
    middlename:{type:String},
    zip:{type:String},
    referral_code:{type:String},
    business_registered:{type:Boolean},
    registered_date:{type:String},
    document:{type:String}
})


const BusinessModel: Model<IBusiness> = mongoose.model<IBusiness>('Business', BusinessSchema);

export default BusinessModel;