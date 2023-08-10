import { UpdateManyDto, UpdateOneDto, searchDto } from "../dto/GeneralDto";
import ProductVariantCombination, { ProductVariantCombinationDoc } from "../models/ProductVariantCombination";

export class ProductVariantCombinationRepository{
    // Create an ProductVariantCombination
    async Create(productVariantCombination: ProductVariantCombinationDoc){
      try {
        const newProductVariantCombination = await ProductVariantCombination.create(productVariantCombination)
        return newProductVariantCombination
      } catch (error) {
        console.log(error)
      }
    }

     // Find one ProductVariantCombination
     async FindOne(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await ProductVariantCombination.findOne(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find many ProductVariantCombination
     async FindMany(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await ProductVariantCombination.find(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find all ProductVariantCombination
     async FindAll(){
      try {
        const data = await ProductVariantCombination.find({})
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Update one ProductVariantCombination
     async UpdateOne(updateOne: UpdateOneDto){
      try {
        const update = await ProductVariantCombination.updateOne({_id: updateOne._id},updateOne.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update many ProductVariantCombination
     async UpdateMany(updateMany: UpdateManyDto){
      try {
        const field = updateMany.field
        const value = updateMany.value
        const searchObj = {[field]: value}
        const update = await ProductVariantCombination.updateOne(searchObj,updateMany.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update All ProductVariantCombination
     async UpdateAll(){
        
     }

     // Delete one ProductVariantCombination
     async DeleteOne(){
        
     }

      // Delete many ProductVariantCombination
      async DeleteMany(){
        
      }

        // Delete all ProductVariantCombination
      async DeleteAll(){
            
        }
}