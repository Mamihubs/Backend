import mongoose from "mongoose"
const Schema = mongoose.Schema;
const Schematypes = mongoose.SchemaTypes;

const VerificationCode = new Schema(
  {
    user: {
      type: Schematypes.ObjectId,
      ref: "User",
    },
    code: {
      type: String,
    },
    isValid: {
      type: Boolean,
      default: false,
    },
    maxAge: {
      type: Number,
      default: 5*60*1000,
    }
  },
  { timestamps: true }
);

export = mongoose.model("VerificationCode", VerificationCode);
