import mongoose, { Document } from "mongoose"
const Schema = mongoose.Schema

export interface ProductTemplateAttributeLineDoc extends Document{
    active: boolean,
    product_tmpl_id: object,
    product_attribute_id: object,
    value_count: number,
    created_by: object,
    updated_by: object
}

const ProductTemplateAttributeLine = new Schema<ProductTemplateAttributeLineDoc>({
    active: {type: Boolean},
    product_tmpl_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductTemplate'
    },
    product_attribute_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductAttribute'
    },
    value_count: {type: Number},
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

export default mongoose.model<ProductTemplateAttributeLineDoc>("ProductTemplateAttributeLine", ProductTemplateAttributeLine)