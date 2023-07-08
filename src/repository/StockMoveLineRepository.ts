import { UpdateManyDto, UpdateOneDto, searchDto } from "../dto/GeneralDto";
import StockMoveLine, { StockMoveLineDoc } from "../models/StockMoveLine";

export class StockMoveLineRepository{
    // Create an StockMoveLine
    async Create(stockMoveLine: StockMoveLineDoc){
      try {
        const newStockMoveLine = await StockMoveLine.create(stockMoveLine)
        return newStockMoveLine
      } catch (error) {
        console.log(error)
      }
    }

     // Find one StockMoveLine
     async FindOne(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await StockMoveLine.findOne(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find many StockMoveLines
     async FindMany(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await StockMoveLine.find(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find all StockMoveLines
     async FindAll(){
      try {
        const data = await StockMoveLine.find({})
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Update one StockMoveLine
     async UpdateOne(updateOne: UpdateOneDto){
      try {
        const update = await StockMoveLine.updateOne({__id: updateOne.__id},updateOne.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update many StockMoveLines
     async UpdateMany(updateMany: UpdateManyDto){
      try {
        const field = updateMany.field
        const value = updateMany.value
        const searchObj = {[field]: value}
        const update = await StockMoveLine.updateOne(searchObj,updateMany.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update All StockMoveLines
     async UpdateAll(){
        
     }

     // Delete one StockMoveLine
     async DeleteOne(){
        
     }

      // Delete many StockMoveLines
      async DeleteMany(){
        
      }

        // Delete all StockMoveLines
      async DeleteAll(){
            
        }
}