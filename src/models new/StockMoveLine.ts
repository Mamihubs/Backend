import mongoose, { Document } from "mongoose"
const Schema = mongoose.Schema

export interface StockMoveLineDoc extends Document{
    name: string,
    user_id: object,
    move_id: object,
    location_dest_id: object,
    location_id: object,
    product_id: object,
    state: string,
    product_qty: number,
    description: string,
    reference: string,
    price: number,
    created_by: object,
    updated_by: object
}

const StockMoveLine = new Schema<StockMoveLineDoc>({
    name: {type: String},
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    location_dest_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StockLocation'
    },
    location_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StockLocation'
    },
    move_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StockMove'
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductProduct'
    },
    product_qty: {type: Number},
    state: {type: String},
    description:{type: String},
    reference:{type: String},
    price: {type: Number},
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

export default mongoose.model<StockMoveLineDoc>("StockMoveLine", StockMoveLine)