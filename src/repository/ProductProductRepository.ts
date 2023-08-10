import { UpdateManyDto, UpdateOneDto, searchDto } from "../dto/GeneralDto";
import ProductProduct, { ProductProductDoc } from "../models/ProductProduct";

export class ProductProductRepository{
    // Create an ProductProduct
    async Create(productProduct: ProductProductDoc){
      try {
        const newProductProduct = await ProductProduct.create(productProduct)
        return newProductProduct
      } catch (error) {
        console.log(error)
      }
    }

     // Find one ProductProduct
     async FindOne(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await ProductProduct.findOne(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find many ProductProducts
     async FindMany(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await ProductProduct.find(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find all ProductProducts
     async FindAll(){
      try {
        const data = await ProductProduct.find({})
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Update one ProductProduct
     async UpdateOne(updateOne: UpdateOneDto){
      try {
        const update = await ProductProduct.updateOne({_id: updateOne._id},updateOne.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update many ProductProducts
     async UpdateMany(updateMany: UpdateManyDto){
      try {
        const field = updateMany.field
        const value = updateMany.value
        const searchObj = {[field]: value}
        const update = await ProductProduct.updateOne(searchObj,updateMany.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update All ProductProducts
     async UpdateAll(){
        
     }

     // Delete one ProductProduct
     async DeleteOne(){
        
     }

      // Delete many ProductProducts
      async DeleteMany(){
        
      }

        // Delete all ProductProducts
      async DeleteAll(){
            
        }
}