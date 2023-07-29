import mongoose, { Document } from "mongoose"
const Schema = mongoose.Schema
import bcrypt from "bcryptjs"

export interface UserDoc extends Document {
    profile_id: object,
    fullName: string,
    login: string,
    password: string,
    active: boolean,
    type: string,
    status: string,
    company: object,
    created_by: object,
    updated_by: object,

    matchPassword(password: string): Promise<boolean>
}

const User = new Schema<UserDoc>({
    profile_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
      },

    fullName: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select:false
    },
    active: {
        type: Boolean,
        default: false
    },
    type: {
        type: String, 
        enum:["Customer","Vendor","Staff"],
        default: "Customer"
    },
    status: {
        type: String,
        enum: ["Pending", "Active"],
        default: "Pending",
      },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

// extend matchPassword function unto user
User.methods.matchPassword = async function(enteredPassword: string){
    return await bcrypt.compare(enteredPassword, this.password)
}

User.set('toJSON', {
    transform: function (_, ret) {
        delete ret.password;
        return ret;
    }

});
const UserModel = mongoose.model<UserDoc>("User", User)
export default UserModel;
// define the basic schema operations
export const getUserById = async (id:string)=> await UserModel.findById(id);
export const getUserByEmail = async (email: string) => await UserModel.findOne({ login:email })
export const updateUserInfo = async (id: string, values: Record<string, any>) =>
    await UserModel.findOneAndUpdate({ _id:id }, values, { new: true })