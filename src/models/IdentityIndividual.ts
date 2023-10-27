import mongoose, {Document, Model, Schema} from 'mongoose';


export interface IIdentityIndividual extends Document {
    user: mongoose.Types.ObjectId;
    institute_name:string;
    graduation_date:string;
    identity_card:string;
    passport:string;
}


const identityIndividualSchema = new Schema<IIdentityIndividual>({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    institute_name:{type:String, required:true},
    graduation_date:{type:String, required:true},
    identity_card:{type:String, required:true},
    passport:{type:String, required:true}
},{timestamps:true});


const IdentityIndividualModel: Model<IIdentityIndividual> = mongoose.model<IIdentityIndividual>('IdentityIndividual', identityIndividualSchema);
export default IdentityIndividualModel;