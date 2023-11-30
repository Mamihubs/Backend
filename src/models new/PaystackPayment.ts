import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";

export interface PaystackPayment extends Document {
  userId: ObjectId;
  payment: object[];
}

const paystackSchema = new Schema<PaystackPayment>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  payment: [],
});

const paystackModel: Model<PaystackPayment> = mongoose.model("paystack", paystackSchema);


export default paystackModel;





