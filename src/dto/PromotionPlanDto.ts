export interface PromotionPlanDto{
    plan_type:string;
    duration:number;
    amount:number;
}


export interface UpdatePromotionPlanDto{
    id:string;
    update:object
}