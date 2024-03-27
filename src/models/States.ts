import mongoose, { Document, Model, Schema } from "mongoose";

export interface IStates extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
}

// Item Schema
const StateSchema = new Schema<IStates>({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: {
      type: String,
      required: true
    }
  });

// Export the model with its TypeScript type
const StateModel: Model<IStates> = mongoose.model<IStates>('State', StateSchema);
export default StateModel;