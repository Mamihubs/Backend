import { UpdateManyDto, UpdateOneDto, searchDto } from "../dto/GeneralDto";
import StockLocation, { StockLocationDoc } from "../models/StockLocation";

export class StockLocationRepository{
    // Create an StockLocation
    async Create(stockLocation: StockLocationDoc){
      try {
        const newStockLocation = await StockLocation.create(stockLocation)
        return newStockLocation
      } catch (error) {
        console.log(error)
      }
    }

     // Find one StockLocation
     async FindOne(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await StockLocation.findOne(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find many StockLocations
     async FindMany(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await StockLocation.find(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find all StockLocations
     async FindAll(){
      try {
        const data = await StockLocation.find({})
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Update one StockLocation
     async UpdateOne(updateOne: UpdateOneDto){
      try {
        const update = await StockLocation.updateOne({__id: updateOne.__id},updateOne.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update many StockLocations
     async UpdateMany(updateMany: UpdateManyDto){
      try {
        const field = updateMany.field
        const value = updateMany.value
        const searchObj = {[field]: value}
        const update = await StockLocation.updateOne(searchObj,updateMany.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update All StockLocations
     async UpdateAll(){
        
     }

     // Delete one StockLocation
     async DeleteOne(){
        
     }

      // Delete many StockLocations
      async DeleteMany(){
        
      }

        // Delete all StockLocations
      async DeleteAll(){
            
        }
}