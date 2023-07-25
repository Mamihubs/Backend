import mongoose, { Document } from "mongoose"
const Schema = mongoose.Schema

export interface ProductVariantCombinationDoc extends Document{
    productProductId: object,
    productTemplateAttributeValueId: object,
    createdBy: object,
    updatedBy: object
}

const ProductVariantCombination = new Schema<ProductVariantCombinationDoc>({
    productProductId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductProduct'
    },
    productTemplateAttributeValueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductTemplateAttributeValue'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

export default mongoose.model<ProductVariantCombinationDoc>("ProductVariantCombination", ProductVariantCombination);
