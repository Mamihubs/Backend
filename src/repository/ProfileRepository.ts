import { UpdateManyDto, UpdateOneDto, searchDto } from "../dto/GeneralDto";
import Profile from "../models/Profile";
import { ProfileDoc } from "../dto/ProfileDto";

export class ProfileRepository{
    // Create a Profile
    async Create(profile: ProfileDoc){
      try {
        const newProfile = await Profile.create(profile)
        return newProfile
      } catch (error) {
        console.log(error)
      }
    }

     // Find one Profile
     async FindOne(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await Profile.findOne(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find many Profiles
     async FindMany(search: searchDto){
        try {
          const field = search.field
          const value = search.value
          const searchObj = {[field]: value}
          const data = await Profile.find(searchObj)
          return data
        } catch (error) {
          console.log(error)
        }
     }

     // Find all Profiles
     async FindAll(){
      try {
        const data = await Profile.find({})
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Update one Profile
     async UpdateOne(updateOne: UpdateOneDto){
      try {
        const update = await Profile.updateOne({__id: updateOne.__id},updateOne.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update many Profiles
     async UpdateMany(updateMany: UpdateManyDto){
      try {
        const field = updateMany.field
        const value = updateMany.value
        const searchObj = {[field]: value}
        const update = await Profile.updateOne(searchObj,updateMany.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update All Profiles
     async UpdateAll(){
        
     }

     // Delete one Profile
     async DeleteOne(){
        
     }

      // Delete many Profile
      async DeleteMany(){
        
      }

        // Delete all Profiles
      async DeleteAll(){
            
        }
}