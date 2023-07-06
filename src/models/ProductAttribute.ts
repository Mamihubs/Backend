import mongoose, { Document } from "mongoose"
const Schema = mongoose.Schema

export interface ProductAttributeDoc extends Document{
    name: string,
    sequence: string,
    created_by: object,
    updated_by: object
}

const ProductAttribute = new Schema<ProductAttributeDoc>({
    name: {type: String},
    sequence: {type: String},
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

export default mongoose.model<ProductAttributeDoc>("ProductAttribute", ProductAttribute)