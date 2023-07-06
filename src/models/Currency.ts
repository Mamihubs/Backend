import mongoose, { Document } from "mongoose"
const Schema = mongoose.Schema

export interface CurrencyDoc extends Document{
    name: string,
    symbol: string,
    decimal_places: number,
    active: boolean,
    created_by: object,
    updated_by: object
}

const Currency = new Schema<CurrencyDoc>({
    name: {type: String},
    symbol: {type: String},
    decimal_places: {type: Number},
    active: {type: Boolean},
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

export default mongoose.model<CurrencyDoc>("Currency", Currency)