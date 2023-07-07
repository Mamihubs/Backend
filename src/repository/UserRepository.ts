import { UserDto } from './../dto/UserDto';
import User from "../models/User";
import { searchDto } from '../dto/GeneralDto';

export class UserRepository{
    // Create a User
    async Create(user: UserDto){
      try {
        const userObj = {
          fullName: user.fullName,
          login: user.login,
          password: user.password,
          type: user.type
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
     async UpdateOne(){

     }

     // Update many users
     async UpdateMany(){
        
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