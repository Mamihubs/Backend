import { DeleteOneDto, searchDto } from "../dto/GeneralDto";
import Carousel, { ICaro } from "../models/Carousel";

export class CaroRepository{
    async Create(caro: ICaro){
      try {
        const newCaro = await Carousel.create(caro);
        return newCaro;
      } catch (error) {
        console.log(error)
      }
    }

     // Find one Category
     async FindOne(search: searchDto){
      try {
        return await Carousel.findOne({[search.field]: search.value, isDeleted:false})
      } catch (error) {
        console.log(error)
      }
     }

     // Find many Categorys
     async FindMany(search: searchDto){
      try {
        return await Carousel.find({[search.field]: search.value, isDeleted:false})
      } catch (error) {
        console.log(error)
      }
     }

     // Find all Carousel
     async FindAll(){
      try {
        const data = await Carousel.find({isDeleted:false})
        return data
      } catch (error) {
        console.log(error)
      }
     }

     async DeleteOne(deleteObj:DeleteOneDto){
      try {
        return await Carousel.updateOne({_id: deleteObj._id}, {isDeleted:true})
      } catch (error) {
        console.log(error)
      } 
     }
}