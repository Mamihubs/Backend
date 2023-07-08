import { UpdateManyDto, UpdateOneDto, searchDto } from "../dto/GeneralDto";
import SalesOrderLine, { SalesOrderLineDoc } from "../models/SalesOrderLine";

export class SalesOrderLineRepository{
    // Create an SalesOrderLine
    async Create(salesOrderLine: SalesOrderLineDoc){
      try {
        const newSalesOrderLine = await SalesOrderLine.create(salesOrderLine)
        return newSalesOrderLine
      } catch (error) {
        console.log(error)
      }
    }

     // Find one SalesOrderLine
     async FindOne(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await SalesOrderLine.findOne(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find many SalesOrderLines
     async FindMany(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await SalesOrderLine.find(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find all SalesOrderLines
     async FindAll(){
      try {
        const data = await SalesOrderLine.find({})
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Update one SalesOrderLine
     async UpdateOne(updateOne: UpdateOneDto){
      try {
        const update = await SalesOrderLine.updateOne({__id: updateOne.__id},updateOne.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update many SalesOrderLines
     async UpdateMany(updateMany: UpdateManyDto){
      try {
        const field = updateMany.field
        const value = updateMany.value
        const searchObj = {[field]: value}
        const update = await SalesOrderLine.updateOne(searchObj,updateMany.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update All SalesOrderLines
     async UpdateAll(){
        
     }

     // Delete one SalesOrderLine
     async DeleteOne(){
        
     }

      // Delete many SalesOrderLines
      async DeleteMany(){
        
      }

        // Delete all SalesOrderLines
      async DeleteAll(){
            
        }
}