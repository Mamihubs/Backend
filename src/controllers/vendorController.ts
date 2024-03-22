import { Request, Response } from "express";
import {VendorService}  from "../services/vendor.service";
import { UserStatus, UserType } from "../models/User";
import { storeDataInCacheMemory } from "../interceptors";

class VendorsController{

    private vendorService: VendorService = new VendorService();

    // getting  all vendors
    getVendors = async (req: Request, res: Response) => {
        const data = await this.vendorService.getAllVendors();
        storeDataInCacheMemory(req, {data}, 10)
        return res.status(200).json({data});
    }

    // get pending vendors
    getPendingVendors = async (req: Request, res: Response) => {
        const data = await this.vendorService.getAllVendors({ status: UserStatus.PENDING, type:UserType.VENDOR});
        storeDataInCacheMemory(req, {data}, 10)
        return res.status(200).json({data});
    }

    getProducts = async(req: Request, res: Response)=>{
        const { id } = req.params;
        const data = await this.vendorService.findAllProducts(id)
        storeDataInCacheMemory(req, {data}, 10)
        return res.status(200).json({data})
    }
    getOrders = async(req: Request, res: Response)=>{
        const { id } = req.params;
        const data = await this.vendorService.findAllOrders(id)
        // store cache in memory
        storeDataInCacheMemory(req, {data}, 10)
        return res.status(200).json({data})
    }
    getTransactions = async(req: Request, res: Response)=>{
        const { id } = req.params;
        const data = await this.vendorService.findAllTransactions(id)
        // store cache in memory
        storeDataInCacheMemory(req, {data}, 10)
        return res.status(200).json({data})
    }
    getProduct = async(req: Request, res: Response)=>{
        const { id } = req.params;
        const data = await this.vendorService.findOneProduct(id)
        // store cache in memory
        storeDataInCacheMemory(req, data, 10)
        return res.status(200).json(data)
    }
    getOrder = async(req: Request, res: Response)=>{
        const { id } = req.params;
        const data = await this.vendorService.findOneOrder(id)
        // store cache in memory
        storeDataInCacheMemory(req, data, 10)
        return res.status(200).json(data)
    }
    getTransaction = async(req: Request, res: Response)=>{
        const { id } = req.params;
        const data = await this.vendorService.findOneTransaction(id)
        // store cache in memory
        storeDataInCacheMemory(req, data, 10)
        return res.status(200).json(data)
    }


}

export default new VendorsController();