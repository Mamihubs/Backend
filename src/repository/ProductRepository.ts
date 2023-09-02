import Product from "../models/Product";
import { UpdateManyDto, UpdateOneDto, searchDto } from '../dto/GeneralDto';
import { CreateNewProductDto, UpdateVariationDto } from '../dto/ProductDto';
import mongoose, { FilterQuery } from 'mongoose';

export class ProductRepository {

  // Create a Product
  async Create(product: CreateNewProductDto) {
    try {
      return await Product.create(product);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create product');
    }
  }

  // Find one Product
  async FindOne(search: searchDto) {
    try {
      const query: FilterQuery<any> = { [search.field]: search.value };
      return await Product.findOne(query);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to find product');
    }
  }

  // Find many Products
  async FindMany(search: searchDto) {
    try {
      const query: FilterQuery<any> = { [search.field]: search.value };
      return await Product.find(query);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to find products');
    }
  }

  // Find all Products
  async FindAll() {
    try {
      return await Product.find({});
    } catch (error) {
      console.error(error);
      throw new Error('Failed to find all products');
    }
  }

  // Update one product
  async UpdateOne(updateOne: UpdateOneDto) {
    try {
      return await Product.updateOne({ _id: updateOne._id }, updateOne.update);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update product');
    }
  }

  // Update many products
  async UpdateMany(updateMany: UpdateManyDto) {
    try {
      const query: FilterQuery<any> = { [updateMany.field]: updateMany.value };
      return await Product.updateMany(query, updateMany.update);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update products');
    }
  }

  // Delete one product
  async DeleteOne(productId: mongoose.Types.ObjectId) {
    try {
      return await Product.deleteOne({ _id: productId });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete product');
    }
  }

  // Delete many products
  async DeleteMany(search: searchDto) {
    try {
      const query: FilterQuery<any> = { [search.field]: search.value };
      return await Product.deleteMany(query);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete products');
    }
  }

  // Update Variation
  // Update Variation
// Update Variation
async UpdateVariation(productId: mongoose.Types.ObjectId, variationUpdate: UpdateVariationDto) {
  try {
    const product = await this.FindOne({ field: '_id', value: productId.toString() });
    if (!product) throw new Error('Product not found');

    // Assuming product.variations is a Mongoose subdocument array
    const variations: any = product.variations;  // TypeScript doesn't know this is a Mongoose array

    const variationSubDoc = variations.id(variationUpdate._id);
    if (!variationSubDoc) throw new Error('Variation not found');

    // Update the variation
    for (const [key, value] of Object.entries(variationUpdate)) {
      // Ensure we don't accidentally update the ID
      if (key !== '_id') {
        variationSubDoc[key] = value;
      }
    }

    // Save the updated product
    await product.save();
    return product;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update variation');
  }
}

}
