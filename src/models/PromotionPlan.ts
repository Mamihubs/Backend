import mongoose, {Document, Model, ObjectId, Schema} from 'mongoose';


export enum PlanType {
    REGULAR = "Regular",
    SILVER = "Silver",
    DIAMOND = "Diamond",
}
export interface IPromotionPlan extends Document {
    id: mongoose.Types.ObjectId;
    plan_type: string;
    duration:number;
    amount: number;
}


const PromotionPlanSchema = new Schema<IPromotionPlan>({
    id:{type: mongoose.Schema.Types.ObjectId},
    plan_type:{type:String},
    duration:{type:Number},
    amount:{type:Number}


},{timestamps:true});


const PromotionPlanModel: Model<IPromotionPlan> = mongoose.model("PromotionPlan", PromotionPlanSchema);

export default PromotionPlanModel;
