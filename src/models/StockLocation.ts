import mongoose, { Document } from "mongoose"
const Schema = mongoose.Schema

export interface StockLocationDoc extends Document{
    company_id: object,
    name: string,
    active: boolean,
    usage: string,
    created_by: object,
    updated_by: object
}

const StockLocation = new Schema<StockLocationDoc>({
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    name: {type: String},
    active: {type: Boolean},
    usage: {type: String},
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

export default mongoose.model<StockLocationDoc>("StockLocation", StockLocation)