import { CreateNewCategoryDto } from "../dto/CategoryDto";
import { UpdateManyDto, UpdateOneDto, DeleteOneDto, searchDto } from "../dto/GeneralDto";
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
        return await Category.findOne({[search.field]: search.value, isDeleted:false})
      } catch (error) {
        console.log(error)
      }
     }

     // Find many Categorys
     async FindMany(search: searchDto){
      try {
        return await Category.find({[search.field]: search.value, isDeleted:false})
      } catch (error) {
        console.log(error)
      }
     }

     // Find all Categorys
     async FindAll(){
      try {
        const data = await Category.find({isDeleted:false})
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Update one Category
     async UpdateOne(updateObject: UpdateOneDto){
      try {
        return await Category.updateOne({_id: updateObject._id}, updateObject.update)
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
     // it is important to note that we dont delete rather we update the 
     // is deleted variable to prevent data breakdown
     async DeleteOne(deleteObj:DeleteOneDto){
      try {
        return await Category.updateOne({_id: deleteObj._id}, {isDeleted:true})
      } catch (error) {
        console.log(error)
      } 
     }
}