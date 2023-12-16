import mongoose, { Document, Model, Models, Schema } from "mongoose";

export interface IPromotion extends Document {
  user: object;
  plan_type: object;
  product: object;
}

const PromotionSchema = new Schema<IPromotion>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  plan_type: { type: mongoose.Schema.Types.ObjectId, ref: "PromotionPlan" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
}, {timestamps:true});


const PromotionModel: Model<IPromotion> = mongoose.model<IPromotion>('Promotion', PromotionSchema);

export default PromotionModel;
