import mongoose, { Document } from "mongoose"
const Schema = mongoose.Schema

export interface CompanyDoc extends Document{
    name: string,
    email: string,
    address: string,
    city: string,
    state: string,
    logo: string,
    company_reg_no: string,
    document: string,
    status: string,
    active: boolean,
    created_by: object,
    updated_by: object,
}

const Company = new Schema<CompanyDoc>({
    name: {type: String},
    email: {type: String},
    address: {type: String},
    city: {type: String},
    state: {type: String},
    logo: {type: String},
    company_reg_no: {type: String},
    document: {type: String},
    status: {
        type: String,
        enum: ["Pending", "Active"],
        default: "Pending",
      },
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

export default mongoose.model<CompanyDoc>("Company", Company)