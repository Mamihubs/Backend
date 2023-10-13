import { UpdateManyDto, UpdateOneDto, searchDto } from "../dto/GeneralDto";
import { LocationDto, RegionDto } from "../dto/LocationDto";
import { LocationModel, RegionModel } from "../models new/Location";


export class LocationRepository{
    public modelMap:{ [key: string]: any } = {
        'Region': RegionModel,
        'Location': LocationModel
    };
    public dtoMap:{ [key: string]: any } = {
        'Region': RegionDto,
        'Location': LocationDto
};
    public modelInstance;
    // public dtoInstance; 
    constructor(modelName: string){
        this.modelInstance = this.modelMap[modelName];
        // this.dtoInstance = this.dtoMap[modelName];
    }
    // Create
    async Create(data: object){
      try {
        const newCreation = await this.modelInstance.create(data);
        console.log(newCreation)
        return newCreation
      } catch (error) {
        console.log(error)
      }
    }

    async CreateMany(data: object[]){
        try {
            const newCreations = await this.modelInstance.insertMany(data);
            return newCreations
          } catch (error) {
            console.log(error)
          }
    }
     // Find one
     async FindOne(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await this.modelInstance.findOne(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find many
     async FindMany(search: searchDto){
      try {
        const field = search.field
        const value = search.value
        const searchObj = {[field]: value}
        const data = await this.modelInstance.find(searchObj)
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Find all
     async FindAll(){
      try {
        const data = await this.modelInstance.find()
        return data
      } catch (error) {
        console.log(error)
      }
     }

     // Update one
     async UpdateOne(updateOne: UpdateOneDto){
      try {
        const update = await this.modelInstance.updateOne({_id: updateOne._id},updateOne.update)
        return update
      } catch (error) {
        console.log(error)
      }
     }

     // Update many
     async UpdateMany(updateMany: UpdateManyDto){
      try {
        const field = updateMany.field
        const value = updateMany.value
        const searchObj = {[field]: value}
        const update = await this.modelInstance.updateOne(searchObj,updateMany.update)
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