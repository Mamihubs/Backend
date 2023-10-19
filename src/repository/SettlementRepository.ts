import { UpdateManyDto, UpdateOneDto, searchDto } from "../dto/GeneralDto";
import Settlement, { SettlementDoc } from "../models/Settlement";

export class SettlementRepository{
    // Create an Settlement
    async Create(settlement: SettlementDoc){
      try {
        const newSettlement = await Settlement.create(settlement)
        return newSettlement
      } catch (error) {
        console.log(error)
      }
    }

     // Find one Settlement
     async FindOne(search: searchDto){
      try {
        const {field, value} = search; 
        const searchObj = {[field]: value}
        const data = await Settlement.findOne(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find many Settlements
     async FindMany(search: searchDto){
      try {
        const {field, value} = search; 
        const searchObj = {[field]: value}
        const data = await Settlement.find(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find all Settlements
     async FindAll(){
      try {
        const data = await Settlement.find({})
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Update one Settlement
     async UpdateOne(updateOne: UpdateOneDto){
      try {
        const update = await Settlement.updateOne({_id: updateOne._id},updateOne.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update many Settlements
     async UpdateMany(updateMany: UpdateManyDto){
      try {
        const {field, value} = updateMany; 
        const searchObj = {[field]: value}
        const update = await Settlement.updateOne(searchObj,updateMany.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update All Settlements
     async UpdateAll(){
        
     }

     // Delete one Settlement
     async DeleteOne(){
        
     }

      // Delete many Settlements
      async DeleteMany(){
        
      }

        // Delete all Settlements
      async DeleteAll(){
            
        }
}