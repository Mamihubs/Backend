import mongoose, { Document } from "mongoose"
const Schema = mongoose.Schema

export interface ProductTemplateAttributeValueDoc extends Document{
    active: boolean,
    product_attribute_value_id: object,
    product_attribute_line_id: object,
    price_extra: number,
    product_tmpl_id: object,
    product_attribute_id: object,
    value_count: number,
    created_by: object,
    updated_by: object
}

const ProductTemplateAttributeValue = new Schema<ProductTemplateAttributeValueDoc>({
    active: {type: Boolean},
    product_attribute_value_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductAttributeValue'
    },
    product_attribute_line_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductTemplateAttributeLine'
    },
    price_extra: {type: Number},
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

export default mongoose.model<ProductTemplateAttributeValueDoc>("ProductTemplateAttributeValue", ProductTemplateAttributeValue)