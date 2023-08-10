import { UpdateManyDto, UpdateOneDto, searchDto } from "../dto/GeneralDto";
import SalesOrder, { SalesOrderDoc } from "../models/SalesOrder";

export class SalesOrderRepository{
    // Create an SalesOrder
    async Create(salesOrder: SalesOrderDoc){
      try {
        const newSalesOrder = await SalesOrder.create(salesOrder)
        return newSalesOrder
      } catch (error) {
        console.log(error)
      }
    }

     // Find one SalesOrder
     async FindOne(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await SalesOrder.findOne(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find many SalesOrders
     async FindMany(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await SalesOrder.find(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find all SalesOrders
     async FindAll(){
      try {
        const data = await SalesOrder.find({})
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Update one SalesOrder
     async UpdateOne(updateOne: UpdateOneDto){
      try {
        const update = await SalesOrder.updateOne({_id: updateOne._id},updateOne.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update many SalesOrders
     async UpdateMany(updateMany: UpdateManyDto){
      try {
        const field = updateMany.field
        const value = updateMany.value
        const searchObj = {[field]: value}
        const update = await SalesOrder.updateOne(searchObj,updateMany.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update All SalesOrders
     async UpdateAll(){
        
     }

     // Delete one SalesOrder
     async DeleteOne(){
        
     }

      // Delete many SalesOrders
      async DeleteMany(){
        
      }

        // Delete all SalesOrders
      async DeleteAll(){
            
        }
}