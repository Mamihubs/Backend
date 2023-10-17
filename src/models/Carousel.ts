import mongoose, { Document, Schema, Model } from 'mongoose';

// Define interfaces for the schemas
export interface ICaro extends Document {
  image: string;
  desc: string;
  title: string;
  isDeleted:boolean;
}


// Caro Schema
const caroSchema = new Schema<ICaro>({
  image: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  isDeleted:{
    type: Boolean,
    default:false
  }
});

// Export the model with its TypeScript type
const CaroModel: Model<ICaro> = mongoose.model<ICaro>('Carousel', caroSchema);
export default CaroModel;