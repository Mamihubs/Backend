import mongoose, { Document, Model, Schema } from "mongoose";

export interface ILgas extends Document {
  state: mongoose.Types.ObjectId;
  name: string;
}

// Item Schema
const LgaSchema = new Schema<ILgas>({
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State'
      },
    name: {
      type: String,
      required: true
    }
  });

// Export the model with its TypeScript type
const LgaModel: Model<ILgas> = mongoose.model<ILgas>('Lga', LgaSchema);
export default LgaModel;