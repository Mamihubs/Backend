import { Error } from "mongoose"; 
import Withdrawal, { IWithdrawal } from "../models/Withdrawal";
import { VendorService } from "../services/vendor.service";
import { WalletRepository } from "./WalletRepository";
import { searchDto } from "../dto/GeneralDto";

export class WithdrawalRepository{
 
  private walletRepo: WalletRepository = new WalletRepository();
  


    async withdrawRequestFunds(details:Record<string, string>){
        // details should contain
        // userid, walletid, amount

        try{
            const {user, wallet, amount} = details;

            const searchDto:searchDto = {
                field: "_id",
                value:wallet
            }
            const getWallet =  await this.walletRepo.FindOne(searchDto);

            if(getWallet != null){
                if(getWallet.amount > parseInt(amount)){
                    // process the withdrawal
                    const data = {
                        user,
                        wallet_id:wallet,
                        amount:parseInt(amount),
                        balance: getWallet.amount,
                        status: "pending",
                        
                    }
                  return await Withdrawal.create(data);
                 
                }else{
                    return new Error("Insufficient funds.")
                }
            }else{
               return new Error("Wallet not found.")
            }

        }catch(e:any){
            return e;
        }
    }

    async WithdrawalApproveFunds(id:string){
        try{
            
           

            return Withdrawal.findById(id);
            
        }catch(e:any){
            return e;
        }
    }
}