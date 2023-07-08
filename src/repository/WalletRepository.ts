import { UpdateManyDto, UpdateOneDto, searchDto } from "../dto/GeneralDto";
import Wallet, { WalletDoc } from "../models/Wallet";

export class WalletRepository{
    // Create a Wallet
    async Create(wallet: WalletDoc){
      try {
        const newWallet = await Wallet.create(wallet)
        return newWallet
      } catch (error) {
        console.log(error)
      }
    }

     // Find one Wallet
     async FindOne(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await Wallet.findOne(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find many Wallets
     async FindMany(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await Wallet.find(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find all Wallets
     async FindAll(){
      try {
        const data = await Wallet.find({})
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Update one Wallet
     async UpdateOne(updateOne: UpdateOneDto){
      try {
        const update = await Wallet.updateOne({__id: updateOne.__id},updateOne.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update many Wallets
     async UpdateMany(updateMany: UpdateManyDto){
      try {
        const field = updateMany.field
        const value = updateMany.value
        const searchObj = {[field]: value}
        const update = await Wallet.updateOne(searchObj,updateMany.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update All Wallets
     async UpdateAll(){
        
     }

     // Delete one Wallet
     async DeleteOne(){
        
     }

      // Delete many Wallet
      async DeleteMany(){
        
      }

        // Delete all Wallets
      async DeleteAll(){
            
        }
}