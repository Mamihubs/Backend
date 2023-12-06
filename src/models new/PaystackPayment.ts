import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";


export interface PaymentInfo extends Document{

}
export interface PaystackPayment extends Document {
  userId: ObjectId;
  payment: object[];
  createdAt: Date;
  updateAt: Date;
}

const paystackSchema = new Schema<PaystackPayment>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  payment: [],

}, {timestamps: true});

const paystackModel: Model<PaystackPayment> = mongoose.model("paystack", paystackSchema);


export default paystackModel;





