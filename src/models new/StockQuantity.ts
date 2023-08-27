import mongoose, { Document } from "mongoose"
const Schema = mongoose.Schema

export interface StockQuantityDoc extends Document{
    product_id: object,
    categ_id: object,
    company_id: object,
    location_id: object,
    quantity: number,
    user_id:object,
    in_date: Date,
    created_by: object,
    updated_by: object
}

const StockQuantity = new Schema<StockQuantityDoc>({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductProduct'
    },
    categ_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    location_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StockLocation'
    },
    quantity: {type: Number},
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    in_date: {type: Date},
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

export default mongoose.model<StockQuantityDoc>("StockQuantity", StockQuantity)