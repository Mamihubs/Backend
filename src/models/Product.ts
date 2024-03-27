import mongoose, { Document, Schema, Model } from "mongoose";

// Define interfaces for your schema
interface IVariation extends Document {
  variation: string;
  price: number;
  state: "active" | "suspended" | "out of stock";
  barcode?: string;
  volume?: string;
  weight?: string;
  quantity: number;
  color?: string;
}

interface IShipping extends Document {
  width: number;
  height: number;
  weight: number;
  length: number;
}

interface IProduct extends Document {
  product_name: string;
  product_desc: string;
  status: boolean;
  brand: string;
  created_by: mongoose.Types.ObjectId;
  category_id: mongoose.Types.ObjectId;
  variations: IVariation[];
  images: any[];
  is_flash_sale: boolean;
  // price_surcharge?: number;
  price_discount?: number;
  other_info: string;
  product_sku: string;
  product_quantity: number;
  tags: string[];
  shipping: IShipping[];
  product_price: number;
  // date_start?: Date;
  // date_end?: Date;
  // available_threshold?: string;
  // website_meta_title?: string;
  // website_meta_keywords?: string;
  // website_description?: string;
}

const ShippingSchema = new Schema<IShipping>({
  width: { type: Number },
  height: { type: Number },
  weight: { type: Number },
  length: { type: Number },
});

// Create VariationSchema
const VariationSchema = new Schema<IVariation>({
  variation: String,
  price: Number,
  state: {
    type: String,
    default: "active",
    enum: ["active", "suspended", "out of stock"],
  },
  barcode: { type: String },
  volume: { type: String },
  weight: { type: String },
  color: { type: String },
  quantity: {
    type: Number,
    default: 0,
  },
});

// Create ProductSchema
const ProductSchema = new Schema<IProduct>(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_desc: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    brand: {
      type: String,
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    variations: [VariationSchema],
    images: [],
    is_flash_sale: {
      type: Boolean,
      default: false,
    },
    // price_surcharge: { type: Number },
    price_discount: { type: Number },
    other_info: { type: String },
    product_sku: { type: String },
    product_quantity: { type: Number },
    tags: [],
    shipping: [ShippingSchema],
    product_price: { type: Number },
    // date_start: { type: Date },
    // date_end: { type: Date },
    // available_threshold: { type: String },
    // website_meta_title: { type: String },
    // website_meta_keywords: { type: String },
    // website_description: { type: String },
  },
  { timestamps: true }
);

// index search fields
ProductSchema.index({ product_name: 'text', product_desc: 'text' });

// Export the model with its TypeScript type
const ProductModel: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  ProductSchema
);
export default ProductModel;
