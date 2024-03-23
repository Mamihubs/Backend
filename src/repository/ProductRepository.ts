import Product from "../models/Product";
import { UpdateManyDto, UpdateOneDto, searchDto } from "../dto/GeneralDto";
import { CreateNewProductDto, UpdateVariationDto } from "../dto/ProductDto";
import mongoose, { isValidObjectId, FilterQuery } from "mongoose";
import { ObjectId } from "mongodb";

export class ProductRepository {
  // Create a Product
  async Create(product: CreateNewProductDto) {
    try {
      return await Product.create(product);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create product");
    }
  }

  // Find one Product
  async FindOne(search: searchDto) {
    try {
      const query: FilterQuery<any> = { [search.field]: search.value };
      return await Product.findOne(query);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to find product");
    }
  }

  // Find many Products
  async FindMany(search: searchDto) {
    try {
      const query: FilterQuery<any> = { [search.field]: search.value };
      return await Product.find(query);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to find products");
    }
  }

  // Find all Products
  async FindAll() {
    try {
      return await Product.find({});
    } catch (error) {
      console.error(error);
      throw new Error("Failed to find all products");
    }
  }

  // Update one product
  async UpdateOne(updateOne: UpdateOneDto) {
    try {
      return await Product.updateOne({ _id: updateOne._id }, updateOne.update);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update product");
    }
  }

  // Update many products
  async UpdateMany(updateMany: UpdateManyDto) {
    try {
      const query: FilterQuery<any> = { [updateMany.field]: updateMany.value };
      return await Product.updateMany(query, updateMany.update);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update products");
    }
  }

  // ProductRepository
  async findByVendor(vendorId: string, pageSize: number, pageNumber: number) {
    return await Product.find({ created_by: vendorId })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize); // replace `ProductModel` with your actual model
  }

  async findAll(
    pageSize: number,
    pageNumber: number,
    filters: Record<string, any>
  ) {
    const query: FilterQuery<any> = {};
    if (filters.brand) {
      query.brand = filters.brand;
    }

    if (filters.category_id) {
      query.category_id = filters.category_id;
    }

    if (filters.is_flash_sale !== undefined) {
      query.is_flash_sale = filters.is_flash_sale;
    }

    if (filters.min_price !== undefined && filters.max_price !== undefined) {
      query["variations.price"] = {
        $gte: filters.min_price,
        $lte: filters.max_price,
      };
    } else if (filters.min_price !== undefined) {
      query["variations.price"] = { $gte: filters.min_price };
    } else if (filters.max_price !== undefined) {
      query["variations.price"] = { $lte: filters.max_price };
    }

    // Handle new arrivals filter
    if (filters.new_arrival === true) {
      // Sort by most recent if new_arrival is true
      const products = await Product.find(query)
        .sort({ createdAt: -1 })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);

      return products;
    } else {
      // Add more filters as needed...

      const products = await Product.find(query)
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);

      return products;
    }
  }

  // Delete one product
  async DeleteOne(productId: mongoose.Types.ObjectId) {
    try {
      return await Product.deleteOne({ _id: productId });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete product");
    }
  }

  // Delete many products
  async DeleteMany(search: searchDto) {
    try {
      const query: FilterQuery<any> = { [search.field]: search.value };
      return await Product.deleteMany(query);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete products");
    }
  }

  // Update Variation
  async updateQuantity(
    productId: mongoose.Types.ObjectId,
    variationId: mongoose.Types.ObjectId,
    quantityChange: number
  ) {
    const productObjectId = new ObjectId(productId);
    const variationObjectId = new ObjectId(variationId);

    try {
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: productObjectId, "variations._id": variationObjectId },
        { $inc: { "variations.$.quantity": quantityChange } },
        { new: true }
      );

      if (!updatedProduct) {
        throw new Error("Product or Variation not found");
      }

      const updatedVariation = updatedProduct.variations.find((variation) =>
        variation._id.equals(variationId)
      );

      if (!updatedVariation) {
        throw new Error("Variation not found");
      }

      return updatedVariation;
    } catch (error: any) {
      throw new Error(`Failed to update quantity: ${error?.message}`);
    }
  }
}
