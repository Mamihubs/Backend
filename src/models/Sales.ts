import mongoose, { Document, Schema, Model } from "mongoose";

// Define interfaces for the schemas
export interface IItem extends Document {
  product: mongoose.Types.ObjectId;
  quantity: number;
  variation: string;
  price: number;
}

export interface ISale extends Document {
  order_by: mongoose.Types.ObjectId;
  updated_by: mongoose.Types.ObjectId;
  company: mongoose.Types.ObjectId;
  phone: string;
  address: string;
  payment_method: string;
  items: IItem[];
  date_ordered: Date;
  date_delivered?: Date;
  currency_id: mongoose.Types.ObjectId;
  amount_total?: number;
  total_tax?: number;
  total_insurance?: number;
  delivery_fee?: number;
  delivery_status: DeliveryStatus;
}

// defining the sales order enum status
export enum DeliveryStatus {
  PENDING = "Pending",
  IN_TRANSIT = "In Transit",
  DELIVERED = "Delivered",
  FAILED = "Failed",
}

// Item Schema
const itemSchema = new Schema<IItem>({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
  variation: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// Sale Schema
const SaleSchema = new Schema<ISale>(
  {
    order_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    payment_method: {
      type: String,
      required: true,
    },
    items: [itemSchema],
    date_ordered: {
      type: Date,
      default: Date.now,
    },
    date_delivered: {
      type: Date,
    },
    delivery_status: {
      type: String,
      enum: Object.values(DeliveryStatus),
      default: DeliveryStatus.PENDING,
    },
    currency_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Currency",
    },
    amount_total: { type: Number },
    total_tax: { type: Number },
    total_insurance: { type: Number },
    delivery_fee: { type: Number },
  },
  { timestamps: true }
);

// Export the model with its TypeScript type
const SaleModel: Model<ISale> = mongoose.model<ISale>("Sales", SaleSchema);
export default SaleModel;
