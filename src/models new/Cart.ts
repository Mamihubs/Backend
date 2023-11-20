import mongoose, { Document, Model, Schema } from "mongoose";

export interface Cart extends Document {
  user: object;
  cart: object;
}

const cartSchema = new Schema<Cart>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

const cartModel: Model<Cart> = mongoose.model("cart", cartSchema);

export default cartModel;


