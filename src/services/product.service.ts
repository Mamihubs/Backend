import { ProductAttributeDto, ProductAttributeValueDto } from "../dto/ProductDto";
import { ProductAttributeRepository } from "../repository/ProductAttributeRepository";
import { ProductAttributeValueRepository } from "../repository/ProductAttributeValueRepository";


export class ProductService{
    private productAttributeRepository: ProductAttributeRepository;
    private productAttributeValueRepository: ProductAttributeValueRepository;

    constructor(){
        this.productAttributeRepository = new ProductAttributeRepository();
        this.productAttributeValueRepository = new ProductAttributeValueRepository();
    }

    async createProductAttributes(data: ProductAttributeDto){
        try {
            const newProductAttribute = await this.productAttributeRepository.Create(data);
            return newProductAttribute;
        } catch (error) {
            console.log(error)
        }
    }

    async getAllProductAttributes(){
        try {
            return await this.productAttributeRepository.FindAll();
        } catch (error) {
            console.log(error);
        }
    }

    async updateProductAttribute(id: string,data: ProductAttributeDto){
        try {
            return await this.productAttributeRepository.UpdateOne({__id: id, update: data});
        } catch (error) {
            console.log(error);
        }
    }

    async createProductAttributeValue(data: ProductAttributeValueDto){
        try {
            return await this.productAttributeValueRepository.Create(data);
        } catch (error) {
            console.log(error)
        }
    }

    async getAttributeValuePerAttribute(id: string){
        try {
            return await this.productAttributeValueRepository.FindMany({field: 'product_attribute_id',value: id});
        } catch (error) {
            console.log(error);
        }
    }

    async updateProductAttributeValue(id: string,data: ProductAttributeValueDto){
        try {
            return await this.productAttributeValueRepository.UpdateOne({__id: id, update: data});
        } catch (error) {
            console.log(error);
        }
    }

    async createProduct(){
        try {
            
        } catch (error) {
            console.log(error);
        }
    }
}