import { UpdateManyDto, UpdateOneDto, searchDto } from "../dto/GeneralDto";
import ProductTemplate, { ProductTemplateDoc } from "../models/ProductTemplate";

export class ProductTemplateRepository{
    // Create an ProductTemplate
    async Create(productTemplate: ProductTemplateDoc){
      try {
        const newProductTemplate = await ProductTemplate.create(productTemplate)
        return newProductTemplate
      } catch (error) {
        console.log(error)
      }
    }

     // Find one ProductTemplate
     async FindOne(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await ProductTemplate.findOne(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find many ProductTemplates
     async FindMany(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await ProductTemplate.find(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find all ProductTemplates
     async FindAll(){
      try {
        const data = await ProductTemplate.find({})
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Update one ProductTemplate
     async UpdateOne(updateOne: UpdateOneDto){
      try {
        const update = await ProductTemplate.updateOne({__id: updateOne.__id},updateOne.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update many ProductTemplates
     async UpdateMany(updateMany: UpdateManyDto){
      try {
        const field = updateMany.field
        const value = updateMany.value
        const searchObj = {[field]: value}
        const update = await ProductTemplate.updateOne(searchObj,updateMany.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update All ProductTemplates
     async UpdateAll(){
        
     }

     // Delete one ProductTemplate
     async DeleteOne(){
        
     }

      // Delete many ProductTemplates
      async DeleteMany(){
        
      }

        // Delete all ProductTemplates
      async DeleteAll(){
            
        }
}