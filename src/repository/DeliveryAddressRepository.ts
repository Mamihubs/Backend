import { DeliveryAddressDto, DeliveryAddressUpdateDto } from "../dto/DeliveryAddressDto";
import { DeliveryAddressModel } from "../models/DeliveryAddress";

export class DeliveryAddressRepository{

    async createDeliveryAddress(data: DeliveryAddressDto){
        try {
            return await DeliveryAddressModel.create(data);
        } catch (error) {
            
        }
    }
    async allDeliveryAddress(id:string){
        try {
            return await DeliveryAddressModel.find({user:id});
        } catch (error) {
            
        }
    }
    async fetchDeliveryAddress(id:string){
        try {
            return await DeliveryAddressModel.findOne({_id:id});
        } catch (error) {
            
        }
    }
    async updateDeliveryAddress(data: DeliveryAddressUpdateDto){
        try {
            return await DeliveryAddressModel.updateOne({_id:data.id}, data.update);
        } catch (error) {
            
        }
    }
    async deleteDeliveryAddress(id:string){
        try {
            return await DeliveryAddressModel.deleteOne({_id:id});
        } catch (error) {
            
        }
    }
}