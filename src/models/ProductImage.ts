import mongoose, { Document } from "mongoose"
const Schema = mongoose.Schema

export interface ProductImageDoc extends Document{
    name: string,
    sequence: string,
    product_tmpl_id: object,
    product_product_id: object,
    img: string,
    created_by: object,
    updated_by: object
}

const ProductImage = new Schema<ProductImageDoc>({
    name: {type: String},
    sequence: {type: String},
    product_tmpl_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductTemplate'
    },
    product_product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductProduct'
    },
    img: {type: String},
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

export default mongoose.model<ProductImageDoc>("ProductImage", ProductImage)