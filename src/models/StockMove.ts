import mongoose, { Document } from "mongoose"
const Schema = mongoose.Schema

export interface StockMoveDoc extends Document{
    name: string,
    user_id: object,
    location_dest_id: object
    state: string,
    description_picking:string,
    price: number,
    is_return: boolean,
    is_sales: boolean,
    created_by: object,
    updated_by: object
}

const StockMove = new Schema<StockMoveDoc>({
    name: {type: String},
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    location_dest_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StockLocation'
    },
    state: {type: String},
    description_picking:{type: String},
    price: {type: Number},
    is_return: {type: Boolean},
    is_sales: {type: Boolean},
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

export default mongoose.model<StockMoveDoc>("StockMove", StockMove)