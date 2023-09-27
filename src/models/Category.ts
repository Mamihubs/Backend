import mongoose, { Document } from "mongoose"
const Schema = mongoose.Schema

export interface CategoryDoc extends Document{
    name: string,
    completeName: string,
    parentId: object,
    parentPath: string,
    createdBy: object,
    updatedBy: object,
    isDeleted:boolean
}

const Category = new Schema<CategoryDoc>({
    name: {type: String},
    completeName: {type: String},
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    parentPath: {type: String},
    isDeleted:{type:Boolean, default:false},
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{timestamps: true}
)

export default mongoose.model<CategoryDoc>("Category", Category)