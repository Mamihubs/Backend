import mongoose, { Document } from "mongoose";


const Schema = mongoose.Schema;

export interface SettingDoc extends Document {
    theme?: string,
    limit?: number,
}

const SettingsSchema = new Schema<SettingDoc>({
    theme:{type:String},
    limit:{type:Number}
});


export default mongoose.model('Settings', SettingsSchema);