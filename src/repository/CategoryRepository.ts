import { CreateNewCategoryDto } from "../dto/CategoryDto";
import { UpdateManyDto, UpdateOneDto, searchDto } from "../dto/GeneralDto";
import Category, { CategoryDoc } from "../models/Category";

export class CategoryRepository{
    // Create an Category
    async Create(category: CreateNewCategoryDto){
      try {
        const newCategory = await Category.create(category)
        return newCategory
      } catch (error) {
        console.log(error)
      }
    }

     // Find one Category
     async FindOne(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await Category.findOne(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find many Categorys
     async FindMany(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await Category.find(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find all Categorys
     async FindAll(){
      try {
        const data = await Category.find({})
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Update one Category
     async UpdateOne(updateOne: UpdateOneDto){
      try {
        const update = await Category.updateOne({_id: updateOne._id},updateOne.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update many Categorys
     async UpdateMany(updateMany: UpdateManyDto){
      try {
        const field = updateMany.field
        const value = updateMany.value
        const searchObj = {[field]: value}
        const update = await Category.updateOne(searchObj,updateMany.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update All Categorys
     async UpdateAll(){
        
     }

     // Delete one Category
     async DeleteOne(){
        
     }

      // Delete many Categorys
      async DeleteMany(){
        
      }

        // Delete all Categorys
      async DeleteAll(){
            
        }
}