import { UpdateManyDto, UpdateOneDto, searchDto } from "../dto/GeneralDto";
import ProductTemplateAttributeValue, { ProductTemplateAttributeValueDoc } from "../models/ProductTemplateAttributeValue";

export class ProductTemplateAttributeValueRepository{
    // Create an ProductTemplateAttributeValue
    async Create(productTemplateAttributeValue: ProductTemplateAttributeValueDoc){
      try {
        const newProductTemplateAttributeValue = await ProductTemplateAttributeValue.create(productTemplateAttributeValue)
        return newProductTemplateAttributeValue
      } catch (error) {
        console.log(error)
      }
    }

     // Find one ProductTemplateAttributeValue
     async FindOne(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await ProductTemplateAttributeValue.findOne(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find many ProductTemplateAttributeValues
     async FindMany(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await ProductTemplateAttributeValue.find(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find all ProductTemplateAttributeValues
     async FindAll(){
      try {
        const data = await ProductTemplateAttributeValue.find({})
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Update one ProductTemplateAttributeValue
     async UpdateOne(updateOne: UpdateOneDto){
      try {
        const update = await ProductTemplateAttributeValue.updateOne({_id: updateOne._id},updateOne.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update many ProductTemplateAttributeValues
     async UpdateMany(updateMany: UpdateManyDto){
      try {
        const field = updateMany.field
        const value = updateMany.value
        const searchObj = {[field]: value}
        const update = await ProductTemplateAttributeValue.updateOne(searchObj,updateMany.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update All ProductTemplateAttributeValues
     async UpdateAll(){
        
     }

     // Delete one ProductTemplateAttributeValue
     async DeleteOne(){
        
     }

      // Delete many ProductTemplateAttributeValues
      async DeleteMany(){
        
      }

        // Delete all ProductTemplateAttributeValues
      async DeleteAll(){
            
        }
}