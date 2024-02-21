import CourierToken from "../models/CourierToken";

export class CourierTokenRepository{


    async findCompany(company:string){
        try {
            return await CourierToken.find({courierName:company});
        } catch (error:any) {
            return error;
        }
    }
    async findOne(id:string){
        try {
            return await CourierToken.findOne({id});
        } catch (error:any) {
            return error;
        }
    }
    async fetchAllToken(){
        try {
            return await CourierToken.find();
        } catch (error:any) {
            return error;
        }
    }
    async createToken(item:{courierName:string, token:string, expiry: Date}){
        try {
            return await CourierToken.create(item);
        } catch (error:any) {
            return error;
        }
    }
    async removeToken(id:string){
        try {
            return await CourierToken.deleteOne({id});
        } catch (error:any) {
            return error;
        }
    }
}