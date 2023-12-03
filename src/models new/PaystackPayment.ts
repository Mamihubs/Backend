import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";

export interface PaystackPayment extends Document {
  userId: ObjectId;
  payment: object[];
  cart: object[];
  paymentDate: Date;
  paymentAmount: number;
  createdAt: Date;
  updateAt: Date;
}

const paystackSchema = new Schema<PaystackPayment>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  payment: [],
  cart: [],

}, {timestamps: true});

const paystackModel: Model<PaystackPayment> = mongoose.model("paystack", paystackSchema);


export default paystackModel;





