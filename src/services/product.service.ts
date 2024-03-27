import mongoose from 'mongoose';
import { CreateNewProductDto, UpdateVariationDto } from '../dto/ProductDto';
import { ProductRepository } from '../repository/ProductRepository';
import { UpdateOneDto, searchDto } from '../dto/GeneralDto';
import fs from 'fs';
import path from 'path';

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async createProduct(newProduct: CreateNewProductDto) {
    return await this.productRepository.Create(newProduct);
  }

  async updateProduct(id: mongoose.Types.ObjectId, updateFields: Partial<CreateNewProductDto>) {
    console.log(updateFields);
    const updateOneDto: UpdateOneDto = {
      _id: id.toString(),
      update: updateFields
    };
    return await this.productRepository.UpdateOne(updateOneDto);
  }

  async removeImage(productId: mongoose.Types.ObjectId, imageFilename: string): Promise<any> {
    const product = await this.getProductById(productId);
    if (!product) {
      return null;  // or throw a "Product not found" error
    }
  
    // Locate the image in the images array
    const imageIndex = product.images.findIndex(img => img === imageFilename);
  
    if (imageIndex === -1) {
      return null;  // or throw a "Image not found" error
    }
  
    // Delete image file from the server
    try {
      fs.unlinkSync(path.join(__dirname, '../../', product.images[imageIndex]));
    } catch (e) {
      // Handle error during file removal (e.g., file not found)
      console.error("Could not remove file: ", e);
      return null;
    }
  
    // Remove the image from the images array
    product.images.splice(imageIndex, 1);
  
    const updateOneDto: UpdateOneDto = {
      _id: productId.toString(),
      update: { images: product.images }
    };
  
    // Save the updated product
    return await this.productRepository.UpdateOne(updateOneDto);
  }
  
  async getProductById(id: mongoose.Types.ObjectId) {
    const search: searchDto = {
      field: '_id',
      value: id.toString()
    };
    return await this.productRepository.FindOne(search);
  }
  async getProductsByVendor(vendorId: string, pageSize: number, pageNumber: number) {
    return await this.productRepository.findByVendor(vendorId, pageSize, pageNumber);
  }
  
  async getAllProducts(pageSize: number, pageNumber: number, filters: Record<string, any>) {
    return await this.productRepository.findAll(pageSize, pageNumber,filters);
  }

  async getSearchProducts(searchQuery: string, pageSize: number, pageNumber: number, filters: Record<string, any>) {
    return await this.productRepository.searchProducts(searchQuery, pageSize, pageNumber, filters );
  }

  async updateQuantity(productId: mongoose.Types.ObjectId, variationId: mongoose.Types.ObjectId, quantity: number) {
    return await this.productRepository.updateQuantity(productId, variationId, quantity);
  }
  

}
