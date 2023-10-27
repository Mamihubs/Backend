import mongoose, {Document, Model, Schema} from 'mongoose';


export interface IIdentityCompany extends Document {
    user: mongoose.Types.ObjectId;
    company_name:string;
    company_size:number;
    address:string;
    manager_number:string;
    document_type:string;
    identity_card:string;
    passport:string;
}


const identityIndividualSchema = new Schema<IIdentityCompany>({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    company_name:{type:String, required:true},
    company_size:{type:Number, required:true},
    address:{type:String, required:true},
    document_type:{type:String, required:true},
    identity_card:{type:String, required:true},
    passport:{type:String, required:true}
},{timestamps:true});


const IdentityCompanyModel: Model<IIdentityCompany> = mongoose.model<IIdentityCompany>('IdentityCompany', identityIndividualSchema);
export default IdentityCompanyModel;