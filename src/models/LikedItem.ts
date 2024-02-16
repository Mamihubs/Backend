import mongoose, { Document, Model, Schema } from "mongoose";




export interface ILikedItem extends Document{
    user: mongoose.Types.ObjectId;
    product: mongoose.Types.ObjectId;

}

const LikedItem = new Schema<ILikedItem>({
    user:{type:mongoose.Schema.Types.ObjectId, ref: 'User'},
    product:{type:mongoose.Schema.Types.ObjectId, ref: 'Product', unique: true},
},{
    timestamps:true
})



export default mongoose.model<ILikedItem>('LikedItem', LikedItem);



