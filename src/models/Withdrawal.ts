import mongoose, { Document, Schema, Model, mongo } from "mongoose";


export interface IWithdrawal extends Document{
    user: Object;
    wallet_id: Object;
    amount: number;
    balance: number;
    status: string;
}

const WithdrawalSchema = new Schema<IWithdrawal>({
user:{ type: mongoose.Schema.Types.ObjectId,
ref: 'User'},
wallet_id:{ type: mongoose.Schema.Types.ObjectId,
    ref: 'Wallet'},
amount:{type: Number, required: true},
balance:{type: Number, required:true},
status:{type:String, default:"pending", enum:["pending", "completed"]}
},{
    timestamps:true
})

export default mongoose.model<IWithdrawal>('Withdrawal', WithdrawalSchema);