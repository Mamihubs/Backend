import mongoose, { Document } from "mongoose"
const Schema = mongoose.Schema

export interface WalletDoc extends Document{
    user: object,
    name: string,
    amount: number,
    state: string,
    created_by: object,
    updated_by: object,
}

const Wallet = new Schema<WalletDoc>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {type: String},
    amount: {type: Number},
    state: {type: String, default:"active",enum:["active","suspended"]},
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