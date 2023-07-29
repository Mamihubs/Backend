import mongoose, { Schema, model } from "mongoose";


const TokenSchema = new Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    token: {type:String, required:true },
    createdAt:{type:Date, default:Date.now, expires:3600}
})
const TokenModel = model('Token', TokenSchema);
export default TokenModel;

// crud functions
export const createToken = (values: Record<string, any>) => new TokenModel(values).save()
    .then(token => token.toObject());
export const getUserToken =  async (user_id:string, token:string)=> await TokenModel.findOne({user_id, token});
export const deleteUserToken = async (id:object)=> await TokenModel.findOneAndDelete({_id:id});