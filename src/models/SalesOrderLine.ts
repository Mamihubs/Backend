import mongoose, { Document } from "mongoose";
const Schema = mongoose.Schema;

export interface SalesOrderLineDoc extends Document{
    order_id: object,
    name: string,
    sequence: string,
    invoice_status: string,
    price_unit: number,
    price_subtotal: number,
    price_tax: number,
    price_total: number,
    price_reduce: number,
    discount: number,
    product_id: object,
    product_qty: number,
    qty_delivered_method: string,
    qty_delivered: number,
    qty_to_invoice: number,
    qty_invoiced: number,
    currency_id: object,
    created_by: object,
    updated_by: object
}

const SalesOrderLine = new Schema<SalesOrderLineDoc>({
    order_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SalesOrder'
    },
    name: {type: String},
    sequence: {type: String},
    invoice_status: {type: String},
    price_unit: {type: Number},
    price_subtotal: {type: Number},
    price_tax: {type: Number},
    price_total: {type: Number},
    price_reduce: {type: Number},
    discount: {type: Number},
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    product_qty: {type: Number},
    qty_delivered_method: {type: String},
    qty_delivered: {type: Number},
    qty_to_invoice: {type: Number},
    qty_invoiced: {type: Number},
    currency_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Currency'
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

export default mongoose.model<SalesOrderLineDoc>("SalesOrderLine", SalesOrderLine)