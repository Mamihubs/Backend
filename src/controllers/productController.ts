import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import {
  ProductValidation,
  UpdateProductValidation,
} from "../validations/productValidations"; // Assuming you have this
import mongoose from "mongoose";
import upload from "../utils/multerConfig"; // Path to your multer configuration
import { ObjectId } from "mongodb";
import { storeDataInCacheMemory } from "../interceptors";

const productService = new ProductService();

class ProductController {
  createProduct = async (req: Request, res: Response) => {
    const { error } = ProductValidation(req.body);
    if (error) {
      return res.status(400).json({
        status: false,
        message: error.details[0].message.toUpperCase(),
      });
    }

    try {
      const newProduct = await productService.createProduct({
        ...req.body,
      });

      if (!newProduct) {
        return res.status(500).json({
          status: false,
          message: "Something went wrong while creating the product",
        });
      }

      return res.status(200).json({
        status: true,
        message: "Product created successfully",
        data: newProduct,
      });
    } catch (e) {
      return res.status(500).json({
        status: false,
        message: "An error occurred while creating the product: ",
      });
    }
  };

  updateProduct = async (req: Request, res: Response) => {
    const { error } = UpdateProductValidation(req.body); // Validate updates if needed
    const productId = req.params.id;

    if (error) {
      return res.status(400).json({
        status: false,
        message: error.details[0].message.toUpperCase(),
      });
    }
    const updatedProduct = await productService.updateProduct(
      new mongoose.Types.ObjectId(productId),
      {
        ...req.body,
      }
    );

    if (!updatedProduct) {
      return res.status(500).json({
        status: false,
        message: "Something went wrong while updating the product",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  };

  removeImage = async (req: Request, res: Response) => {
    const productId = req.body.product_id; // get product id from route
    const imageId = req.body.image; // get image id from route

    try {
      const updatedProduct = await productService.removeImage(
        new mongoose.Types.ObjectId(productId),
        imageId
      );

      if (!updatedProduct) {
        return res.status(500).json({
          status: false,
          message:
            "Something went wrong while removing the image from the product",
        });
      }

      return res.status(200).json({
        status: true,
        message: "Image removed successfully",
        data: updatedProduct,
      });
    } catch (e) {
      return res.status(500).json({
        status: false,
        message: "An error occurred while removing the image from the product",
      });
    }
  };

  getProductById = async (req: Request, res: Response) => {
    const product = await productService.getProductById(
      new mongoose.Types.ObjectId(req.params.id)
    );

    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });
    }

    const data = {
      status: true,
      message: "Product retrieved successfully",
      data: product,
    }
    // store cache in memory
    storeDataInCacheMemory(req, data, 10)
    return res.status(200).json(data);
  };

  getProductsByVendor = async (req: Request, res: Response) => {
    const { vendorId } = req.params;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const pageNumber = parseInt(req.query.pageNumber as string) || 1;

    try {
      const products = await productService.getProductsByVendor(
        vendorId,
        pageSize,
        pageNumber
      );
      if (!products || products.length === 0) {
        return res
          .status(404)
          .json({ message: "No products found for this vendor" });
      }
      const data = {
        status: true,
        message: "Products retrieved successfully",
        data: products,
      }
      // store cache in memory
      storeDataInCacheMemory(req, data, 10)
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: "An error occurred", error });
    }
  };

  getAllProducts = async (req: Request, res: Response) => {
    console.log("this is get all products ", req.query)
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const pageNumber = parseInt(req.query.pageNumber as string) || 1;

    // const filters: Record<string, any> = {};
    // if (req.query.brand) {
    //   filters.brand = req.query.brand;
    // }
    // if (req.query.categoryId) {
    //   filters.categoryId = req.query.categoryId;
    // }
    // Add more filters as needed based on your product schema

    try {
      const products = await productService.getAllProducts(
        pageSize,
        pageNumber,
        req.query
      );
      if (!products || products.length === 0) {
        return res.status(404).json({ message: "No products found" });
      }
      const data = { data: products, message: "Successfully fetched products" }
      // store cache in memory
      storeDataInCacheMemory(req, data, 10)
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: "An error occurred", error });
    }
  };

  
  async updateQuantity(req: Request, res: Response) {
    const { product_id, variation_id, quantity } = req.body;

    try {
      const updatedVariation = await productService.updateQuantity(
        new mongoose.Types.ObjectId(product_id),
        new mongoose.Types.ObjectId(variation_id),
        quantity
      );
      res.json({
        message: "Quantity updated successfully",
        data: updatedVariation,
      });
    } catch (error) {
      console.error(error);

      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      res.status(500).json({ message: "Server Error", error: errorMessage });
    }
  }

  // updateVariationStock = async (req: Request, res: Response) => {
  //   const productId = new mongoose.Types.ObjectId(req.params.productId);
  //   const variationId = new mongoose.Types.ObjectId(req.params.variationId);
  //   const { quantity, operation } = req.body; // operation can be 'restock' or 'destock'

  //   try {
  //     const product = await productService.getProductById(productId);

  //     if (!product) {
  //       return res.status(404).json({ message: 'Product not found' });
  //     }

  //     const variationIndex = product.variations.findIndex((v) => v._id.equals(variationId));

  //     if (variationIndex === -1) {
  //       return res.status(404).json({ message: 'Variation not found' });
  //     }

  //     let updatedQuantity = product.variations[variationIndex].quantity;

  //     if (operation === 'restock') {
  //       updatedQuantity += quantity;
  //     } else if (operation === 'destock') {
  //       updatedQuantity = Math.max(0, updatedQuantity - quantity); // Prevent going below zero
  //     } else {
  //       return res.status(400).json({ message: 'Invalid operation type' });
  //     }

  //     const updateVariation: UpdateVariationDto = {
  //       _id: variationId,
  //       quantity: updatedQuantity,
  //     };

  //     const updatedProduct = await productService.updateVariation(productId, updateVariation);

  //     if (!updatedProduct) {
  //       return res.status(500).json({ message: 'Failed to update stock' });
  //     }

  //     return res.status(200).json({ message: 'Stock updated successfully', data: updatedProduct });
  //   } catch (error) {
  //     return res.status(500).json({ message: 'An error occurred', error });
  //   }
  // };
}

export default new ProductController();
