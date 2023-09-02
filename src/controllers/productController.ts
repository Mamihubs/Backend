import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { ProductValidation } from '../validations/productValidations'; // Assuming you have this
import mongoose from 'mongoose';


const productService = new ProductService();

class ProductController {

    createProduct = async (req: Request, res: Response) => {
        const { error } = ProductValidation(req.body); // Again, assuming you have this validation
        if (error) {
          return res.status(400).json({
            status: false,
            message: error.details[0].message.toUpperCase(),
          });
        }
        
        const newProduct = await productService.createProduct(req.body);
        
        if (!newProduct) {
          return res.status(500).json({
            status: false,
            message: 'Something went wrong while creating the product',
          });
        }
        
        return res.status(200).json({
          status: true,
          message: 'Product created successfully',
          data: newProduct,
        });
      };
      

    updateProduct = async (req: Request, res: Response) => {
        const { error } = ProductValidation(req.body); // Validate updates if needed
        if (error) {
          return res.status(400).json({
            status: false,
            message: error.details[0].message.toUpperCase(),
          });
        }
        
        const updatedProduct = await productService.updateProduct(
            new mongoose.Types.ObjectId(req.params.id),
            req.body
        );
  
        if (!updatedProduct) {
          return res.status(500).json({
            status: false,
            message: 'Something went wrong while updating the product',
          });
        }
        
        return res.status(200).json({
          status: true,
          message: 'Product updated successfully',
          data: updatedProduct,
        });
      };
      

    getProductById = async (req: Request, res: Response) => {
        const product = await productService.getProductById(new mongoose.Types.ObjectId(req.params.id));
        
        if (!product) {
          return res.status(404).json({
            status: false,
            message: 'Product not found',
          });
        }
        
        return res.status(200).json({
          status: true,
          message: 'Product retrieved successfully',
          data: product,
        });
      };


}

export default new ProductController();
