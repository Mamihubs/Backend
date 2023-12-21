import mongoose, {Document, Model, ObjectId, Schema} from 'mongoose';
import { IPromotion } from './Promotion';


export enum PlanType {
    REGULAR = "Regular",
    SILVER = "Silver",
    DIAMOND = "Diamond",
}
export interface IPromotionPlan extends Document {
    plan_type: string;
    duration:number;
    amount: number;
}


const PromotionPlanSchema = new Schema<IPromotionPlan>({
    plan_type:{type:String},
    duration:{type:Number},
    amount:{type:Number}


},{timestamps:true});


const PromotionPlanModel: Model<IPromotionPlan> = mongoose.model<IPromotionPlan>("PromotionPlan", PromotionPlanSchema);

export default PromotionPlanModel;
