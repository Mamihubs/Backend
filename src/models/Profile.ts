import mongoose, { Document } from "mongoose"
const Schema = mongoose.Schema

export interface ProfileDoc extends Document {
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    phoneNo: string,
    street1: string,
    street2: string,
    dateOfBirth: string,
    stateOfOrigin: string,
    identificationDoc: string,
    identificationNum: string,
    identificationName: string,
    passport: string,
    active: boolean,
    createdByy: object,
    updatedBy: object,
}

const Profile = new Schema<ProfileDoc>({
    firstName: {type:String},
    middleName: {type:String},
    lastName: {type:String},
    email: {type:String, unique:true},
    phoneNo: {type:String},
    street1: {type:String},
    street2: {type:String},
    dateOfBirth: {type:String},
    stateOfOrigin: {type:String},
    identificationDoc: {type:String},
    identificationNum: {type:String},
    identificationName: {type:String},
    passport: {type:String},
    active: {type:Boolean,default: false},
    createdByy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const ProfileModel = mongoose.model<ProfileDoc>("Profile", Profile)

export default ProfileModel;
export const getProfileByEmail = async (email: string) => await ProfileModel.findOne({ email })
export const createProfile = (values: Record<string, any>) => new ProfileModel(values).save()
    .then(user => user.toObject());
export const updateProfile = async (email: string, values: Record<string, any>) =>
    await ProfileModel.findOneAndUpdate({ email }, values, { new: true })

export const deleteProfile = async (email: string) =>
    await ProfileModel.findOneAndDelete({ email })

export const getProfiles = async ()=> await ProfileModel.find()