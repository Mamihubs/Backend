import mongoose, { Document } from "mongoose"
const Schema = mongoose.Schema

export interface ProfileDoc extends Document {
    first_name: string,
    middle_name: string,
    last_name: string,
    email: string,
    phone_no: string,
    street1: string,
    street2: string,
    date_of_birth: string,
    state_of_origin: string,
    identification_doc: string,
    identification_num: string,
    identification_name: string,
    passport: string,
    active: boolean,
    created_by: object,
    updated_by: object,
}

const Profile = new Schema<ProfileDoc>({
    first_name: {type:String},
    middle_name: {type:String},
    last_name: {type:String},
    email: {type:String},
    phone_no: {type:String},
    street1: {type:String},
    street2: {type:String},
    date_of_birth: {type:String},
    state_of_origin: {type:String},
    identification_doc: {type:String},
    identification_num: {type:String},
    identification_name: {type:String},
    passport: {type:String},
    active: {type:Boolean},
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

export default mongoose.model<ProfileDoc>("Profile", Profile)