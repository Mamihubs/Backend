import mongoose, { Document, Model } from "mongoose"
const Schema = mongoose.Schema

export interface RegionDoc extends Document{
    name: string,
    createdBy: object,
    updatedBy: object,
}
export interface LocationDoc extends Document{
    region: object,
    location: string,
    address: string,
    phoneNo: string,
    createdBy: object,
    updatedBy: object,
}

const Region = new Schema<RegionDoc>({
    name: {type: String},
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

const Location = new Schema<LocationDoc>({
    region: {type: mongoose.Schema.Types.ObjectId, ref: 'Region'},
    location: {type: String},
    address: {type: String},
    phoneNo: {type: String},
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

export const RegionModel: Model<RegionDoc> = mongoose.model<RegionDoc>('Region', Region);
export const LocationModel: Model<LocationDoc> = mongoose.model<LocationDoc>('Location', Location);
