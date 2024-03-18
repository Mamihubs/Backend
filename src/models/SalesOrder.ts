import mongoose, { Document } from "mongoose"
const Schema = mongoose.Schema


export interface SalesOrderDoc extends Document{
    access_token: string,
    name: string,
    origin: string,
    client_order_ref: string,
    reference: string,
    state: string,
    date_ordered: Date,
    validity_date: Date,
    user_id: object,
    profile_id: object,
    currency_id: object,
    amount_total: number,
    total_tax: number,
    total_insurance: number,
    delivery_fee: number,
    created_by: object,
    updated_by: object
}

const SalesOrder = new Schema<SalesOrderDoc>({
    access_token: {type: String},
    name: {type: String},
    origin: {type: String},
    client_order_ref: {type: String},
    reference: {type: String},
    state: {type: String},
    date_ordered: {type: Date},
    validity_date: {type: Date},
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    profile_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    currency_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Currency'
    },
    amount_total: {type: Number},
    total_tax: {type: Number},
    total_insurance: {type: Number},
    delivery_fee: {type: Number},
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

export default mongoose.model<SalesOrderDoc>("SalesOrder", SalesOrder)