import { UpdateManyDto, UpdateOneDto, searchDto } from "../dto/GeneralDto";
import { ProductAttributeValueDto } from "../dto/ProductDto";
import ProductAttributeValue, { ProductAttributeValueDoc } from "../models/ProductAttributeValue";

export class ProductAttributeValueRepository{
    // Create an ProductAttributeValue
    async Create(productAttributeValue: ProductAttributeValueDto){
      try {
        const newProductAttributeValue = await ProductAttributeValue.create(productAttributeValue)
        return newProductAttributeValue
      } catch (error) {
        console.log(error)
      }
    }

     // Find one ProductAttributeValue
     async FindOne(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await ProductAttributeValue.findOne(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find many ProductAttributeValues
     async FindMany(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await ProductAttributeValue.find(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find all ProductAttributeValues
     async FindAll(){
      try {
        const data = await ProductAttributeValue.find({})
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Update one ProductAttributeValue
     async UpdateOne(updateOne: UpdateOneDto){
      try {
        const update = await ProductAttributeValue.updateOne({__id: updateOne.__id},updateOne.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update many ProductAttributeValues
     async UpdateMany(updateMany: UpdateManyDto){
      try {
        const field = updateMany.field
        const value = updateMany.value
        const searchObj = {[field]: value}
        const update = await ProductAttributeValue.updateOne(searchObj,updateMany.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update All ProductAttributeValues
     async UpdateAll(){
        
     }

     // Delete one ProductAttributeValue
     async DeleteOne(){
        
     }

      // Delete many ProductAttributeValues
      async DeleteMany(){
        
      }

        // Delete all ProductAttributeValues
      async DeleteAll(){
            
        }
}