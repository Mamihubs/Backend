import mongoose, { Document } from "mongoose";


const Schema = mongoose.Schema;

export interface SubscriberDoc extends Document {
  email: string;
}


const Subscriber = new Schema<SubscriberDoc>(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
  },
  { timestamps: true }
);

const SubscriberModel = mongoose.model<SubscriberDoc>("Subscriber", Subscriber);
export default SubscriberModel;
