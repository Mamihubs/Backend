import { ICaro} from '../models/Carousel';
import { DeleteOneDto } from '../dto/GeneralDto';
import { CaroRepository } from './../repository/CarouselRepository';


export class CarouselService extends CaroRepository{
    
    async createCaro(data: ICaro){
        try {
            const newCategory = await this.Create(data);
            return newCategory;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteCaro(data: DeleteOneDto){
        try {
            return await this.DeleteOne(data);
        } catch (error) {
            console.log(error);
        }
    }
    async getAllCarouzel(){
        try {
            const categories = await this.FindAll();
            return categories;
        } catch (error) {
            console.log(error);
        }
    }
}