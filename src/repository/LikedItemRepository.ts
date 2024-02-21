import LikedItemModel from "../models/LikedItem";

export class LikedItemRepository{
    


    async fetchAllItems(id:string){
        try {
            return await LikedItemModel.find({'user':id})
        } catch (error:any) {
            return error;
        }
    }

   async createLike(item: {user:string, product:string}){
        try{
           return await LikedItemModel.create(item)
        }catch(error:any){
            return error;
        }
    }


    async removeLike(id:string){
        try {
            return await LikedItemModel.deleteOne({'product':id})
        } catch (error:any) {
            return error;
        }
    }
}