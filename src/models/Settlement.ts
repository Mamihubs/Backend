import mongoose, { Document } from "mongoose"
const Schema = mongoose.Schema

export interface SettlementDoc extends Document{
    company: object,
    bank_name: string,
    bank_acc_no: string,
    bank_acc_type: string,
    created_by: object,
    updated_by: object
}

const Settlement = new Schema<SettlementDoc>({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    bank_name: {type: String},
    bank_acc_no: {type: String},
    bank_acc_type: {type: String},
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

export default mongoose.model<SettlementDoc>("Settlement", Settlement)