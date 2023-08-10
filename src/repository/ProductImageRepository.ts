import { UpdateManyDto, UpdateOneDto, searchDto } from "../dto/GeneralDto";
import ProductImage, { ProductImageDoc } from "../models/ProductImage";

export class ProductImageRepository{
    // Create an ProductImage
    async Create(productImage: ProductImageDoc){
      try {
        const newProductImage = await ProductImage.create(productImage)
        return newProductImage
      } catch (error) {
        console.log(error)
      }
    }

     // Find one ProductImage
     async FindOne(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await ProductImage.findOne(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find many ProductImages
     async FindMany(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await ProductImage.find(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find all ProductImages
     async FindAll(){
      try {
        const data = await ProductImage.find({})
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Update one ProductImage
     async UpdateOne(updateOne: UpdateOneDto){
      try {
        const update = await ProductImage.updateOne({_id: updateOne._id},updateOne.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update many ProductImages
     async UpdateMany(updateMany: UpdateManyDto){
      try {
        const field = updateMany.field
        const value = updateMany.value
        const searchObj = {[field]: value}
        const update = await ProductImage.updateOne(searchObj,updateMany.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update All ProductImages
     async UpdateAll(){
        
     }

     // Delete one ProductImage
     async DeleteOne(){
        
     }

      // Delete many ProductImages
      async DeleteMany(){
        
      }

        // Delete all ProductImages
      async DeleteAll(){
            
        }
}