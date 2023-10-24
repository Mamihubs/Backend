import { Request, Response } from "express";
import SalesService from "../services/sales.service";
import { IItem, ISale } from '../models/Sales'
import ProductModel from "../models/Product";
import mongoose from "mongoose";

class SalesController {

    private SalesService: SalesService = new SalesService();

    // update sales order 
    updateSalesOrder = async (req: Request, res: Response) => {
        try {
            // data validations
            const updated_by = req.user;
            const { id } = req.params

            if (!req.body)
                return res.status(400).json({
                    error: true,
                    message: "update information required",
                })

            const updated = await this.SalesService.updateSales(id, { ...req.body, updated_by });

            if (!updated)
                return res.status(500).json({
                    status: false,
                    message: 'Something went wrong while updating order information',
                })

            return res.status(200).json({
                error: false,
                message: "sales order created",
                data: updated
            })
        } catch (err) {
            return res.status(500).json({
                error: true,
                message: err
            });
        }
    }

    topProductSales = async (req: Request, res: Response) => {
        // Fetch all sales records
        const allSales = await this.SalesService.FindAll();
        if (allSales && allSales.length > 0) {
            // Create a map to store product IDs and their total quantities sold
            const productSalesMap = new Map<string, number>();
            allSales.forEach((sale:ISale) => {
                sale.items.forEach((item: IItem) => {
                    const productId = item.product.toString();
                    const quantity = item.quantity;
                    if (productSalesMap.has(productId)) {
                        // Increment the existing quantity
                        const existingQuantity = productSalesMap.get(productId) || 0;
                        productSalesMap.set(productId, existingQuantity + quantity);
                    } else {
                        // setting product for the first time
                        productSalesMap.set(productId, quantity);
                    }
                });
            });
            // Sort products by total quantity sold in descending order
            const sortedTopProducts = [...productSalesMap.entries()].sort(
                ([, quantityA], [, quantityB]) => quantityB - quantityA
            );

            // Display the top-selling products
            // console.log('Top Selling Products:');
            // sortedProducts.slice(0, 10).forEach(([productId, quantity], index) => {
            //     console.log(`${index + 1}. Product ID: ${productId}, Total Quantity Sold: ${quantity}`);
            // });

            return res.status(200).json({ sortedTopProducts });
        }

    }

    topSellingCategories = async (req: Request, res: Response) => {
        // Fetch all sales records
        const allSales = await this.SalesService.FindAll();
        // a map to store category IDs and their total quantities sold
        const categorySalesMap = new Map<string, number>();

        if (allSales && allSales.length > 0) {
            // Iterate through sales records
            allSales.forEach(async(sale:ISale) => {
                sale.items.forEach(async(item: IItem) => {
                    // Find the corresponding product for the item
                    const product = await ProductModel.findById(item.product);
                    if (product) {
                        // Get the category ID of the product
                        const categoryId = product.category_id.toString();
                        const quantity = item.quantity;
    
                        if (categorySalesMap.has(categoryId)) {
                            // Increment the existing quantity
                            const existingQuantity = categorySalesMap.get(categoryId) || 0;
                            categorySalesMap.set(categoryId, existingQuantity + quantity);
                        } else {
                            // Set the category for the first time
                            categorySalesMap.set(categoryId, quantity);
                        }
                    }
                });
            });

            // Sort categories by total quantity sold in descending order
            const sortedTopCategories = [...categorySalesMap.entries()].sort(
                ([, quantityA], [, quantityB]) => quantityB - quantityA
            );
    
            console.log('Top Selling Categories:');
            sortedTopCategories.slice(0, 10).forEach(([categoryId, quantity], index) => {
                console.log(`${index + 1}. Category ID: ${categoryId}, Total Quantity Sold: ${quantity}`);
            });
    
            // Return the top-selling categories
            return res.status(200).json({ sortedTopCategories });
        }


    }


    // delete sales 
    deleteSales = async (req: Request, res: Response) => {
        const { id } = req.params;
        // TODO: delete sales base on user who created it or vendors 
        try {
            if (!id) return res.status(400).json({ error: true, message: "please supply sale id" });
            const deleted = this.SalesService.deleteSales({ _id: id });
            if (!deleted)
                return res.status(400).json({
                    error: true,
                    message: "sales not deleted"
                });

            return res.status(200).json({
                error: false,
                message: "sale deleted"
            });
        } catch (err) {
            return res.status(500).json({
                error: true,
                message: err
            });

        }

    }

    // getting  all sales admin
    getSales = async (req: Request, res: Response) => {
        const sales = await this.SalesService.FindAll();
        return res.status(200).json({ sales });
    }

    // getting  all sales for a user
    getUserSales = async (req: Request, res: Response) => {
        try {
            const sales = await this.SalesService.FindAll({ order_by: req.user });
            return res.status(200).json({ sales });
        } catch (err) {
            return res.status(500).json({
                error: true,
                message: err
            });
        }
    }

    // get sales based on the status of the sales
    // note the status can be pending, deleivered, etc
    getDeliveryStats = async (req: Request, res: Response) => {
        const {id} = req.params;
        if (!id)
            return res.status(500).json({
                error: true,
                message: "kindly supply order id"
            });

        const order = await this.SalesService.getAllSales(
            new mongoose.Types.ObjectId(id)
        );
        return res.status(200).json({ order });
    }
    // getDeliveryStats = async (req: Request, res: Response) => {
    //     const {delivery_status, order_by} = req.body;
    //     if (!delivery_status || !order_by)
    //         return res.status(500).json({
    //             error: true,
    //             message: "kindly supply search parameter for the delivery status"
    //         });

    //     const sales = await this.SalesService.FindAll(req.body);
    //     return res.status(200).json({ sales });
    // }
}

export default new SalesController();