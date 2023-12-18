export interface PromotionDto{
    user:string;
    plan_type:string;
    product:string;
    expired_by:string
}
export interface UpdatePromotionDto{
    id:string;
    update:object;
}