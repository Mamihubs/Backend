export interface PromotionDto {
  user: string;
  plan_type: string;
  product: string;
  expired_by: string;
  clicks?: number;
  impressions?: number;
}
export interface UpdatePromotionDto {
  id: string;
  update: object;
}
