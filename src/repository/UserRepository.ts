import { CreateUserDto } from './../dto/UserDto';
import User from "../models/User";
import { UpdateManyDto, UpdateOneDto, searchDto } from '../dto/GeneralDto';

export class UserRepository{
    // Create a User
    async Create(user: CreateUserDto){
      try {
        const userObj = {
          fullName: user.fullName,
          login: user.login,
          password: user.password,
          type: user.type,
          profileID: user.profileID,
          createdBy: user.createdBy || null
        }
        
        const newUser = await User.create(userObj)
        return newUser
      } catch (error) {
        console.log(error)
      }
    }

     // Find one User
     async FindOne(search: searchDto){
        try {
          const field = search.field
          const value = search.value
          const searchObj = {[field]: value}
          const data = await User.findOne(searchObj)
          return data
        } catch (error) {
          console.log(error)
        }
     }

     // Find many Users
     async FindMany(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await User.find(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find all Users
     async FindAll(){
      try {
        const data = await User.find({})
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Update one user
     async UpdateOne(updateOne: UpdateOneDto){
      try {
        const update = await User.updateOne({__id: updateOne.__id},updateOne.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update many users
     async UpdateMany(updateMany: UpdateManyDto){
      try {
        const field = updateMany.field
        const value = updateMany.value
        const searchObj = {[field]: value}
        const update = await User.updateOne(searchObj,updateMany.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update All users
     async UpdateAll(){
        
     }

     // Delete one user
     async DeleteOne(){
        
     }

      // Delete many user
      async DeleteMany(){
        
      }

        // Delete all users
      async DeleteAll(){
            
        }
}