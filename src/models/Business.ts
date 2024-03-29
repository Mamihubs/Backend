import mongoose, { Document, Model, Schema } from "mongoose";

export interface IBusiness extends Document {
  user: mongoose.Types.ObjectId;
  account_type: string;
  firstname: string;
  lastname: string;
  middlename: string;
  zip: string;
  referral_code?: string;
  business_registered: boolean;
  document?: string;
  cac_reg_number?: string;
}

const BusinessSchema = new Schema<IBusiness>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  account_type: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  middlename: { type: String },
  zip: { type: String },
  referral_code: { type: String },
  business_registered: { type: Boolean },
  document: { type: String },
  cac_reg_number: { type: String },
});

const BusinessModel: Model<IBusiness> = mongoose.model<IBusiness>(
  "Business",
  BusinessSchema
);

export default BusinessModel;
