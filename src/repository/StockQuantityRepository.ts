import { UpdateManyDto, UpdateOneDto, searchDto } from "../dto/GeneralDto";
import StockQuantity, { StockQuantityDoc } from "../models/StockQuantity";

export class StockQuantityRepository{
    // Create an StockQuantity
    async Create(stockQuantity: StockQuantityDoc){
      try {
        const newStockQuantity = await StockQuantity.create(stockQuantity)
        return newStockQuantity
      } catch (error) {
        console.log(error)
      }
    }

     // Find one StockQuantity
     async FindOne(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await StockQuantity.findOne(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find many StockQuantitys
     async FindMany(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await StockQuantity.find(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find all StockQuantitys
     async FindAll(){
      try {
        const data = await StockQuantity.find({})
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Update one StockQuantity
     async UpdateOne(updateOne: UpdateOneDto){
      try {
        const update = await StockQuantity.updateOne({__id: updateOne.__id},updateOne.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update many StockQuantitys
     async UpdateMany(updateMany: UpdateManyDto){
      try {
        const field = updateMany.field
        const value = updateMany.value
        const searchObj = {[field]: value}
        const update = await StockQuantity.updateOne(searchObj,updateMany.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update All StockQuantitys
     async UpdateAll(){
        
     }

     // Delete one StockQuantity
     async DeleteOne(){
        
     }

      // Delete many StockQuantitys
      async DeleteMany(){
        
      }

        // Delete all StockQuantitys
      async DeleteAll(){
            
        }
}