import mongoose, {Document, Schema, Model} from 'mongoose';

export interface IBank extends Document{
    user:mongoose.Types.ObjectId;
    bank_name:string;
    account_name:string;
    account_number:string;
    account_type:string;
    bank_swiftcode:string;
    bank_branch:string;
}


const BankSchema = new Schema<IBank>({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    bank_name:{type:String, required:true},
    account_name:{type:String, required:true},
    account_number:{type:String, required:true},
    account_type:{type:String, required:true},
    bank_swiftcode:{type:String, required:true},
    bank_branch:{type:String, required:true},
});

const BankModel: Model<IBank> = mongoose.model<IBank>('Bank', BankSchema);

export default BankModel;