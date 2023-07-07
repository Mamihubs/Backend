import mongoose, { Document } from "mongoose"
const Schema = mongoose.Schema

export interface WalletTransactionsDoc extends Document{
    company: object,
    wallet_id: object,
    description: string,
    type: string,
    transref: string,
    state: string,
    amount: number,
    walletBalance: number,
    created_by: object,
    updated_by: object,
}

const WalletTransactions = new Schema<WalletTransactionsDoc>({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    wallet_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    description: {type: String},
    type: {type: String, enum:["credit","debit"]},
    transref: {type: String},
    state: {type: String, default:"pending",enum:["pending","successful","reversed"]},
    amount: {type: Number},
    walletBalance: {type: Number},
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

export default mongoose.model<WalletTransactionsDoc>("WalletTransactions", WalletTransactions)