import mongoose, { Document } from "mongoose"
const Schema = mongoose.Schema

export interface ProductPriceListDoc extends Document{
    product_tmpl_id: object,
    product_id: object,
    categ_id: object,
    price_surcharge: number,
    price_discount: number,
    fixed_price: number,
    active: boolean,
    date_start: Date,
    date_end: Date,
    created_by: object,
    updated_by: object
}

const ProductPriceList = new Schema<ProductPriceListDoc>({
    product_tmpl_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductTemplate'
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductProduct'
    },
    categ_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    price_surcharge: {type: Number},
    price_discount: {type: Number},
    fixed_price: {type: Number},
    active: {type: Boolean},
    date_start: {type: Date},
    date_end: {type: Date},
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

export default mongoose.model<ProductPriceListDoc>("ProductPriceList", ProductPriceList)