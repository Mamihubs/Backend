import { CreateNewCategoryDto, UpdateCategoryDto } from '../dto/CategoryDto';
import { DeleteOneDto } from '../dto/GeneralDto';
import { CategoryRepository } from './../repository/CategoryRepository';


export class CategoryService{
    private categoryRepository: CategoryRepository;

    constructor(){
        this.categoryRepository = new CategoryRepository();
    }

    async createCategory(data: CreateNewCategoryDto){
        try {
            const newCategory = await this.categoryRepository.Create(data);
            return newCategory;
        } catch (error) {
            console.log(error);
        }
    }

    async updateCategory(id: string, data: UpdateCategoryDto){
        try {
            const updatedCategory = await this.categoryRepository.UpdateOne({_id: id, update: data});
            return updatedCategory;
        } catch (error) {
            console.log(error);
        }
    }
    async deleteCategory(data: DeleteOneDto){
        try {
            return await this.categoryRepository.DeleteOne(data);
        } catch (error) {
            console.log(error);
        }
    }
    async getAllCategories(){
        try {
            const categories = await this.categoryRepository.FindMany({field: 'parentId', value: ''});
            return categories;
        } catch (error) {
            console.log(error);
        }
    }

    async getAllSubCategoriesUnderACategory(id: string){
        try {
            const subCategories = await this.categoryRepository.FindMany({field: 'parentId', value: id});
            return subCategories;
        } catch (error) {
            console.log(error);
        }
    }
}