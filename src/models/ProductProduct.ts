import mongoose, { Document } from "mongoose"
const Schema = mongoose.Schema

export interface ProductProductDoc extends Document{
    sequence: string,
    active: string,
    product_tmpl_id: object,
    barcode: string,
    volume: string,
    weight: string,
    created_by: object,
    updated_by: object
}

const ProductProduct = new Schema<ProductProductDoc>({
    sequence: {type: String},
    active: {type: String},
    product_tmpl_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductTemplate'
    },
    barcode: {type: String},
    volume: {type: String},
    weight: {type: String},
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

export default mongoose.model<ProductProductDoc>("ProductProduct", ProductProduct)