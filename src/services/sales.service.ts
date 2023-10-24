import { DeleteOneDto, AllSeachDto, UpdateOneDto, searchDto} from '../dto/GeneralDto';
import SalesRepository from './../repository/SalesRepository';
import mongoose from 'mongoose';
export default class SalesService extends SalesRepository {

    constructor(){
        super();
    }

    async createSales(data: object){
        try {
            return await this.Create(data);
        } catch (error) {
            console.log(error);
        }
    }

    async updateSales(id: string, data: UpdateOneDto){
        try {
            return await this.UpdateOne({_id: id, update: data});
        } catch (error) {
            console.log(error);
        }
    }
    async deleteSales(data: DeleteOneDto){
        try {
            return await this.DeleteOne(
                new mongoose.Types.ObjectId(data._id),
            );
        } catch (error) {
            console.log(error);
        }
    }
    async getAllSales(option?: AllSeachDto){
        try {
            return await this.FindAll(option);
        } catch (error) {
            console.log(error);
        }
    }
    async getSaleOrder(id: mongoose.Types.ObjectId){
        try {
            const search: searchDto = {
                field: '_id',
                value: id.toString()
              };
            return await this.FindOne(search);
        } catch (error) {
            console.log(error);
        }
    }
}