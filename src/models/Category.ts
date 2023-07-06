import mongoose, { Document } from "mongoose"
const Schema = mongoose.Schema

export interface CategoryDoc extends Document{
    name: string,
    complete_name: string,
    parent_id: object,
    parent_path: string,
    created_by: object,
    updated_by: object
}

const Category = new Schema<CategoryDoc>({
    name: {type: String},
    complete_name: {type: String},
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    parent_path: {type: String},
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

export default mongoose.model<CategoryDoc>("Category", Category)