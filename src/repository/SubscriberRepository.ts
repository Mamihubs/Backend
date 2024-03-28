import { DeleteDto, searchDto } from '../dto/GeneralDto';
import { CreateSubscriberDto } from '../dto/SubscriberDto';
import SubscriberModel from '../models/Subscriber';
import { getSortByParams } from '../utils/helpers';

export class SubscriberRepository{
    // Create a User
    async Create(user: CreateSubscriberDto){
      try {
        const newUser = await SubscriberModel.create(user)
        return newUser
      } catch (error) {
        throw error;
      }
    }

     // Find one User
     async FindOne(search: searchDto){
        try {
          const searchObj = {[search.field]: search.value}
          const data = await SubscriberModel.findOne(searchObj)
          return data
        } catch (error) {
          throw error
        }
     }

     // Find many Users
     async FindMany(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await SubscriberModel.find(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find all Users
     async FindAll(){
      try {
        const data = await SubscriberModel.find({})
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Delete one product
  async DeleteOne(param: DeleteDto) {
    try {
        const deleteObj = {[param.field]: param.value}
        return await SubscriberModel.deleteOne(deleteObj);
    } catch (error:any) {
        console.log(error?.message)
      throw new Error("Failed to delete subscriber");
    }
  }

  async getAllSubscribers({pageSize, pageNumber, sortBy}: { pageSize: number, pageNumber: number, sortBy?: string}
    ) {
  
      let _sortBy = {} //{ createdAt: -1 }
        if(sortBy){
            _sortBy = getSortByParams(sortBy)
        }
        const products = await SubscriberModel.find({})
        .sort(_sortBy)
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);
  
        return products;
      }
}