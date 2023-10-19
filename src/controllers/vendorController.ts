import { Request, Response } from "express";
import {VendorService}  from "../services/vendor.service";
import { UserStatus, UserType } from "../models/User";

class VendorsController{

    private vendorService: VendorService = new VendorService();

    // getting  all vendors
    getVendors = async (req: Request, res: Response) => {
        const data = await this.vendorService.getAllVendors();
        return res.status(200).json(data);
    }

    // get pending vendors
    getPendingVendors = async (req: Request, res: Response) => {
        const data = await this.vendorService.getAllVendors({ status: UserStatus.PENDING, type:UserType.VENDOR});
        return res.status(200).json(data);
    }

    getProducts = async(req: Request, res: Response)=>{
        const { id } = req.params;
        const data = await this.vendorService.findAllProducts(id)
        return res.status(200).json({data})
    }
    getOrders = async(req: Request, res: Response)=>{
        const { id } = req.params;
        const data = await this.vendorService.findAllOrders(id)
        return res.status(200).json({data})
    }
    getTransactions = async(req: Request, res: Response)=>{
        const { id } = req.params;
    const data = await this.vendorService.findAllTransactions(id)
        return res.status(200).json({data})
    }
    getProduct = async(req: Request, res: Response)=>{
        const { id } = req.params;
    const data = await this.vendorService.findOneProduct(id)
        return res.status(200).json({data})
    }
    getOrder = async(req: Request, res: Response)=>{
        const { id } = req.params;
    const data = await this.vendorService.findOneOrder(id)
        return res.status(200).json({data})
    }
    getTransaction = async(req: Request, res: Response)=>{
        const { id } = req.params;
    const data = await this.vendorService.findOneTransaction(id)
        return res.status(200).json({data})
    }


}

export default new VendorsController();