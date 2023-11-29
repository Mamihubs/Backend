import mongoose from "mongoose";

export interface IVariationDto {
  variation: string;
  price: number;
  state: "active" | "suspended" | "out of stock";
  barcode?: string;
  volume?: string;
  weight?: string;
  quantity: number;
  color?: string;
}

export interface UVariationDto {
  variation: string;
  price: number;
  state: "active" | "suspended" | "out of stock";
  barcode?: string;
  volume?: string;
  weight?: string;
  color?: string;
  // quantity: number; we never update quantity directly
}

export interface IShipping {
  width: number;
  height: number;
  weight: number;
  length: number;
}

export interface CreateNewProductDto {
  product_name: string;
  product_desc: string;
  status: boolean;
  brand: string;
  created_by: string; // You can also use some specific ID type here
  categ_id: string; // You can also use some specific ID type here
  variations: IVariationDto[];
  images: any[]; // Consider defining a stricter type;
  other_info: string;
  product_sku: string;
  product_quantity: number;
  price_discount: number;
  tags: string[];
  shipping: IShipping[];
  product_price: number;
}

export interface UpdateProductDto {
  product_name: string;
  product_desc: string;
  status: boolean;
  brand: string;
  created_by: string; // You can also use some specific ID type here
  categ_id: string; // You can also use some specific ID type here
  variations: UVariationDto[];
  images: any[]; // Consider defining a stricter type
  other_info: string;
  product_sku: string;
  product_quantity: number;
  price_discount: number;
  tags: string[];
  shipping: IShipping[];
  product_price: number;
}

export interface UpdateVariationDto {
  _id: mongoose.Types.ObjectId; // Variation ID, you can also use some specific ID type
  variation?: string;
  price?: number;
  state?: "active" | "suspended" | "out of stock";
  barcode?: string;
  volume?: string;
  weight?: string;
  quantity?: number;
  color?: string;
}
