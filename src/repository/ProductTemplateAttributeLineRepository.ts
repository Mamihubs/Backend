import { UpdateManyDto, UpdateOneDto, searchDto } from "../dto/GeneralDto";
import ProductTemplateAttributeLine, { ProductTemplateAttributeLineDoc } from "../models/ProductTemplateAttributeLine";

export class ProductTemplateAttributeLineRepository{
    // Create an ProductTemplateAttributeLine
    async Create(productTemplateAttributeLine: ProductTemplateAttributeLineDoc){
      try {
        const newProductTemplateAttributeLine = await ProductTemplateAttributeLine.create(productTemplateAttributeLine)
        return newProductTemplateAttributeLine
      } catch (error) {
        console.log(error)
      }
    }

     // Find one ProductTemplateAttributeLine
     async FindOne(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await ProductTemplateAttributeLine.findOne(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find many ProductTemplateAttributeLines
     async FindMany(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await ProductTemplateAttributeLine.find(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find all ProductTemplateAttributeLines
     async FindAll(){
      try {
        const data = await ProductTemplateAttributeLine.find({})
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Update one ProductTemplateAttributeLine
     async UpdateOne(updateOne: UpdateOneDto){
      try {
        const update = await ProductTemplateAttributeLine.updateOne({__id: updateOne.__id},updateOne.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update many ProductTemplateAttributeLines
     async UpdateMany(updateMany: UpdateManyDto){
      try {
        const field = updateMany.field
        const value = updateMany.value
        const searchObj = {[field]: value}
        const update = await ProductTemplateAttributeLine.updateOne(searchObj,updateMany.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update All ProductTemplateAttributeLines
     async UpdateAll(){
        
     }

     // Delete one ProductTemplateAttributeLine
     async DeleteOne(){
        
     }

      // Delete many ProductTemplateAttributeLines
      async DeleteMany(){
        
      }

        // Delete all ProductTemplateAttributeLines
      async DeleteAll(){
            
        }
}