import { UpdateManyDto, UpdateOneDto, searchDto } from "../dto/GeneralDto";
import WalletTransactions, { WalletTransactionsDoc } from "../models/WalletTransactions";

export class WalletTransactionsRepository{
    // Create an WalletTransactions
    async Create(walletTransactions: WalletTransactionsDoc){
      try {
        const newWalletTransactions = await WalletTransactions.create(walletTransactions)
        return newWalletTransactions
      } catch (error) {
        console.log(error)
      }
    }

     // Find one WalletTransactions
     async FindOne(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await WalletTransactions.findOne(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find many WalletTransactionss
     async FindMany(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await WalletTransactions.find(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find all WalletTransactionss
     async FindAll(){
      try {
        const data = await WalletTransactions.find({})
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Update one WalletTransactions
     async UpdateOne(updateOne: UpdateOneDto){
      try {
        const update = await WalletTransactions.updateOne({_id: updateOne._id},updateOne.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update many WalletTransactionss
     async UpdateMany(updateMany: UpdateManyDto){
      try {
        const field = updateMany.field
        const value = updateMany.value
        const searchObj = {[field]: value}
        const update = await WalletTransactions.updateOne(searchObj,updateMany.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update All WalletTransactionss
     async UpdateAll(){
        
     }

     // Delete one WalletTransactions
     async DeleteOne(){
        
     }

      // Delete many WalletTransactionss
      async DeleteMany(){
        
      }

        // Delete all WalletTransactionss
      async DeleteAll(){
            
        }
}