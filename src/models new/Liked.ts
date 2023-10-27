import mongoose, { Document, Model, Schema } from "mongoose";

export interface Iitem extends Document {
  user: object;
  product: object;
}

const likeSchema = new Schema<Iitem>({
  user: {type: mongoose.Schema.Types.ObjectId,ref: "User"},
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

const likeModel: Model<Iitem> = mongoose.model("LikeItem", likeSchema);

export default likeModel;
