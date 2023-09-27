import { UpdateManyDto, UpdateOneDto, searchDto, AllSeachDto } from "../dto/GeneralDto";
import SaleModel from "../models/Sales";

export default class SalesRepository{
    // Create an Sales
    async Create(sales: Record<string, any>){
      try {
        return await SaleModel.create(sales)
      } catch (error) {
        console.log(error)
      }
    }

     // Find one Sales
     async FindOne(search: searchDto){
      try {
        return await SaleModel.findOne({[search.field]: search.value})
      } catch (error) {
        console.log(error)
      }
     }

     // Find many Sales
     async FindMany(search: object){
      try {
        return await SaleModel.find({...search});
      } catch (error) {
        console.log(error)
      }
     }

     // Find all Sales
     async FindAll(options?:AllSeachDto){
      try {
        const query: any = { isDeleted: false };
        if (options) {
          for (const key in options) {
              if (options.hasOwnProperty(key)) {
                  query[key] = options[key];
              }
          }
      }
        return await SaleModel.find(query)
      } catch (error) {
        console.log(error)
      }
     }

     // Update one SalesOrderLine
     async UpdateOne(updateOne: UpdateOneDto){
      try {
        return await SaleModel.updateOne({_id: updateOne._id},updateOne.update)
      } catch (error) {
        console.log(error)
      }
     }

     // Update many SalesOrderLines
     async UpdateMany(updateMany: UpdateManyDto){
      try {
        return await SaleModel.updateOne({[updateMany.field]: updateMany.value},updateMany.update)
      } catch (error) {
        console.log(error)
      }
     }

     // Update All SalesOrderLines
     async UpdateAll(){
        
     }

     // Delete one SalesOrderLine
     async DeleteOne(_id:string){
      try {
        return await SaleModel.findByIdAndUpdate(_id, {isDeleted:true}, {new:true})
        
      } catch (error) {
        console.log(error)
      } 
     }

      // Delete many SalesOrderLines
      async DeleteMany(){
        
      }

        // Delete all SalesOrderLines
      async DeleteAll(){
            
        }
}