import mongoose, { Document } from "mongoose"
const Schema = mongoose.Schema

export interface ProductTemplateDoc extends Document{
    name: string,
    sequence: string,
    description: string,
    description_purchase: string,
    description_sale: string,
    detailed_type: string,
    type: string,
    categ_id: object,
    list_price: string,
    volume: string,
    weight: string,
    company_id: object,
    active: boolean,
    img: string,
    available_threshold: string,
    website_meta_title: string,
    website_meta_keywords: string,
    website_description: string,
    is_published: boolean,
    created_by: object,
    updated_by: object
}

const ProductTemplate = new Schema<ProductTemplateDoc>({
    name: {type: String},
    sequence: {type: String},
    description: {type: String},
    description_purchase: {type: String},
    description_sale: {type: String},
    detailed_type: {type: String},
    type: {type: String},
    categ_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    list_price: {type: String},
    volume: {type: String},
    weight: {type: String},
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    active: {type: Boolean},
    img: {type: String},
    available_threshold: {type: String},
    website_meta_title: {type: String},
    website_meta_keywords: {type: String},
    website_description: {type: String},
    is_published: {type: Boolean},
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

export default mongoose.model<ProductTemplateDoc>("ProductTemplate", ProductTemplate)