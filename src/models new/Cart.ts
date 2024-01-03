import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";

export interface Cart extends Document {
  userId: ObjectId;
  cart: object[];
}

const cartSchema = new Schema<Cart>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cart: [],
});

const cartModel: Model<Cart> = mongoose.model("cart", cartSchema);

export default cartModel;


