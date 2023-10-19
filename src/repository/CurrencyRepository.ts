import { UpdateManyDto, UpdateOneDto, searchDto } from "../dto/GeneralDto";
import Currency, { CurrencyDoc } from "../models/Currency";

export class CurrencyRepository{
    // Create an Currency
    async Create(currency: CurrencyDoc){
      try {
        const newCurrency = await Currency.create(currency)
        return newCurrency
      } catch (error) {
        console.log(error)
      }
    }

     // Find one Currency
     async FindOne(search: searchDto){
      try {
        const {field, value} = search; 
        const searchObj = {[field]: value}
        const data = await Currency.findOne(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find many Currencys
     async FindMany(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await Currency.find(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find all Currencys
     async FindAll(){
      try {
        const data = await Currency.find({})
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Update one Currency
     async UpdateOne(updateOne: UpdateOneDto){
      try {
        const update = await Currency.updateOne({_id: updateOne._id},updateOne.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update many Currencys
     async UpdateMany(updateMany: UpdateManyDto){
      try {
        const field = updateMany.field
        const value = updateMany.value
        const searchObj = {[field]: value}
        const update = await Currency.updateOne(searchObj,updateMany.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update All Currencys
     async UpdateAll(){
        
     }

     // Delete one Currency
     async DeleteOne(){
        
     }

      // Delete many Currencys
      async DeleteMany(){
        
      }

        // Delete all Currencys
      async DeleteAll(){
            
        }
}