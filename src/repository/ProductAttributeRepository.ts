import { UpdateManyDto, UpdateOneDto, searchDto } from "../dto/GeneralDto";
import { ProductAttributeDto } from "../dto/ProductDto";
import ProductAttribute, { ProductAttributeDoc } from "../models/ProductAttribute";

export class ProductAttributeRepository{
    // Create an ProductAttribute
    async Create(productAttribute: ProductAttributeDto){
      try {
        const newProductAttribute = await ProductAttribute.create(productAttribute)
        return newProductAttribute
      } catch (error) {
        console.log(error)
      }
    }

     // Find one ProductAttribute
     async FindOne(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await ProductAttribute.findOne(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find many ProductAttributes
     async FindMany(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await ProductAttribute.find(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find all ProductAttributes
     async FindAll(){
      try {
        const data = await ProductAttribute.find({})
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Update one ProductAttribute
     async UpdateOne(updateOne: UpdateOneDto){
      try {
        const update = await ProductAttribute.updateOne({__id: updateOne.__id},updateOne.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update many ProductAttributes
     async UpdateMany(updateMany: UpdateManyDto){
      try {
        const field = updateMany.field
        const value = updateMany.value
        const searchObj = {[field]: value}
        const update = await ProductAttribute.updateOne(searchObj,updateMany.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update All ProductAttributes
     async UpdateAll(){
        
     }

     // Delete one ProductAttribute
     async DeleteOne(){
        
     }

      // Delete many ProductAttributes
      async DeleteMany(){
        
      }

        // Delete all ProductAttributes
      async DeleteAll(){
            
        }
}