import { UpdateManyDto, UpdateOneDto, searchDto } from "../dto/GeneralDto";
import StockMove, { StockMoveDoc } from "../models/StockMove";

export class StockMoveRepository{
    // Create an StockMove
    async Create(stockMove: StockMoveDoc){
      try {
        const newStockMove = await StockMove.create(stockMove)
        return newStockMove
      } catch (error) {
        console.log(error)
      }
    }

     // Find one StockMove
     async FindOne(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await StockMove.findOne(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find many StockMoves
     async FindMany(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await StockMove.find(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find all StockMoves
     async FindAll(){
      try {
        const data = await StockMove.find({})
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Update one StockMove
     async UpdateOne(updateOne: UpdateOneDto){
      try {
        const update = await StockMove.updateOne({_id: updateOne._id},updateOne.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update many StockMoves
     async UpdateMany(updateMany: UpdateManyDto){
      try {
        const field = updateMany.field
        const value = updateMany.value
        const searchObj = {[field]: value}
        const update = await StockMove.updateOne(searchObj,updateMany.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update All StockMoves
     async UpdateAll(){
        
     }

     // Delete one StockMove
     async DeleteOne(){
        
     }

      // Delete many StockMoves
      async DeleteMany(){
        
      }

        // Delete all StockMoves
      async DeleteAll(){
            
        }
}