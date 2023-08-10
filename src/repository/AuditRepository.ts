import { UpdateManyDto, UpdateOneDto, searchDto } from "../dto/GeneralDto";
import Audit, { AuditDoc } from "../models/Audit";

export class AuditRepository{
    // Create an Audit
    async Create(audit: AuditDoc){
      try {
        const newAudit = await Audit.create(audit)
        return newAudit
      } catch (error) {
        console.log(error)
      }
    }

     // Find one Audit
     async FindOne(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await Audit.findOne(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find many Audits
     async FindMany(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await Audit.find(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find all Audits
     async FindAll(){
      try {
        const data = await Audit.find({})
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Update one Audit
     async UpdateOne(updateOne: UpdateOneDto){
      try {
        const update = await Audit.updateOne({_id: updateOne._id},updateOne.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update many Audits
     async UpdateMany(updateMany: UpdateManyDto){
      try {
        const field = updateMany.field
        const value = updateMany.value
        const searchObj = {[field]: value}
        const update = await Audit.updateOne(searchObj,updateMany.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }  

     // Update All Audits
     async UpdateAll(){
        
     }

     // Delete one audit
     async DeleteOne(){
        
     }

      // Delete many Audits
      async DeleteMany(){
        
      }

        // Delete all Audits
      async DeleteAll(){
            
        }
}