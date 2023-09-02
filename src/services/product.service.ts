import mongoose from 'mongoose';
import { CreateNewProductDto, UpdateVariationDto } from '../dto/ProductDto';
import { ProductRepository } from '../repository/ProductRepository';
import { UpdateOneDto, searchDto } from '../dto/GeneralDto';

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async createProduct(newProduct: CreateNewProductDto) {
    return await this.productRepository.Create(newProduct);
  }

  async updateProduct(id: mongoose.Types.ObjectId, updateFields: Partial<CreateNewProductDto>) {
    const updateOneDto: UpdateOneDto = {
      _id: id.toString(),
      update: updateFields
    };
    return await this.productRepository.UpdateOne(updateOneDto);
  }

  async getProductById(id: mongoose.Types.ObjectId) {
    const search: searchDto = {
      field: '_id',
      value: id.toString()
    };
    return await this.productRepository.FindOne(search);
  }

  async updateVariation(productId: mongoose.Types.ObjectId, updateVariation: UpdateVariationDto) {
    const product = await this.getProductById(productId);
    if (!product) {
      return null;  // or throw a "Product not found" error
    }

    const variationIndex = product.variations.findIndex(v => v._id.equals(updateVariation._id));
    if (variationIndex === -1) {
      return null;  // or throw a "Variation not found" error
    }

    // Update the variation within the product
    product.variations[variationIndex] = { ...(product.variations[variationIndex] as any), ...updateVariation };

    const updateOneDto: UpdateOneDto = {
      _id: productId.toString(),
      update: { variations: product.variations }
    };

    // Save the updated product
    return await this.productRepository.UpdateOne(updateOneDto);
  }
}
