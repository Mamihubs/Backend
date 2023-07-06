import mongoose, { Document } from "mongoose"
const Schema = mongoose.Schema

export interface WalletDoc extends Document{
    company: object,
    name: string,
    amount: number,
    created_by: object,
    updated_by: object,
}

const Wallet = new Schema<WalletDoc>({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    name: {type: String},
    amount: {type: Number},
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

export default mongoose.model<WalletDoc>("Wallet", Wallet)