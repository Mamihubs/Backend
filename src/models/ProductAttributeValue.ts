import mongoose, { Document } from "mongoose"
const Schema = mongoose.Schema

export interface ProductAttributeValueDoc extends Document{
    name: string,
    sequence: string,
    product_attribute_id: object,
    created_by: object,
    updated_by: object
}

const ProductAttributeValue = new Schema<ProductAttributeValueDoc>({
    name: {type: String},
    sequence: {type: String},
    product_attribute_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductAttribute'
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

export default mongoose.model<ProductAttributeValueDoc>("ProductAttributeValue", ProductAttributeValue)