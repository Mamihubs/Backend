import mongoose, { Document } from "mongoose"
const Schema = mongoose.Schema
import bcrypt from "bcryptjs"

export interface UserDoc extends Document {
    fullName: string,
    email: string,
    password: string,

    matchPassword(password: string): Promise<boolean>
}

const User = new Schema<UserDoc>({
    fullName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
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


export default mongoose.model<UserDoc>("User", User)