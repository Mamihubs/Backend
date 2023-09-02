import mongoose from 'mongoose';

export interface IVariationDto {
    variation: string;
    price: number;
    state: 'active' | 'suspended' | 'out of stock';
    barcode?: string;
    volume?: string;
    weight?: string;
    quantity: number;
  }
  
  export interface CreateNewProductDto {
    product_name: string;
    product_desc: string;
    status: boolean;
    brand: string;
    created_by: string;  // You can also use some specific ID type here
    categ_id: string;    // You can also use some specific ID type here
    variations: IVariationDto[];
    images: any[]; // Consider defining a stricter type
  }
  
  export interface UpdateVariationDto {
    _id: mongoose.Types.ObjectId;  // Variation ID, you can also use some specific ID type
    variation?: string;
    price?: number;
    state?: 'active' | 'suspended' | 'out of stock';
    barcode?: string;
    volume?: string;
    weight?: string;
    quantity?: number;
  }
  