import { timeStamp } from "console"
import mongoose, { Document } from "mongoose"
const Schema = mongoose.Schema


export interface AuditDoc extends Document{
    user: object,
    schema_name: string,
    description: string,
    field_name: string,
    old_value: string,
    new_value: string,
    action: string,
    created_by: object,
    updated_by: object,
}


const Audit = new Schema<AuditDoc>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    schema_name: {type: String},
    description: {type: String},
    field_name: {type: String},
    old_value: {type: String},
    new_value: {type: String},
    action: {type: String},
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

export default mongoose.model<AuditDoc>("Audit", Audit)