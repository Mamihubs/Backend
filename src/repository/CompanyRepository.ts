import { CompanyDto } from "../dto/CompanyDto";
import { UpdateManyDto, UpdateOneDto, searchDto } from "../dto/GeneralDto";
import Company, { CompanyDoc } from "../models/Company";

export class CompanyRepository{
    // Create a Company
    async Create(company: CompanyDto){
      try {
        const newCompany = await Company.create(company);
        return newCompany
      } catch (error) {
        console.log(error)
      }
    }

     // Find one Company
     async FindOne(search: searchDto){
      try {
        const {field, value} = search;
         
        const searchObj = {[field]: value}
        const data = await Company.findOne(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find many Companys
     async FindMany(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await Company.find(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find all Companys
     async FindAll(){
      try {
        const data = await Company.find({})
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Update one Company
     async UpdateOne(updateOne: UpdateOneDto){
      try {
        const update = await Company.updateOne({_id: updateOne._id},updateOne.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update many Companys
     async UpdateMany(updateMany: UpdateManyDto){
      try {
        const field = updateMany.field
        const value = updateMany.value
        const searchObj = {[field]: value}
        const update = await Company.updateOne(searchObj,updateMany.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update All Companys
     async UpdateAll(){
        
     }

     // Delete one Company
     async DeleteOne(){
        
     }

      // Delete many Company
      async DeleteMany(){
        
      }

        // Delete all Companys
      async DeleteAll(){
            
        }
}