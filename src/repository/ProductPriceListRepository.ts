import { UpdateManyDto, UpdateOneDto, searchDto } from "../dto/GeneralDto";
import ProductPriceList, { ProductPriceListDoc } from "../models/ProductPriceList";

export class ProductPriceListRepository{
    // Create an ProductPriceList
    async Create(productPriceList: ProductPriceListDoc){
      try {
        const newProductPriceList = await ProductPriceList.create(productPriceList)
        return newProductPriceList
      } catch (error) {
        console.log(error)
      }
    }

     // Find one ProductPriceList
     async FindOne(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await ProductPriceList.findOne(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find many ProductPriceLists
     async FindMany(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await ProductPriceList.find(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find all ProductPriceLists
     async FindAll(){
      try {
        const data = await ProductPriceList.find({})
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Update one ProductPriceList
     async UpdateOne(updateOne: UpdateOneDto){
      try {
        const update = await ProductPriceList.updateOne({__id: updateOne.__id},updateOne.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update many ProductPriceLists
     async UpdateMany(updateMany: UpdateManyDto){
      try {
        const field = updateMany.field
        const value = updateMany.value
        const searchObj = {[field]: value}
        const update = await ProductPriceList.updateOne(searchObj,updateMany.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update All ProductPriceLists
     async UpdateAll(){
        
     }

     // Delete one ProductPriceList
     async DeleteOne(){
        
     }

      // Delete many ProductPriceLists
      async DeleteMany(){
        
      }

        // Delete all ProductPriceLists
      async DeleteAll(){
            
        }
}